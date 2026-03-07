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

    if (data.error) {
      const errorHtml = `<!DOCTYPE html><html><body><script>
        window.opener && window.opener.postMessage(
          'authorization:github:error:${JSON.stringify(data)}',
          window.opener.location.origin
        );
      </script></body></html>`;
      return new Response(errorHtml, { status: 200, headers: { 'Content-Type': 'text/html' } });
    }

    const token = data.access_token;
    const provider = 'github';

    const html = `<!DOCTYPE html><html><body><script>
      var data = { token: "${token}", provider: "${provider}" };
      var msg = "authorization:github:success:" + JSON.stringify(data);
      if (window.opener) {
        window.opener.postMessage(msg, window.opener.location.origin);
      }
      window.close();
    </script></body></html>`;

    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
