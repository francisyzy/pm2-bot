import bot from "../lib/bot";
import { toEscapeHTMLMsg } from "../utils/messageHandler";
import { Scenes, session, Markup, Composer } from "telegraf";
import { getBotCommands } from "../utils/botCommands";
import checkAdmin from "../utils/checkAdmin";

//General helper commands
const helper = () => {
  //All bots start with /start
  bot.start((ctx) => {
    ctx.telegram.setMyCommands(getBotCommands());
    return ctx.reply("Welcome to a list of bots, /ls to see a list of bots");
  });

  bot.help((ctx) =>
    checkAdmin(ctx.from.id)
      ? ctx.reply(
          "Admin commands: \n/ls or /list\n/restart <id/name>",
        )
      : ctx.reply("/ls to list out the bots that are in this list"),
  );
};

export default helper;
