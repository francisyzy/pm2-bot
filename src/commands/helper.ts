import bot from "../lib/bot";
import { toEscapeHTMLMsg } from "../utils/messageHandler";
import { Scenes, session, Markup, Composer } from "telegraf";
import { getBotCommands } from "../utils/botCommands";

//General helper commands
const helper = () => {
  //All bots start with /start
  bot.start((ctx) => {
    ctx.setMyCommands(getBotCommands());
    return ctx.reply("Welcome to PM2 bot")
  });

  bot.help((ctx) => ctx.reply("Help message"));
};

export default helper;
