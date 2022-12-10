import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare const SplitRoyaltyStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number;
}>;
export type SplitRoyaltyInstructionAccounts = {
    metadata: web3.PublicKey;
    owner: web3.PublicKey;
    token: web3.PublicKey;
};
export declare const splitRoyaltyInstructionDiscriminator = 41;
export declare function createSplitRoyaltyInstruction(accounts: SplitRoyaltyInstructionAccounts, programId?: web3.PublicKey): web3.TransactionInstruction;
