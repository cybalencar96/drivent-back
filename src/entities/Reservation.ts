import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import Room from "./Room";
import User from "./User";

@Entity("reservations")
export default class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer", name: "roomId" })
  roomId: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Room)
  room: Room;

  @CreateDateColumn()
  createdAt: Date;

  static async getReservationsByRoomId(roomId: number) {
    const reservations = await this.find({ room: { id: roomId } });
    return reservations;
  }
}
