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

describe("post ticket/payment", () => {
  let user: User;
  let session: Session;
  let ticketType: TicketType;

  beforeAll(async () => {
    user = await UserFactory.createUser();
    session = await SessionFactory.createSession(user.id);
    ticketType = await TicketTypeFactory.createTicketType();
  });

  it("returns 200 if the ticket was successfully paid.", async () => {
    const result = await agent
      .post("/ticket/Payment")
      .send({ body: { user: user.id, type: ticketType.id } })
      .set("Authorization", `Bearer ${session.token}`);
    expect(result.body.type.id).toEqual(ticketType.id);
    expect(result.body.type.name).toEqual(ticketType.name);
    expect(result.body.type.price).toEqual(ticketType.price.toFixed(2));
    expect(result.body.type.hotelPrice).toEqual(ticketType.hotelPrice.toFixed(2));
    expect(result.status).toEqual(200);
  });

  it("returns message and details message erroe if invalid typeTicket id (diff 1, 2 or 3)", async () => {
    const result = await agent
      .post("/ticket/Payment")
      .send({ body: { user: user.id, type: 8 } })
      .set("Authorization", `Bearer ${session.token}`);
    expect(result.body.message).toBe("Invalid body");
    expect(result.body.details).toContain("\"body.type\" must be one of [1, 2, 3]");
    expect(result.status).toEqual(422);
  });

  it("returns message if invalid user id", async () => {
    const result = await agent
      .post("/ticket/Payment")
      .send({ body: { user: 44, type: ticketType.id } })
      .set("Authorization", `Bearer ${session.token}`);
    expect(result.body.message).toBe("usuário não existe");
    expect(result.status).toEqual(400);
  });

  it("returns 400 if invalid body", async () => {
    const result = await agent
      .post("/ticket/Payment")
      .send({})
      .set("Authorization", `Bearer ${session.token}`);
    expect(result.body.message).toBe("Invalid body");
    expect(result.status).toEqual(400);
  });
});
