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
exports.reservationListV1Beet = exports.ReservationListV1 = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const Key_1 = require("../types/Key");
const ReservationV1_1 = require("../types/ReservationV1");
class ReservationListV1 {
    constructor(key, masterEdition, supplySnapshot, reservations) {
        this.key = key;
        this.masterEdition = masterEdition;
        this.supplySnapshot = supplySnapshot;
        this.reservations = reservations;
    }
    static fromArgs(args) {
        return new ReservationListV1(args.key, args.masterEdition, args.supplySnapshot, args.reservations);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return ReservationListV1.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find ReservationListV1 account at ${address}`);
        }
        return ReservationListV1.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('h39cuaMfR1mQBrz4udyCJjVTKWuYuyGmdb6Nqw44F3d')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.reservationListV1Beet);
    }
    static deserialize(buf, offset = 0) {
        return exports.reservationListV1Beet.deserialize(buf, offset);
    }
    serialize() {
        return exports.reservationListV1Beet.serialize(this);
    }
    static byteSize(args) {
        const instance = ReservationListV1.fromArgs(args);
        return exports.reservationListV1Beet.toFixedFromValue(instance).byteSize;
    }
    static async getMinimumBalanceForRentExemption(args, connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(ReservationListV1.byteSize(args), commitment);
    }
    pretty() {
        return {
            key: 'Key.' + Key_1.Key[this.key],
            masterEdition: this.masterEdition.toBase58(),
            supplySnapshot: this.supplySnapshot,
            reservations: this.reservations,
        };
    }
}
exports.ReservationListV1 = ReservationListV1;
exports.reservationListV1Beet = new beet.FixableBeetStruct([
    ['key', Key_1.keyBeet],
    ['masterEdition', beetSolana.publicKey],
    ['supplySnapshot', beet.coption(beet.u64)],
    ['reservations', beet.array(ReservationV1_1.reservationV1Beet)],
], ReservationListV1.fromArgs, 'ReservationListV1');
//# sourceMappingURL=ReservationListV1.js.map