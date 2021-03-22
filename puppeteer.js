const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://profile.callofduty.com/cod/login');
  //   await page.waitFor(3000);
  await page.type('#username', 'stephen-1310@hotmail.com', { delay: 250 });
  await page.type('#password', 'Mag3.Rul35', { delay: 250 });
  await page.screenshot({ path: 'login.png' });
  await page.click('#login-button');
  await page.waitForNavigation();
  console.log('New Page URL:', page.url());
  const cookies = await page.cookies();
  console.log(cookies);
})();
