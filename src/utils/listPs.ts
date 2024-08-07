import config from "../config";
import bot from "../lib/bot";
import { getFirstAdmin } from "./checkAdmin";
import { pad, timeSince } from "./messageHandler";
import { list } from "./pm2";

export async function listPs(): Promise<string> {
  const status = {
    online: "\u{2705}",
    stopping: "\u{1F6AB}",
    stopped: "\u{1F6AB}",
    launching: "\u{267B}",
    errored: "\u{1F198}",
  };

  let { err, response } = await list();
  if (err) {
    console.error(err);
    //@ts-ignore error not well defined in pm2 types
    return err.message;
  }
  let body = [`${new Date().toString()}`];
  //@ts-ignore response not well defined in pm2 types
  for (const proc of response) {
    body.push(
      [
        `<b>${proc.name}</b> ${
          //@ts-ignore status is unknown, cannot get correct emoji
          status[proc.pm2_env.status] || ""
        }<pre>`,
        pad`ID: ${proc.pm_id}`,
        pad`MEM: ${Math.round(proc.monit.memory / 1024 / 1024)}Mb`,
        pad`CPU: ${proc.monit.cpu} %`,
        pad`UPTIME: ${timeSince(proc.pm2_env.pm_uptime)}`,
        pad`UPTIME_: ${proc.pm2_env.pm_uptime}`,
        pad`RESTARTS: ${proc.pm2_env.restart_time}`,
        pad`STATUS: ${proc.pm2_env.status}`,
        "</pre>",
      ].join("\n"),
    );
    // if (
    //   proc.pm2_env.status !== "online" &&
    //   getFirstAdmin() !== 0 &&
    //   config.LOG_GROUP_ID
    // ) {
    //   bot.telegram.sendMessage(
    //     config.LOG_GROUP_ID,
    //     `Hey <a href="tg://user?id=${getFirstAdmin()}">Admin!</a>, one of the apps is not "online"`,
    //     { parse_mode: "HTML" },
    //   );
    // }
  }
  return body.join("\n");
}
