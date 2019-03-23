import cors from 'cors';
import logger from 'morgan';
import express from 'express';

import { getTwitterCount, getInstagramCount } from './lib/scraper';
import './lib/cron';
import db from './lib/db';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(logger('dev'));

app.get('/scrape', async (req, res) => {
  const [twitterCount, instagramCount] = await Promise.all([
    getTwitterCount('https://twitter.com/wesbos/'),
    getInstagramCount('https://www.instagram.com/wesbos/'),
  ]);

  return res.json({ twitterCount, instagramCount });
});

app.get('/data', async (req, res) => {
  const twitter = db.value();
  return res.json(twitter);
});

app.listen(PORT, () =>
  console.log(`Scraper running on http://localhost:${PORT}`)
);
