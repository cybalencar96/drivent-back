import dotenv from "dotenv";

let path = ".env.test";

if (process.env.NODE_ENV === "development") {
  path = ".env.development";
}
if (process.env.NODE_ENV === "production") {
  path = ".env.production";
}

dotenv.config({ path });
