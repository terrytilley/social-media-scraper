import logger from 'morgan';
import express from 'express';

import { getTwitterCount, getInstagramCount } from './lib/scraper';
import './lib/cron';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(logger('dev'));

app.get('/scrape', async (req, res) => {
  const [twitterCount, instagramCount] = await Promise.all([
    getTwitterCount('https://twitter.com/wesbos/'),
    getInstagramCount('https://www.instagram.com/wesbos/'),
  ]);

  return res.json({ twitterCount, instagramCount });
});

app.listen(PORT, () =>
  console.log(`Scraper running on http://localhost:${PORT}`)
);
