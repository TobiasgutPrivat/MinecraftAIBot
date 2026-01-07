import Bot from "../Bot";
import checkAbort from "./Abort";

function GetItem(bot: Bot, item: string) {
    checkAbort(bot);
    //get item
}

function gatherItem(bot: Bot, item: id) { // get id from bot.bot.registry.itemsByName[item].id
    checkAbort(bot);
    //gather item
    bot.bot.registry.

    const blocks = Object.values(bot.bot.registry.blocks)
    .filter(block => block.drops?.includes(item));
}