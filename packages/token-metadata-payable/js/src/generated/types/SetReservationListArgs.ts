/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import { Reservation, reservationBeet } from './Reservation'
export type SetReservationListArgs = {
  reservations: Reservation[]
  totalReservationSpots: beet.COption<beet.bignum>
  offset: beet.bignum
  totalSpotOffset: beet.bignum
}

/**
 * @category userTypes
 * @category generated
 */
export const setReservationListArgsBeet =
  new beet.FixableBeetArgsStruct<SetReservationListArgs>(
    [
      ['reservations', beet.array(reservationBeet)],
      ['totalReservationSpots', beet.coption(beet.u64)],
      ['offset', beet.u64],
      ['totalSpotOffset', beet.u64],
    ],
    'SetReservationListArgs'
  )