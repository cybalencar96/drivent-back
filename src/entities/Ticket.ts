import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import TicketType from "./TicketType";
import User from "./User";

@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TicketType, { eager: true })
  type: TicketType;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  paymentDate: Date;

  static async findTicketByUserId(userId: number) {
    const ticket = await this.findOne({ user: { id: userId } });
    return ticket;
  }
}
