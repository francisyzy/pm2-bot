import bot from "../lib/bot";
import { restart } from "../utils/pm2";
import { listPs } from "../utils/listPs";
import checkAdmin from "../utils/checkAdmin";
import bots from "../../bots.json";

//pm2Commands commands
const pm2Commands = () => {
  // List command
  bot.hears(/^\/(list|ls)/, async (ctx) => {
    if (checkAdmin(ctx.from.id)) {
      ctx.replyWithHTML(await listPs());
    } else {
      if (bots.length === 0) {
        return ctx.reply("No bots in the list");
      }
      let returnMessage = "Bots listed\n\n";
      bots.forEach((bot) => {
        if (bot.username.indexOf("@") === -1) {
          returnMessage += `@${bot.username}\n`;
        } else {
          returnMessage += `${bot.username}\n`;
        }
        returnMessage += `<i>${bot.description}</i>\n\n`;
      });
      return ctx.replyWithHTML(returnMessage);
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
