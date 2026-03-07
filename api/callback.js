export default async function handler(req, res) {
  const code = req.query.code;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!code || !clientId || !clientSecret) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });

    const data = await response.json();
    const token = data.access_token;

    const html = '<html><body><script>'
      + '(function() {'
      + '  var token = "' + token + '";'
      + '  var content = JSON.stringify({ token: token, provider: "github" });'
      + '  function recieveMessage(e) {'
      + '    window.opener.postMessage("authorization:github:success:" + content, e.origin);'
      + '  }'
      + '  window.addEventListener("message", recieveMessage, false);'
      + '  window.opener.postMessage("authorizing:github", "*");'
      + '})();'
      + '</script></body></html>';

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
