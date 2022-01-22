import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Session } from "../../src/entities";

export default abstract class SessionFactory {
  static async createSession(userId: number) {
    const token = jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET
    );

    const session = getRepository(Session).create({ userId, token });
    await getRepository(Session).save(session);
    return session;
  }
}
