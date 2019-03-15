import {
  getHTML,
  getTwitterFollowers,
  getInstagramFollowers,
} from './lib/scraper';

async function init() {
  const [twitterHTML, instagramHTML] = await Promise.all([
    getHTML('https://twitter.com/wesbos/'),
    getHTML('https://www.instagram.com/wesbos/'),
  ]);

  const [twitterFollowers, instagramFollowers] = await Promise.all([
    getTwitterFollowers(twitterHTML),
    getInstagramFollowers(instagramHTML),
  ]);

  console.log(`You have ${twitterFollowers} followers on Twitter.`);
  console.log(`You have ${instagramFollowers} followers on Instagram.`);
}

init();
