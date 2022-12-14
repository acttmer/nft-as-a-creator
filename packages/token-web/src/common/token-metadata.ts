import { PublicKey } from '@solana/web3.js'
import { PROGRAM_ID as MPL_TOKEN_METADATA_PROGRAM_ID } from 'token-metadata-payable'

export const getMetadataPDA = (mint: PublicKey) => {
  const [publicKey] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    MPL_TOKEN_METADATA_PROGRAM_ID,
  )

  return publicKey
}

export const getMasterEditionPDA = (mint: PublicKey) => {
  const [publicKey] = PublicKey.findProgramAddressSync(
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
