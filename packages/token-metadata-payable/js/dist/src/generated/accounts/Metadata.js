"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadataBeet = exports.Metadata = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const Key_1 = require("../types/Key");
const Data_1 = require("../types/Data");
const TokenStandard_1 = require("../types/TokenStandard");
const Collection_1 = require("../types/Collection");
const Uses_1 = require("../types/Uses");
const CollectionDetails_1 = require("../types/CollectionDetails");
const customSerializer = __importStar(require("../../custom/metadata-deserializer"));
class Metadata {
    constructor(key, updateAuthority, mint, data, primarySaleHappened, isMutable, editionNonce, tokenStandard, collection, uses, collectionDetails) {
        this.key = key;
        this.updateAuthority = updateAuthority;
        this.mint = mint;
        this.data = data;
        this.primarySaleHappened = primarySaleHappened;
        this.isMutable = isMutable;
        this.editionNonce = editionNonce;
        this.tokenStandard = tokenStandard;
        this.collection = collection;
        this.uses = uses;
        this.collectionDetails = collectionDetails;
    }
    static fromArgs(args) {
        return new Metadata(args.key, args.updateAuthority, args.mint, args.data, args.primarySaleHappened, args.isMutable, args.editionNonce, args.tokenStandard, args.collection, args.uses, args.collectionDetails);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return Metadata.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find Metadata account at ${address}`);
        }
        return Metadata.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('h39cuaMfR1mQBrz4udyCJjVTKWuYuyGmdb6Nqw44F3d')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.metadataBeet);
    }
    static deserialize(buf, offset = 0) {
        return resolvedDeserialize(buf, offset);
    }
    serialize() {
        return resolvedSerialize(this);
    }
    static byteSize(args) {
        const instance = Metadata.fromArgs(args);
        return exports.metadataBeet.toFixedFromValue(instance).byteSize;
    }
    static async getMinimumBalanceForRentExemption(args, connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(Metadata.byteSize(args), commitment);
    }
    pretty() {
        return {
            key: 'Key.' + Key_1.Key[this.key],
            updateAuthority: this.updateAuthority.toBase58(),
            mint: this.mint.toBase58(),
            data: this.data,
            primarySaleHappened: this.primarySaleHappened,
            isMutable: this.isMutable,
            editionNonce: this.editionNonce,
            tokenStandard: this.tokenStandard,
            collection: this.collection,
            uses: this.uses,
            collectionDetails: this.collectionDetails,
        };
    }
}
exports.Metadata = Metadata;
exports.metadataBeet = new beet.FixableBeetStruct([
    ['key', Key_1.keyBeet],
    ['updateAuthority', beetSolana.publicKey],
    ['mint', beetSolana.publicKey],
    ['data', Data_1.dataBeet],
    ['primarySaleHappened', beet.bool],
    ['isMutable', beet.bool],
    ['editionNonce', beet.coption(beet.u8)],
    ['tokenStandard', beet.coption(TokenStandard_1.tokenStandardBeet)],
    ['collection', beet.coption(Collection_1.collectionBeet)],
    ['uses', beet.coption(Uses_1.usesBeet)],
    ['collectionDetails', beet.coption(CollectionDetails_1.collectionDetailsBeet)],
], Metadata.fromArgs, 'Metadata');
const serializer = customSerializer;
const resolvedSerialize = typeof serializer.serialize === 'function'
    ? serializer.serialize.bind(serializer)
    : exports.metadataBeet.serialize.bind(exports.metadataBeet);
const resolvedDeserialize = typeof serializer.deserialize === 'function'
    ? serializer.deserialize.bind(serializer)
    : exports.metadataBeet.deserialize.bind(exports.metadataBeet);
//# sourceMappingURL=Metadata.js.map