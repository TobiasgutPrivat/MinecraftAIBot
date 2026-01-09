import { Bot } from "mineflayer";

// Use `/gamerule sendCommandFeedback false` to disable command feedback

export function tpsScoreboard(bot: Bot) {
  let performanceTickCount = 0;
  let lastPerformanceCheck = Date.now();

  bot.once("spawn", () => {
    bot.chat('/gamerule sendCommandFeedback false');
    bot.chat('/scoreboard objectives add TPS dummy "TPS"');
    bot.chat('/scoreboard objectives setdisplay sidebar TPS');
  });

  bot.on('physicsTick', function tick() {
    performanceTickCount++;
    const now = Date.now();

    if (now - lastPerformanceCheck >= 1000) {
      const tps = Math.round(performanceTickCount / ((now - lastPerformanceCheck) / 1000));
      bot.chat(`/scoreboard players set ${bot.username} TPS ${tps}`);
      performanceTickCount = 0;
      lastPerformanceCheck = now;
    }
  });
}

export default tpsScoreboard;