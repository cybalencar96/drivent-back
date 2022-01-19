import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Room from "./Room";
import User from "./User";

@Entity("reservations")
export default class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Room)
  room: Room;

  @Column()
  createdAt: Date;
}
