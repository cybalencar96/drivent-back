/* eslint-disable space-before-function-paren */
import app, { init } from "../../src/app";
import supertest from "supertest";
import deleteTables from "../utils/deleteTables";
import { Session, TicketType, User } from "../../src/entities";
import {
  UserFactory,
  SessionFactory,
  TicketTypeFactory,
  TicketFactory,
} from "../factories";
import endConnection from "../utils/endConnection";

const agent = supertest(app);

beforeAll(async () => {
  await init();
  await deleteTables();
});

afterAll(async () => {
  await endConnection();
});

describe("get /ticket", () => {
  let user: User;
  let session: Session;
  let ticketType: TicketType;

  beforeAll(async () => {
    user = await UserFactory.createUser();
    session = await SessionFactory.createSession(user.id);
    ticketType = await TicketTypeFactory.createTicketType();
  });

  it("returns 204 when ticket doesn't exist", async () => {
    const result = await agent
      .get("/ticket")
      .set("Authorization", `Bearer ${session.token}`);
    expect(result.status).toEqual(204);
  });

  it("returns 200 and an object with not null properties and false when ticket is unpaid", async () => {
    const ticket = await TicketFactory.createUnpaidTicket(user, ticketType);
    const result = await agent
      .get("/ticket")
      .set("Authorization", `Bearer ${session.token}`);
    expect(result.status).toEqual(200);
    expect(result.body.type).toEqual(ticket.type.name);
    expect(result.body.price.replace(".00", "")).toEqual(
      ticket.type.price.toString()
    );
    expect(result.body.hotelPrice.replace(".00", "")).toEqual(
      ticket.type.hotelPrice.toString()
    );
    expect(result.body.isPaid).toEqual(false);
  });

  it("returns 200 and an object with isPaid true when ticket is paid", async () => {
    const ticket = await TicketFactory.createPaidTicket(user);
    const result = await agent
      .get("/ticket")
      .set("Authorization", `Bearer ${session.token}`);
    expect(result.status).toEqual(200);
    expect(result.body.type).toEqual(ticket.type.name);
    expect(result.body.price).toEqual(ticket.type.price.toString());
    expect(result.body.hotelPrice).toEqual(ticket.type.hotelPrice.toString());
    expect(result.body.isPaid).toEqual(true);
  });
});
