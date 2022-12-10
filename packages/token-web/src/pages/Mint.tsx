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
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js'
import { uploadIPFSTokenMetadata } from 'common/ipfs'
import { getMasterEditionPDA, getMetadataPDA } from 'common/token-metadata'
import { useEffect, useState } from 'react'
import {
  createCreateMasterEditionV3Instruction,
  createCreateMetadataAccountV2Instruction,
  Metadata,
  PROGRAM_ID as MPL_TOKEN_METADATA_PROGRAM_ID,
} from 'token-metadata-payable'
import styles from './Mint.module.scss'

const Mint = () => {
  const { connection } = useConnection()
  const { publicKey: currentUserPubkey, sendTransaction } = useWallet()

  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [description, setDescription] = useState('')
  const [sellerFeeBasisPoints_, setSellerFeeBasisPoints] = useState('')
  const [imageFile, setImageFile] = useState<File>()
  const [imageSrc, setImageSrc] = useState<string>()

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader()

      reader.addEventListener(
        'load',
        () => {
          if (reader.result) {
            setImageSrc(reader.result.toString())
          }
        },
        false,
      )

      reader.readAsDataURL(imageFile)
    } else {
      setImageSrc(void 0)
    }
  }, [imageFile])

  const handleMint = async () => {
    if (currentUserPubkey === null || !imageFile) {
      return
    }

    const sellerFeeBasisPoints = Number(sellerFeeBasisPoints_)
    const mint = Keypair.generate()

    const uri = await uploadIPFSTokenMetadata({
      name,
      symbol,
      description,
      sellerFeeBasisPoints,
      image: imageFile,
    })

    const ata = await getAssociatedTokenAddress(
      mint.publicKey,
      currentUserPubkey,
    )

    const tokenMetadataPubkey = await getMetadataPDA(mint.publicKey)
    const masterEditionPubkey = await getMasterEditionPDA(mint.publicKey)

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: currentUserPubkey,
        newAccountPubkey: mint.publicKey,
        space: MINT_SIZE,
        lamports: await getMinimumBalanceForRentExemptMint(connection),
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(
        mint.publicKey,
        0,
        currentUserPubkey,
        currentUserPubkey,
      ),
      createAssociatedTokenAccountInstruction(
        currentUserPubkey,
        ata,
        currentUserPubkey,
        mint.publicKey,
      ),
      createMintToCheckedInstruction(
        mint.publicKey,
        ata,
        currentUserPubkey,
        1,
        0,
        [],
      ),
      createCreateMetadataAccountV2Instruction(
        {
          metadata: tokenMetadataPubkey,
          mint: mint.publicKey,
          mintAuthority: currentUserPubkey,
          payer: currentUserPubkey,
          updateAuthority: currentUserPubkey,
        },
        {
          createMetadataAccountArgsV2: {
            data: {
              name,
              symbol,
              uri,
              sellerFeeBasisPoints,
              creators: [
                {
                  address: currentUserPubkey,
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
          updateAuthority: currentUserPubkey,
          mintAuthority: currentUserPubkey,
          payer: currentUserPubkey,
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

    console.log(mint.publicKey.toBase58())
    console.log(ata.toBase58())
    console.log(tokenMetadataPubkey.toBase58())

    const tokenMetadata = await Metadata.fromAccountAddress(
      connection,
      tokenMetadataPubkey,
    )

    console.log(tokenMetadata)
  }

  return (
    <div className={styles.page}>
      <h1>Mint Payable NFT</h1>
      <div className={styles.list}>
        <input
          className={styles.input}
          placeholder="Name"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Symbol"
          value={symbol}
          onChange={event => setSymbol(event.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Description"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Seller Fee Basis Points (0-10000)"
          value={sellerFeeBasisPoints_}
          onChange={event => setSellerFeeBasisPoints(event.target.value)}
        />
        <div className={styles.input}>
          <input
            type="file"
            placeholder="Select Image"
            onChange={event => setImageFile(event.target.files?.[0])}
          />
          {imageSrc && (
            <img
              className={styles.image}
              src={imageSrc}
              alt="NFT Presentation"
            />
          )}
        </div>
        <button className={styles.mint} onClick={handleMint}>
          Mint
        </button>
      </div>
    </div>
  )
}

export default Mint
