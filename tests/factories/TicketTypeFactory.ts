import faker from "@faker-js/faker";
import { getRepository } from "typeorm";
import { TicketType } from "../../src/entities";

export default abstract class TicketTypeFactory {
  static async createTicketType() {
    const ticket = {
      name: faker.random.word(),
      price: parseFloat(faker.commerce.price()),
      hotelPrice: parseFloat(faker.commerce.price()),
    };

    const newTicket = getRepository(TicketType).create(ticket);
    await getRepository(TicketType).save(newTicket);
    return newTicket;
  }
}
