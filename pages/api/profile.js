const jwt = require('jsonwebtoken');

export default async (req, res) => {
  const { cookie } = req.headers;

  const { username, title, activityType, platform } = req.body;

  const header = jwt.verify(cookie.replace('token=', ''), 'cod');

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

  const profileStats = await fetch(
    `https://my.callofduty.com/api/papi-client/stats/cod/v1/title/${title}/platform/${platform}/gamer/${username}/profile/type/${activityType}`,

    requestOptions,
  );
  const profileResponse = await profileStats.json();

  console.log(profileResponse);

  // const profile = profileResponse.data.lifetime.mode.br.properties;

  // const profile = profileResponse.data.lifetime.all.properties;

  let profile;

  if (profileResponse.data.type === 'wz') {
    profile = profileResponse.data.lifetime.mode.br.properties;
  } else if (profileResponse.data.type === 'mp') {
    profile = profileResponse.data.lifetime.all.properties;
  }

  console.log(profile);

  res.status(200).json(profile);
};
