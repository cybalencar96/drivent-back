import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export default class TicketType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "numeric", precision: 8, scale: 2 })
  price: number;

  @Column({ type: "numeric", precision: 8, scale: 2 })
  hotelPrice: number;
}
