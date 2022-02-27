import bot from "../lib/bot";
import { restart } from "../utils/pm2";
import { listPs } from "../utils/listPs";
import checkAdmin from "../utils/checkAdmin";

//pm2Commands commands
const pm2Commands = () => {
  // List command
  bot.hears(/^\/(list|ls)/, async (ctx) => {
    if (checkAdmin(ctx.from.id)) {
      ctx.replyWithHTML(await listPs());
    }
  });

  // Restart command
  bot.hears(/^\/restart (.+)/, async (ctx) => {
    if (checkAdmin(ctx.from.id)) {
      let process = ctx.match[1];

      let { err, response } = await restart(process);
      if (err) {
        console.error(err);
        //@ts-ignore err not defined by pm2
        return ctx.reply(err.message);
      }
      //@ts-ignore response not well defined in pm2 types
      for (const proc of response) {
        ctx.replyWithHTML(
          `Process <i>${proc.name}</i> has been restarted`,
        );
      }
    }
  });
};

export default pm2Commands;
