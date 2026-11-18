const express = require('express');
const mineflayer = require('mineflayer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => res.status(200).send('OK'));
app.listen(PORT, () => console.log(`Health server on ${PORT}`));

function createBot() {
  const bot = mineflayer.createBot({
    host: 'SMPxAT.aternos.me', // <--- آدرس جدید Aternos رو اینجا بذار
    port: 23292,               // <--- پورت جدید Aternos رو اینجا بذار
    username: 'AFK_Bot',   
    version: '1.20.5',
    auth: 'offline',
    checkTimeoutInterval: 300 * 1000 
  });

  bot.on('spawn', () => console.log('Bot joined!'));
  bot.on('end', (reason) => {
    console.warn('Disconnected:', reason);
    setTimeout(createBot, 5000); 
  });
  bot.on('error', console.error);
}

createBot();
