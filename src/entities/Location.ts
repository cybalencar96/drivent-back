import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("locations")
export default class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
