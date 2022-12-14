import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
export type EscrowAuthorityRecord = {
    TokenOwner: void;
    Creator: {
        fields: [web3.PublicKey];
    };
};
export type EscrowAuthority = beet.DataEnumKeyAsKind<EscrowAuthorityRecord>;
export declare const isEscrowAuthorityTokenOwner: (x: EscrowAuthority) => x is {
    __kind: "TokenOwner";
} & Omit<void, "void"> & {
    __kind: 'TokenOwner';
};
export declare const isEscrowAuthorityCreator: (x: EscrowAuthority) => x is {
    __kind: "Creator";
} & Omit<{
    fields: [web3.PublicKey];
}, "void"> & {
    __kind: 'Creator';
};
export declare const escrowAuthorityBeet: beet.FixableBeet<EscrowAuthority, Partial<EscrowAuthority>>;
