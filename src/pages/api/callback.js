export const prerender = false;

export async function GET({ request }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const clientId = import.meta.env.OAUTH_CLIENT_ID;
  const clientSecret = import.meta.env.OAUTH_CLIENT_SECRET;

  if (!code || !clientId || !clientSecret) {
    return new Response('Missing parameters', { status: 400 });
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

    if (data.error || !data.access_token) {
      const html = `<!DOCTYPE html><html><body><script>
        var msg = "authorization:github:error:" + JSON.stringify(${JSON.stringify(data)});
        if (window.opener) {
          window.opener.postMessage(msg, "*");
        }
        window.close();
      </script><p>Auth error. You can close this window.</p></body></html>`;
      return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html' } });
    }

    const token = data.access_token;
    const html = `<!DOCTYPE html><html><body><script>
      (function() {
        var content = JSON.stringify({ token: "${token}", provider: "github" });
        var msg = "authorization:github:success:" + content;
        if (window.opener) {
          window.opener.postMessage(msg, "*");
          window.close();
        }
      })();
    </script><p>Authenticating... you can close this window if it doesn't close automatically.</p></body></html>`;

    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err) {
    return new Response('Error: ' + err.message, { status: 500 });
  }
}
