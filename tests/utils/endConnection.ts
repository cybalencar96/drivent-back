import { getConnection } from "typeorm";

export default async function endConnection() {
  await getConnection().close();
}
