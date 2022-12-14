/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { Key } from '../types/Key';
export type CollectionAuthorityRecordArgs = {
    key: Key;
    bump: number;
    updateAuthority: beet.COption<web3.PublicKey>;
};
export declare class CollectionAuthorityRecord implements CollectionAuthorityRecordArgs {
    readonly key: Key;
    readonly bump: number;
    readonly updateAuthority: beet.COption<web3.PublicKey>;
    private constructor();
    static fromArgs(args: CollectionAuthorityRecordArgs): CollectionAuthorityRecord;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [CollectionAuthorityRecord, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<CollectionAuthorityRecord>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<CollectionAuthorityRecordArgs>;
    static deserialize(buf: Buffer, offset?: number): [CollectionAuthorityRecord, number];
    serialize(): [Buffer, number];
    static byteSize(args: CollectionAuthorityRecordArgs): number;
    static getMinimumBalanceForRentExemption(args: CollectionAuthorityRecordArgs, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    pretty(): {
        key: string;
        bump: number;
        updateAuthority: beet.COption<web3.PublicKey>;
    };
}
export declare const collectionAuthorityRecordBeet: beet.FixableBeetStruct<CollectionAuthorityRecord, CollectionAuthorityRecordArgs>;
