const express = require('express');
const { createBot } = require('mineflayer-viaproxy');

const app = express();
const PORT = process.env.PORT || 3000;

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
      forceViaProxy: true 
    });

    bot.on('spawn', () => console.log('Bot joined!'));
    bot.on('end', (reason) => {
      console.warn('Disconnected:', reason);
      setTimeout(startBot, 5000);
    });
    bot.on('error', console.error);
  } catch (err) {
    console.error('Error starting bot:', err);
    setTimeout(startBot, 5000);
  }
}

startBot();
