import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ticket_types")
export default class TicketType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "numeric", precision: 8, scale: 2 })
  price: number;

  @Column({ type: "numeric", precision: 8, scale: 2, nullable: true })
  hotelPrice: number;
}
