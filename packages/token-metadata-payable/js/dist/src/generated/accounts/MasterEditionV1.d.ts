/// <reference types="node" />
import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { Key } from '../types/Key';
export type MasterEditionV1Args = {
    key: Key;
    supply: beet.bignum;
    maxSupply: beet.COption<beet.bignum>;
    printingMint: web3.PublicKey;
    oneTimePrintingAuthorizationMint: web3.PublicKey;
};
export declare class MasterEditionV1 implements MasterEditionV1Args {
    readonly key: Key;
    readonly supply: beet.bignum;
    readonly maxSupply: beet.COption<beet.bignum>;
    readonly printingMint: web3.PublicKey;
    readonly oneTimePrintingAuthorizationMint: web3.PublicKey;
    private constructor();
    static fromArgs(args: MasterEditionV1Args): MasterEditionV1;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [MasterEditionV1, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<MasterEditionV1>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<MasterEditionV1Args>;
    static deserialize(buf: Buffer, offset?: number): [MasterEditionV1, number];
    serialize(): [Buffer, number];
    static byteSize(args: MasterEditionV1Args): number;
    static getMinimumBalanceForRentExemption(args: MasterEditionV1Args, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    pretty(): {
        key: string;
        supply: number | {
            toNumber: () => number;
        };
        maxSupply: beet.COption<beet.bignum>;
        printingMint: string;
        oneTimePrintingAuthorizationMint: string;
    };
}
export declare const masterEditionV1Beet: beet.FixableBeetStruct<MasterEditionV1, MasterEditionV1Args>;
