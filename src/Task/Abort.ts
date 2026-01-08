import {Bot} from "mineflayer";

function checkAbort(bot: Bot) {
    if (bot.task.abortCurrentTask) {
        throw new Error("Aborted");
    }
}

export default checkAbort;