import mineflayer from "mineflayer";
import { pathfinder } from "mineflayer-pathfinder";

class Bot {
    bot: mineflayer.Bot;
    username: string;
    abortCurrentTask: boolean = false;
    taskRunning: boolean = false;
    
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

    async runTask(task: () => Promise<void>) {
        if (this.taskRunning) (
            this.abortCurrentTask = true
        )
        while (this.taskRunning) await new Promise(resolve => setTimeout(resolve, 100))
        this.taskRunning = true
        task().catch(() => 
            this.abortCurrentTask = false
        ).finally(() =>
            this.taskRunning = false
        )
    }
}

export default Bot