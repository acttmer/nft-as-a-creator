import {
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToCheckedInstruction,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import {
  createCreateMasterEditionV3Instruction,
  createCreateMetadataAccountV2Instruction,
  Metadata,
  PROGRAM_ID as MPL_TOKEN_METADATA_PROGRAM_ID,
} from 'token-metadata-payable'

async function getMetadataPDA(mint: PublicKey): Promise<PublicKey> {
  const [publicKey] = await PublicKey.findProgramAddress(
    [
      Buffer.from('metadata'),
      MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    MPL_TOKEN_METADATA_PROGRAM_ID,
  )

  return publicKey
}

async function getMasterEditionPDA(mint: PublicKey): Promise<PublicKey> {
  const [publicKey] = await PublicKey.findProgramAddress(
    [
      Buffer.from('metadata'),
      MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
      Buffer.from('edition'),
    ],
    MPL_TOKEN_METADATA_PROGRAM_ID,
  )

  return publicKey
}

const Landing = () => {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()

  const handleSendTransaction = async () => {
    if (!publicKey) return

    const ownerPublicKey = publicKey
    const mint = Keypair.generate()

    const ata = await getAssociatedTokenAddress(mint.publicKey, ownerPublicKey)
    const tokenMetadataPubkey = await getMetadataPDA(mint.publicKey)
    const masterEditionPubkey = await getMasterEditionPDA(mint.publicKey)

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: ownerPublicKey,
        newAccountPubkey: mint.publicKey,
        space: MINT_SIZE,
        lamports: await getMinimumBalanceForRentExemptMint(connection),
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(
        mint.publicKey,
        0,
        ownerPublicKey,
        ownerPublicKey,
      ),
      createAssociatedTokenAccountInstruction(
        ownerPublicKey,
        ata,
        ownerPublicKey,
        mint.publicKey,
      ),
      createMintToCheckedInstruction(
        mint.publicKey,
        ata,
        ownerPublicKey,
        1,
        0,
        [],
      ),
      createCreateMetadataAccountV2Instruction(
        {
          metadata: tokenMetadataPubkey,
          mint: mint.publicKey,
          mintAuthority: ownerPublicKey,
          payer: ownerPublicKey,
          updateAuthority: ownerPublicKey,
        },
        {
          createMetadataAccountArgsV2: {
            data: {
              name: 'Fake SMS #1355',
              symbol: 'FSMB',
              uri: 'https://34c7ef24f4v2aejh75xhxy5z6ars4xv47gpsdrei6fiowptk2nqq.arweave.net/3wXyF1wvK6ARJ_9ue-O58CMuXrz5nyHEiPFQ6z5q02E',
              sellerFeeBasisPoints: 100,
              creators: [
                {
                  address: ownerPublicKey,
                  verified: true,
                  share: 100,
                },
              ],
              collection: null,
              uses: null,
            },
            isMutable: true,
          },
        },
        MPL_TOKEN_METADATA_PROGRAM_ID,
      ),
      createCreateMasterEditionV3Instruction(
        {
          edition: masterEditionPubkey,
          mint: mint.publicKey,
          updateAuthority: ownerPublicKey,
          mintAuthority: ownerPublicKey,
          payer: ownerPublicKey,
          metadata: tokenMetadataPubkey,
        },
        {
          createMasterEditionArgs: {
            maxSupply: 0,
          },
        },
        MPL_TOKEN_METADATA_PROGRAM_ID,
      ),
    )

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext()

    const signature = await sendTransaction(transaction, connection, {
      signers: [mint],
      minContextSlot,
    })

    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature,
    })

    const tokenMetadata = await Metadata.fromAccountAddress(
      connection,
      tokenMetadataPubkey,
    )

    console.log(tokenMetadata)
  }

  return (
    <div>
      <WalletMultiButton />
      <button onClick={handleSendTransaction}>Send Transaction</button>
    </div>
  )
}

export default Landing
