const jwt = require('jsonwebtoken');

export default async (req, res) => {
  // console.log(req.body);

  const { cookie } = req.headers;

  const { username, title, activityType, platform } = req.body;

  const header = jwt.verify(cookie.replace('token=', ''), 'cod');

  console.log(header);
  const myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    `XSRF-TOKEN=${header.xsrf}; ACT_SSO_COOKIE=${header.sso}; ACT_SSO_EXPRIY=${header.ssoExp}; atkn=${header.atkn}; ACT_SSO_EXPIRY=${header.ssoRem};`,
  );

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const wzProfile = await fetch(
    `https://my.callofduty.com/api/papi-client/stats/cod/v1/title/${title}/platform/${platform}/gamer/${username}/profile/type/${activityType}`,

    requestOptions,
  );
  const wzProfileResponse = await wzProfile.json();

  res.status(200).json({ wzProfileResponse });
};
