export const prerender = false;

export function GET() {
  const clientId = import.meta.env.OAUTH_CLIENT_ID;
  if (!clientId) {
    return new Response(JSON.stringify({ error: 'OAUTH_CLIENT_ID not configured' }), { status: 500 });
  }
  const redirectUrl = 'https://github.com/login/oauth/authorize?client_id=' + clientId + '&scope=repo,user';
  return Response.redirect(redirectUrl, 302);
}
