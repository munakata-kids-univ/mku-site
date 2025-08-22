import type { APIRoute } from 'astro';
import { getMediaItems } from '../../lib/microcms';

export const GET: APIRoute = async ({ url }) => {
  try {
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    
    // microCMSからメディア記事を取得
    const mediaData = await getMediaItems(limit, offset);
    
    return new Response(JSON.stringify(mediaData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Media API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch media' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};