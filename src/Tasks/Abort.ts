import Bot from "../Bot";

function checkAbort(bot: Bot) {
    if (bot.abortCurrentTask) {
        bot.aborted = true;
        throw new Error("Aborted");
    }
}

export default checkAbort;