const puppeteer = require('puppeteer');
const jwt = require('jsonwebtoken');

export default async (req, res) => {
  const { body } = req;
  const { username, password } = body;
  console.log(body);

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://profile.callofduty.com/cod/login');
  //   await page.waitFor(3000);
  await page.type('#username', username, { delay: 100 });
  await page.type('#password', password, { delay: 100 });
  // await page.screenshot({ path: 'login.png' });
  await page.click('#login-button');
  await page.waitForNavigation();
  console.log('New Page URL:', page.url());
  const cookies = await page.cookies();
  console.log(cookies);

  const atknObj = cookies.find((o) => o.name === 'atkn');
  const ssoObj = cookies.find((o) => o.name === 'ACT_SSO_COOKIE');
  const ssoExpObj = cookies.find((o) => o.name === 'ACT_SSO_COOKIE_EXPIRY');
  const ssoRemObj = cookies.find((o) => o.name === 'ACT_SSO_REMEMBER_ME');
  const xsrfToken = cookies.find((o) => o.name === 'XSRF-TOKEN');

  const atkn = atknObj.value;
  const xsrf = xsrfToken.value;
  const sso = ssoObj.value;
  const ssoExp = ssoExpObj.value;
  const ssoRem = ssoRemObj.value;

  const token = jwt.sign({ atkn, xsrf, sso, ssoExp, ssoRem }, 'cod');

  res.status(200).json({ token });
};
