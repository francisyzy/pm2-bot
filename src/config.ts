import * as dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || "3000",
  API_TOKEN: process.env.API_TOKEN,
  LOG_GROUP_ID: process.env.LOG_GROUP_ID,
  ADMIN_ID: Number(process.env.ADMIN_ID) || 0,
};

export default config;
