import mineflayer from "mineflayer";
import { pathfinder } from "mineflayer-pathfinder";
import task from "./Task/Task";
import tpsScoreboard from "./lib/TpsScoreboard";

function createBot(username: string): void {
    // create bot
    const bot: mineflayer.Bot = mineflayer.createBot({
        host: "localhost",
        port: 25565,
        username: username
    });

    // load plugins
    bot.loadPlugin(pathfinder)
    bot.loadPlugin(task)
    bot.loadPlugin(tpsScoreboard)
    
    // Hello world
    bot.on('spawn', () => {
        bot.chat("Hello world!");
    })

    bot.on('chat', (username, message) => {
        if (username === bot.username) return
        bot.chat("Hello response!");
    })
}

export default createBot;