import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from ".";

@Entity("events")
export default class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToMany(() => User, user => user.id)
  @JoinTable({
    name: "users_events",
    joinColumn: {
      name: "eventId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "userId",
      referencedColumnName: "id",
    },
  })
  users: User[]
}
