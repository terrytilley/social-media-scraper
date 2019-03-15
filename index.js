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

  const twitterFollowers = await getTwitterFollowers(twitterHTML);
  const instagramFollowers = await getInstagramFollowers(instagramHTML);

  console.log(`You have ${twitterFollowers} followers on Twitter.`);
  console.log(`You have ${instagramFollowers} followers on Instagram.`);
}

init();
