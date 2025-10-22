// netlify/functions/rsvp.js
export async function handler(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',          // permite qualquer origem (GitHub Pages)
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // responde OPTIONS para preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  try {
    const body = event.body; // string JSON do HTML
    const targetUrl = 'https://script.google.com/macros/s/AKfycbwztbIXINRLAj9Qn6tj9ZuVH6RawFq9lqVkDO9nVLokfKJRri9vu_cvbQKB8LoZtqw/exec';

    const resp = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });

    const text = await resp.text();
    return { statusCode: resp.status, body: text, headers };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }), headers };
  }
}
