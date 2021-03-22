const jwt = require('jsonwebtoken');

export default async (req, res) => {
  console.log(req.headers);

  const { authorization } = req.headers;

  const header = jwt.verify(authorization, 'cod');

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

  const identity = await fetch('https://www.callofduty.com/api/papi-client/crm/cod/v2/identities', requestOptions);
  const identityResponse = await identity.json();

  res.status(200).json({ identityResponse });
};
