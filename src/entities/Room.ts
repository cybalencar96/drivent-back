import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reservation, Hotel, RoomType } from ".";
import roomTypes from "../enums/roomTypes";

@Entity("rooms")
export default class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer" })
  number: number;

  @Column({ type: "integer", name: "hotelId" })
  hotelId: number;

  @ManyToOne(() => RoomType, { eager: true })
  type: RoomType;

  @ManyToOne(() => Hotel)
  hotel: Hotel;

  async getRoomInfo() {
    const reservations = await Reservation.getReservationsByRoomId(this.id);
    return {
      number: this.number,
      totalBeds: roomTypes[this.type.name],
      occupiedBeds: reservations.length,
    };
  }
}
