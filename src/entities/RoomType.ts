import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("room_types")
export default class RoomType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
