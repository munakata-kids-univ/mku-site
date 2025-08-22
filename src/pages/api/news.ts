import type { APIRoute } from 'astro';
import { getNewsItems } from '../../lib/microcms';

export const GET: APIRoute = async ({ url }) => {
  try {
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    
    // microCMSからニュース記事を取得
    const newsData = await getNewsItems(limit, offset);
    
    return new Response(JSON.stringify(newsData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('News API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch news' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};