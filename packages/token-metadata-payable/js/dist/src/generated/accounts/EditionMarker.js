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
exports.editionMarkerBeet = exports.EditionMarker = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
const web3 = __importStar(require("@solana/web3.js"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const Key_1 = require("../types/Key");
class EditionMarker {
    constructor(key, ledger) {
        this.key = key;
        this.ledger = ledger;
    }
    static fromArgs(args) {
        return new EditionMarker(args.key, args.ledger);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return EditionMarker.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find EditionMarker account at ${address}`);
        }
        return EditionMarker.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('h39cuaMfR1mQBrz4udyCJjVTKWuYuyGmdb6Nqw44F3d')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.editionMarkerBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.editionMarkerBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.editionMarkerBeet.serialize(this);
    }
    static get byteSize() {
        return exports.editionMarkerBeet.byteSize;
    }
    static async getMinimumBalanceForRentExemption(connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(EditionMarker.byteSize, commitment);
    }
    static hasCorrectByteSize(buf, offset = 0) {
        return buf.byteLength - offset === EditionMarker.byteSize;
    }
    pretty() {
        return {
            key: 'Key.' + Key_1.Key[this.key],
            ledger: this.ledger,
        };
    }
}
exports.EditionMarker = EditionMarker;
exports.editionMarkerBeet = new beet.BeetStruct([
    ['key', Key_1.keyBeet],
    ['ledger', beet.uniformFixedSizeArray(beet.u8, 31)],
], EditionMarker.fromArgs, 'EditionMarker');
//# sourceMappingURL=EditionMarker.js.map