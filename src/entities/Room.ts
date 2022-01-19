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

  @ManyToOne(() => RoomType)
  type: RoomType;

  @ManyToOne(() => Hotel)
  hotel: Hotel;
}