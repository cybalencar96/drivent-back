import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from "typeorm";
import User from "./User";
import Location from "./Location";

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

  @Column()
  vacancies: number;

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
  users: User[];

  @OneToOne(() => Location, { eager: true })
  @JoinColumn()
    location: Location;
}
