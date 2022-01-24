import faker from "@faker-js/faker";
import { getRepository } from "typeorm";
import { Ticket, TicketType, User } from "../../src/entities";

export default abstract class TicketFactory {
  static async createUnpaidTicket(user: User, type: TicketType) {
    const ticket = getRepository(Ticket).create({ user, type });
    await getRepository(Ticket).save(ticket);
    return ticket;
  }

  static async createPaidTicket(user: User) {
    const ticket = await getRepository(Ticket).findOne({ user });
    ticket.paymentDate = faker.date.past();
    await getRepository(Ticket).save(ticket);
    return ticket;
  }
}
