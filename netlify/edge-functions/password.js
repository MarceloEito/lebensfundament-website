// Optional password protection while the site is in a test phase.
// Set SITE_PASSWORD (and optionally SITE_USER, default "gemeinde") under
// Netlify → Site configuration → Environment variables, then redeploy.
// Without SITE_PASSWORD every page is public as usual.
export default async (request, context) => {
  const password = Netlify.env.get('SITE_PASSWORD');
  if (!password) return context.next();

  const user = Netlify.env.get('SITE_USER') || 'gemeinde';
  const [scheme, encoded] = (request.headers.get('authorization') || '').split(' ');
  if (scheme === 'Basic' && encoded) {
    try {
      // Decode as UTF-8 so passwords with umlauts work
      const bytes = Uint8Array.from(atob(encoded), c => c.charCodeAt(0));
      const [givenUser, ...rest] = new TextDecoder().decode(bytes).split(':');
      if (givenUser === user && rest.join(':') === password) return context.next();
    } catch {
      // malformed header: fall through to the login prompt
    }
  }

  return new Response('Diese Seite ist noch nicht öffentlich.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Lebensfundament", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
};

export const config = { path: '/*' };
