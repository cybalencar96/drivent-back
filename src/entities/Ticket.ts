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

  @ManyToOne(() => TicketType)
  type: TicketType;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  paymentDate: Date;

  static async createNew(body: Ticket) {
    const { type, user } = body;
    const date = new Date();
    const ticket = this.create({ paymentDate: date, type, user });
    await ticket.save();
    return ticket;
  }

  getTicket() {
    return ({
      id: this.id,
      type: this.type,
      user: this.user.id,
      paymentDate: this.paymentDate,
    });
  }
}
