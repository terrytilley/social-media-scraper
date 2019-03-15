import axios from 'axios';
import cheerio from 'cheerio';

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
