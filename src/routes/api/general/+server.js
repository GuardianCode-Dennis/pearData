import { API_GENERAL, INTERNAL_API_KEY } from '$env/static/private';

export async function GET({request}) {
    const clientKey = request.headers.get('x-api-key');

    if (clientKey !== INTERNAL_API_KEY) {
      return new Response('Unauthorized', { status: 401 });
    }

    try {
        const res = await fetch(API_GENERAL);
        if (!res.ok) return new Response('Failed to fetch', { status: 500 });
        const data = await res.json();
        return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response('Error', { status: 500 });
    }
}