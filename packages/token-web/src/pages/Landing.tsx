import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { PublicKey, Transaction } from '@solana/web3.js'
import { getMetadataPDA } from 'common/token-metadata'
import { createSplitRoyaltyInstruction } from 'token-metadata-payable'

const Landing = () => {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()

  const hanldeTestSplitRoyalty = async () => {
    const tokenAddress = prompt('Token address')
    const tokenAccountAddress = prompt('Token Account address')

    if (
      tokenAddress === null ||
      tokenAccountAddress === null ||
      publicKey === null
    ) {
      return
    }

    const tokenMetadataPubkey = getMetadataPDA(new PublicKey(tokenAddress))
    const transaction = new Transaction().add(
      createSplitRoyaltyInstruction({
        token: new PublicKey(tokenAccountAddress),
        metadata: tokenMetadataPubkey,
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
