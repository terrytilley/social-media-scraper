import axios from 'axios';
import cheerio from 'cheerio';

import db from './db';

export async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}

export async function getTwitterFollowers(html) {
  const $ = cheerio.load(html);
  return $('[data-nav="followers"] .ProfileNav-value').data('count');
}

export async function getInstagramFollowers(html) {
  const $ = cheerio.load(html);
  const dataString = $('script[type="application/ld+json"]').html();
  const {
    mainEntityofPage: {
      interactionStatistic: { userInteractionCount },
    },
  } = JSON.parse(dataString);

  return parseInt(userInteractionCount, 10);
}

export async function getTwitterCount(url) {
  const html = await getHTML(url);
  return getTwitterFollowers(html);
}

export async function getInstagramCount(url) {
  const html = await getHTML(url);
  return getInstagramFollowers(html);
}

export async function runCron() {
  console.log('⏰ RUNNING THE CRON');

  const [twitCount, instaCount] = await Promise.all([
    getTwitterCount('https://twitter.com/wesbos/'),
    getInstagramCount('https://www.instagram.com/wesbos/'),
  ]);

  db.get('twitter')
    .push({
      date: Date.now(),
      count: twitCount,
    })
    .write();

  db.get('instagram')
    .push({
      date: Date.now(),
      count: instaCount,
    })
    .write();

  console.log('✅ CRON DONE');
}
