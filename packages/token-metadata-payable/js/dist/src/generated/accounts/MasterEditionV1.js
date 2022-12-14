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
exports.masterEditionV1Beet = exports.MasterEditionV1 = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
const web3 = __importStar(require("@solana/web3.js"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const Key_1 = require("../types/Key");
class MasterEditionV1 {
    constructor(key, supply, maxSupply, printingMint, oneTimePrintingAuthorizationMint) {
        this.key = key;
        this.supply = supply;
        this.maxSupply = maxSupply;
        this.printingMint = printingMint;
        this.oneTimePrintingAuthorizationMint = oneTimePrintingAuthorizationMint;
    }
    static fromArgs(args) {
        return new MasterEditionV1(args.key, args.supply, args.maxSupply, args.printingMint, args.oneTimePrintingAuthorizationMint);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return MasterEditionV1.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find MasterEditionV1 account at ${address}`);
        }
        return MasterEditionV1.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('h39cuaMfR1mQBrz4udyCJjVTKWuYuyGmdb6Nqw44F3d')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.masterEditionV1Beet);
    }
    static deserialize(buf, offset = 0) {
        return exports.masterEditionV1Beet.deserialize(buf, offset);
    }
    serialize() {
        return exports.masterEditionV1Beet.serialize(this);
    }
    static byteSize(args) {
        const instance = MasterEditionV1.fromArgs(args);
        return exports.masterEditionV1Beet.toFixedFromValue(instance).byteSize;
    }
    static async getMinimumBalanceForRentExemption(args, connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(MasterEditionV1.byteSize(args), commitment);
    }
    pretty() {
        return {
            key: 'Key.' + Key_1.Key[this.key],
            supply: (() => {
                const x = this.supply;
                if (typeof x.toNumber === 'function') {
                    try {
                        return x.toNumber();
                    }
                    catch (_) {
                        return x;
                    }
                }
                return x;
            })(),
            maxSupply: this.maxSupply,
            printingMint: this.printingMint.toBase58(),
            oneTimePrintingAuthorizationMint: this.oneTimePrintingAuthorizationMint.toBase58(),
        };
    }
}
exports.MasterEditionV1 = MasterEditionV1;
exports.masterEditionV1Beet = new beet.FixableBeetStruct([
    ['key', Key_1.keyBeet],
    ['supply', beet.u64],
    ['maxSupply', beet.coption(beet.u64)],
    ['printingMint', beetSolana.publicKey],
    ['oneTimePrintingAuthorizationMint', beetSolana.publicKey],
], MasterEditionV1.fromArgs, 'MasterEditionV1');
//# sourceMappingURL=MasterEditionV1.js.map