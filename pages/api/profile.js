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

  const dataTypes = {
    warZone: 'wz',
    multiPlayer: 'mp',
  };

  const { warZone, multiPlayer } = dataTypes;

  let profile;

  if (profileResponse.data.type === warZone) {
    profile = profileResponse.data.lifetime.mode.br.properties;
  } else if (profileResponse.data.type === multiPlayer) {
    profile = profileResponse.data.lifetime.all.properties;
  }

  const formattedProfile = {
    ...profile,
    kdratio: profile.kdRatio || profile.kdratio,
    scorePerMinute: Math.round(profile.scorePerMinute * 100) / 100,
  };

  delete formattedProfile.kdRatio;

  formattedProfile.kdratio = Math.round(formattedProfile.kdratio * 100) / 100;

  res.status(200).json(formattedProfile);
};
