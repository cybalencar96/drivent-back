import jwt from "jsonwebtoken";

import UnauthorizedError from "@/errors/Unauthorized";
import User from "@/entities/User";
import Session from "@/entities/Session";
import Enrollment from "@/entities/Enrollment";

export async function signIn(email: string, password: string) {
  const user = await User.findByEmailAndPassword(email, password);

  if (!user) {
    throw new UnauthorizedError();
  }

  const token = jwt.sign({
    userId: user.id
  }, process.env.JWT_SECRET);

  const session = await Session.createNew(user.id, token);

  const enroll = await Enrollment.find({ userId: user.id });

  return {
    user: {
      id: user.id,
      email: user.email,
      enrolled: !!enroll[0],
    },

    token
  };
}
