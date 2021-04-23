const jwt = require('jsonwebtoken');

export default async (req, res) => {
  const { cookie } = req.headers;

  let header;

  try {
    header = jwt.verify(cookie.replace('token=', ''), 'cod');
  } catch (error) {
    return res.status(401).json({});
  }

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

  const identity = await fetch('https://www.callofduty.com/api/papi-client/crm/cod/v2/identities', requestOptions);
  const identityObj = await identity.json();

  const info = identityObj.data.titleIdentities;

  res.status(200).json(info);
};
