import mineflayer from "mineflayer";
import { pathfinder } from "mineflayer-pathfinder";

class Bot {
    bot: mineflayer.Bot;
    username: string;
    
    constructor(username: string) {
        this.username = username;
        this.bot = mineflayer.createBot({username: username});

        this.bot.loadPlugin(pathfinder)
    
        this.bot.on('spawn', () => {
            this.bot.chat("Hello world!");
        })
        this.bot.on('chat', (username, message) => {
            if (username === this.username) return
            this.bot.chat("Hello response!");
        })
    }
}

export default Bot