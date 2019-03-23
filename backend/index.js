import cors from 'cors';
import logger from 'morgan';
import express from 'express';

import { getTwitterCount, getInstagramCount } from './lib/scraper';
import { uniqueCount } from './lib/utils';
import db from './lib/db';
import './lib/cron';

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
  const { twitter, instagram } = db.value();
  const uniqueTwitter = uniqueCount(twitter);
  const uniqueInstagram = uniqueCount(instagram);

  return res.json({ twitter: uniqueTwitter, instagram: uniqueInstagram });
});

app.listen(PORT, () =>
  console.log(`Scraper running on http://localhost:${PORT}`)
);
