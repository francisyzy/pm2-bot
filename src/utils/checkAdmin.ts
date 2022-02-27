import config from "../config";

export default function checkAdmin(userId: number) {
  return userId === config.ADMIN_ID;
}
