import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("hotels")
export default class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imageUrl: string;
}
