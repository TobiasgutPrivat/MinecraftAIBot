import { Bot } from "mineflayer";

declare module 'mineflayer' {
  interface Bot {
    memory: {[key: string]: any} // must be json serializable
    saveMemory: () => void
  }
}

export function memory(bot: Bot) {
    bot.memory = {};

    // load saved memory from disk
    try {
        const fs = require('fs');
        const data = fs.readFileSync(`./memory/${bot.username}_memory.json`, 'utf8');
        bot.memory = JSON.parse(data);
    } catch (err) {
        console.log(`No saved memory for ${bot.username}`);
    }

    bot.saveMemory = function() {
        try {
            const fs = require('fs');
            fs.writeFileSync(`./memory/${bot.username}_memory.json`, JSON.stringify(bot.memory, null, 2));
            console.log(`Saved memory for ${bot.username}`);
        } catch (err) {
            console.error(`Error saving memory for ${bot.username}:`, err);
        }
    };

    bot.on('end', () => {
        bot.saveMemory();
    });

}

export default memory
