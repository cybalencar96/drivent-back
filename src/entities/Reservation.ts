import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
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

  @ManyToOne(() => Room)
  room: Room;

  @CreateDateColumn()
  createdAt: Date;

  static async getReservationsByRoomId(roomId: number) {
    const reservations = await this.find({ room: { id: roomId } });
    return reservations;
  }

  getReservation() {
    return {
      id: this.id,
      room: this.room,
      createdAt: this.createdAt,
    };
  }
}
