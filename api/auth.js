export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  if (!clientId) {
    res.status(500).json({ error: 'OAUTH_CLIENT_ID not configured' });
    return;
  }
  const redirectUrl = 'https://github.com/login/oauth/authorize?client_id=' + clientId + '&scope=repo,user';
  res.writeHead(302, { Location: redirectUrl });
  res.end();
}
