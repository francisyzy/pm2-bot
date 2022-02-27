import { Message } from "typegram";
import { Telegraf } from "telegraf";

import config from "./config";

import { toEscapeHTMLMsg } from "./utils/messageHandler";
import { printBotInfo } from "./utils/consolePrintUsername";

import bot from "./lib/bot";
import helper from "./commands/helper";
import pm2Commands from "./commands/pm2Commands";
import catchAll from "./commands/catch-all";

import { listPs } from "./utils/listPs";

//Production Settings
if (process.env.NODE_ENV === "production") {
  //Production Logging
  bot.use((ctx, next) => {
    if (ctx.message && config.LOG_GROUP_ID) {
      let userInfo: string;
      if (ctx.message.from.id !== config.ADMIN_ID) {
        if (ctx.message.from.username) {
          userInfo = `name: <a href="tg://user?id=${
            ctx.message.from.id
          }">${toEscapeHTMLMsg(ctx.message.from.first_name)}</a> (@${
            ctx.message.from.username
          })`;
        } else {
          userInfo = `name: <a href="tg://user?id=${
            ctx.message.from.id
          }">${toEscapeHTMLMsg(ctx.message.from.first_name)}</a>`;
        }
        const text = `\ntext: ${
          (ctx.message as Message.TextMessage).text
        }`;
        const logMessage = userInfo + toEscapeHTMLMsg(text);
        bot.telegram.sendMessage(config.LOG_GROUP_ID, logMessage, {
          parse_mode: "HTML",
        });
      }
    }
    return next();
  });
  bot.launch();
} else {
  //Development logging
  bot.use(Telegraf.log());
  bot.launch();
  printBotInfo(bot);
}

helper();
pm2Commands();

setInterval(async () => {
  if (config.ADMIN_ID !== 0) {
    bot.telegram.sendMessage(config.ADMIN_ID, await listPs(), {
      disable_notification: true,
      parse_mode: "HTML",
    });
  }
}, 330000);

//Catch all unknown messages/commands
catchAll();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
