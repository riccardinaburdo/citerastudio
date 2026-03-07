export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  if (!clientId) {
    return res.status(500).json({ error: 'OAUTH_CLIENT_ID not configured' });
  }
  const redirectUrl = 'https://github.com/login/oauth/authorize?client_id=' + clientId + '&scope=repo,user';
  res.writeHead(301, { Location: redirectUrl });
  res.end();
}
