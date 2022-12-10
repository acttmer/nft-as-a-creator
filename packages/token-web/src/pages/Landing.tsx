import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { PublicKey, Transaction } from '@solana/web3.js'
import { getMetadataPDA } from 'common/token-metadata'
import { createSplitRoyaltyInstruction } from 'token-metadata-payable'

const Landing = () => {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()

  const hanldeTestSplitRoyalty = async () => {
    const tokenAccountPubkey = prompt('Token Account address')
    const mintPubkey = prompt('Mint Public Key')

    if (
      tokenAccountPubkey === null ||
      mintPubkey === null ||
      publicKey === null
    ) {
      return
    }

    const tokenMetadataPubkey = await getMetadataPDA(new PublicKey(mintPubkey))
    console.log(tokenMetadataPubkey.toBase58())
    const transaction = new Transaction().add(
      createSplitRoyaltyInstruction({
        token: new PublicKey(tokenAccountPubkey),
        metadata: new PublicKey(tokenMetadataPubkey),
        owner: publicKey,
      }),
    )

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext()

    const signature = await sendTransaction(transaction, connection, {
      minContextSlot,
    })

    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature,
    })

    console.log(signature)
  }

  return (
    <div>
      <WalletMultiButton />

      <button onClick={hanldeTestSplitRoyalty}>Test Split Royalty</button>
    </div>
  )
}

export default Landing
