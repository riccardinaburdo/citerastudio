export const prerender = false;

export async function GET({ request }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const clientId = import.meta.env.OAUTH_CLIENT_ID;
  const clientSecret = import.meta.env.OAUTH_CLIENT_SECRET;

  if (!code || !clientId || !clientSecret) {
    return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
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

    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
