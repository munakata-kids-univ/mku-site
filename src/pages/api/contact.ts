import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // フォームデータを取得
    const formData = await request.formData();
    
    const data = {
      inquiryType: formData.get('inquiryType')?.toString() || '',
      name: formData.get('name')?.toString() || '',
      nameKana: formData.get('nameKana')?.toString() || '',
      organization: formData.get('organization')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      message: formData.get('message')?.toString() || ''
    };

    // バリデーション
    if (!data.name || !data.nameKana || !data.email || !data.phone || !data.inquiryType) {
      return new Response(JSON.stringify({ 
        result: 'error', 
        message: '必須項目が入力されていません' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // メール送信処理（今回は簡略化）
    console.log('お問い合わせフォーム送信:', data);
    
    // 成功レスポンス
    return new Response(JSON.stringify({ 
      result: 'success',
      message: 'お問い合わせを受け付けました' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(JSON.stringify({ 
      result: 'error', 
      message: 'サーバーエラーが発生しました' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};