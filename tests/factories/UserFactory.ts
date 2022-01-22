import faker from "@faker-js/faker";
import bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import { User } from "../../src/entities";

export default abstract class UserFactory {
  static hashedPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  static async createUser() {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const newUser = getRepository(User).create({
      email: user.email,
      password: this.hashedPassword(user.password),
    });
    await getRepository(User).save(newUser);
    return newUser;
  }
}
