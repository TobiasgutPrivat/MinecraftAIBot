import Bot from "../Bot";

function checkAbort(bot: Bot) {
    if (bot.abortCurrentTask) {
        throw new Error("Aborted");
    }
}

export default checkAbort;