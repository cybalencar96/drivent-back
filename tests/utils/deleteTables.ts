import { getConnection } from "typeorm";
import {
  Address,
  Enrollment,
  Hotel,
  Reservation,
  Room,
  RoomType,
  Session,
  Setting,
  Ticket,
  TicketType,
  User,
} from "../../src/entities";

export default async function deleteTables() {
  await getConnection().createQueryBuilder().delete().from(Ticket).execute();
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(TicketType)
    .execute();
  await getConnection().createQueryBuilder().delete().from(Session).execute();
  await getConnection().createQueryBuilder().delete().from(User).execute();
  await getConnection().createQueryBuilder().delete().from(Address).execute();
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Enrollment)
    .execute();
  await getConnection().createQueryBuilder().delete().from(Setting).execute();
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Reservation)
    .execute();
  await getConnection().createQueryBuilder().delete().from(Room).execute();
  await getConnection().createQueryBuilder().delete().from(RoomType).execute();
  await getConnection().createQueryBuilder().delete().from(Hotel).execute();
}
