import {Bot} from "mineflayer";
import checkAbort from "./Abort";

function GetItem(bot: Bot, item: string) {
    checkAbort(bot);
    //get item
    bot.registry.recipes
}

function gatherItem(bot: Bot, item: number) { // get id from bot.registry.itemsByName[item].id
    checkAbort(bot);
    //gather item

    const mineableBlocks = Object.values(bot.registry.blocks).filter(block => block.drops?.includes(item));
}