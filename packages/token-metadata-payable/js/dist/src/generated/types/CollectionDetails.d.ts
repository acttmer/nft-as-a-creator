import * as beet from '@metaplex-foundation/beet';
export type CollectionDetailsRecord = {
    V1: {
        size: beet.bignum;
    };
};
export type CollectionDetails = beet.DataEnumKeyAsKind<CollectionDetailsRecord>;
export declare const isCollectionDetailsV1: (x: CollectionDetails) => x is {
    __kind: "V1";
} & Omit<{
    size: beet.bignum;
}, "void"> & {
    __kind: 'V1';
};
export declare const collectionDetailsBeet: beet.FixableBeet<{
    __kind: "V1";
} & Omit<{
    size: beet.bignum;
}, "void">, Partial<{
    __kind: "V1";
} & Omit<{
    size: beet.bignum;
}, "void">>>;
