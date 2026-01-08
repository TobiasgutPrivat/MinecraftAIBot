import mineflayer from "mineflayer";
import { pathfinder } from "mineflayer-pathfinder";

declare module 'mineflayer' {
  interface Bot {
    task:{
        taskRunning: boolean
        abortCurrentTask: boolean
        runTask(task: () => Promise<void>): Promise<void>
    }
  }
}

function task(bot: mineflayer.Bot): void {
    // load dependencies
    bot.loadPlugin(pathfinder)

    // plugin state
    bot.task = bot.task || {} as any
    bot.task.taskRunning = false
    bot.task.abortCurrentTask = false

    bot.task.runTask =  async function (task: () => Promise<void>) {
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

export default task