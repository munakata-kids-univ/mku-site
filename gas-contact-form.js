function doPost(e) {
    try {
      // スプレッドシート設定
      const SHEET_ID = '1PKCWIFPMsNwToKhcbtUQgJ_5uEBptWTMsapOdGXLCI4';
      const SHEET_NAME = 'mku-contact';

      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

      // フォームデータの取得
      const data = JSON.parse(e.postData.contents);

      // 新しい行を2行目に挿入（既存データを下にスライド）
      sheet.insertRowBefore(2);

      // 現在の日時を取得
      const now = new Date();
      const formattedDate = Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');

      // データを2行目に設定
      sheet.getRange(2, 1, 1, 8).setValues([[
        formattedDate,              // A: 問い合わせ日時
        data.inquiryType || '',     // B: お問い合わせ種別
        data.name || '',            // C: お名前
        data.nameKana || '',        // D: お名前(カタカナ)
        data.organization || '',    // E: 学校名または法人名
        data.email || '',           // F: メールアドレス
        data.phone || '',           // G: 電話番号
        data.message || ''          // H: お問い合わせ内容
      ]]);

      // 通知メール送信
      const subject = `【むなかた子ども大学HP】新しいお問い合わせ: ${data.inquiryType}`;
      const emailBody = `むなかた子ども大学HPに新しいお問い合わせがありました。\n\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `■ 受信日時: ${formattedDate}\n` +
        `■ お問い合わせ種別: ${data.inquiryType}\n` +
        `■ お名前: ${data.name}\n` +
        `■ お名前（カタカナ）: ${data.nameKana}\n` +
        `■ 学校名または法人名: ${data.organization}\n` +
        `■ メールアドレス: ${data.email}\n` +
        `■ 電話番号: ${data.phone}\n` +
        `━━━━━━━━━━━━━━━━━━━━\n\n` +
        `【お問い合わせ内容】\n${data.message}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `※このメールは自動送信されています。\n` +
        `※スプレッドシートで詳細を確認できます：\n` +
        `https://docs.google.com/spreadsheets/d/1PKCWIFPMsNwToKhcbtUQgJ_5uEBptWTMsapOdGXLCI4/edit`;

      MailApp.sendEmail('naocreate52@gmail.com', subject, emailBody);

      // CORS対応のレスポンス
      return ContentService
        .createTextOutput(JSON.stringify({result: 'success', message: 'お問い合わせを受け付けました。'}))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        });

    } catch (error) {
      console.error('Error:', error);
      return ContentService
        .createTextOutput(JSON.stringify({result: 'error', message: 'エラーが発生しました。'}))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        });
    }
  }

// OPTIONS リクエスト対応（プリフライトリクエスト）
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}