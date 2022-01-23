import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Hotel from "./Hotel";
import RoomType from "./RoomType";

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
}
