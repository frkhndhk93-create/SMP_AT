const express = require('express');
const { createBot } = require('mineflayer-viaproxy');

const app = express();
const PORT = process.env.PORT || 3000;

// وب‌سرور برای جلوگیری از خوابیدن رندر
app.get('/health', (req, res) => res.status(200).send('OK'));
app.listen(PORT, () => console.log(`Health server on ${PORT}`));

async function startBot() {
  try {
    const bot = await createBot({
      host: 'SMPxAT.aternos.me',
      port: 23292,
      username: 'AFK_Bot',
      version: '1.20.5',
      auth: 'offline',
      forceViaProxy: true,
      checkTimeoutInterval: 300 * 1000, // ۵ دقیقه صبر میکنه تا سرور آنلاین بشه
      physicsEnabled: false 
    });

    bot.on('spawn', () => console.log('Bot joined!'));
    bot.on('end', (reason) => {
      console.warn('Disconnected:', reason);
      setTimeout(startBot, 10000); 
    });
    bot.on('error', (err) => console.error('Bot error:', err));
  } catch (err) {
    console.error('Error starting bot:', err);
    setTimeout(startBot, 10000);
  }
}

startBot();
