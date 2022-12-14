/// <reference types="node" />
import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { Key } from '../types/Key';
export type MasterEditionV2Args = {
    key: Key;
    supply: beet.bignum;
    maxSupply: beet.COption<beet.bignum>;
};
export declare class MasterEditionV2 implements MasterEditionV2Args {
    readonly key: Key;
    readonly supply: beet.bignum;
    readonly maxSupply: beet.COption<beet.bignum>;
    private constructor();
    static fromArgs(args: MasterEditionV2Args): MasterEditionV2;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [MasterEditionV2, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<MasterEditionV2>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<MasterEditionV2Args>;
    static deserialize(buf: Buffer, offset?: number): [MasterEditionV2, number];
    serialize(): [Buffer, number];
    static byteSize(args: MasterEditionV2Args): number;
    static getMinimumBalanceForRentExemption(args: MasterEditionV2Args, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    pretty(): {
        key: string;
        supply: number | {
            toNumber: () => number;
        };
        maxSupply: beet.COption<beet.bignum>;
    };
}
export declare const masterEditionV2Beet: beet.FixableBeetStruct<MasterEditionV2, MasterEditionV2Args>;
