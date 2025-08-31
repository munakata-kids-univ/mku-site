function doPost(e) {
  console.log('doPost関数が呼び出されました');
  console.log('受信データ:', e);
  
  try {
    // スプレッドシート設定
    const SHEET_ID = '1PKCWIFPMsNwToKhcbtUQgJ_5uEBptWTMsapOdGXLCI4';
    const SHEET_NAME = 'mku-contact';

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    // フォームデータの取得（安全なエラーハンドリング）
    let data;
    
    if (!e || !e.postData) {
      data = e?.parameter || {};
    } else {
      const contentType = e.postData.type;
      
      if (contentType === 'application/x-www-form-urlencoded') {
        data = e.parameter;
      } else if (contentType === 'application/json') {
        data = JSON.parse(e.postData.contents);
      } else {
        data = e.parameter;
      }
    }

    // reCAPTCHA v3 検証
    const recaptchaToken = data['g-recaptcha-response'];
    if (!recaptchaToken) {
      console.error('reCAPTCHA token missing');
      return ContentService
        .createTextOutput(JSON.stringify({result: 'error', message: 'セキュリティ検証に失敗しました。'}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // reCAPTCHA サーバー検証
    const recaptchaSecretKey = PropertiesService.getScriptProperties().getProperty('RECAPTCHA_SECRET_KEY');
    if (!recaptchaSecretKey) {
      console.error('reCAPTCHA secret key not configured');
      return ContentService
        .createTextOutput(JSON.stringify({result: 'error', message: '設定エラーが発生しました。'}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const payload = {
      'secret': recaptchaSecretKey,
      'response': recaptchaToken
    };

    const options = {
      'method': 'POST',
      'payload': payload
    };

    const response = UrlFetchApp.fetch(verifyUrl, options);
    const verifyResult = JSON.parse(response.getContentText());

    console.log('reCAPTCHA検証結果:', verifyResult);

    // スコアチェック（0.5以上なら人間と判定）
    if (!verifyResult.success || verifyResult.score < 0.5) {
      console.error('reCAPTCHA verification failed:', verifyResult);
      return ContentService
        .createTextOutput(JSON.stringify({result: 'error', message: 'セキュリティ検証に失敗しました。'}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 新しい行を2行目に挿入（既存データを下にスライド）
    sheet.insertRowBefore(2);

    // 現在の日時を取得
    const now = new Date();
    const formattedDate = Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');

    // データを2行目に設定（reCAPTCHAスコア追加）
    sheet.getRange(2, 1, 1, 9).setValues([[
      formattedDate,              // A: 問い合わせ日時
      data.inquiryType || '',     // B: お問い合わせ種別
      data.name || '',            // C: お名前
      data.nameKana || '',        // D: お名前(カタカナ)
      data.organization || '',    // E: 学校名または法人名
      data.email || '',           // F: メールアドレス
      "'" + (data.phone || ''),   // G: 電話番号（先頭に'を付けて文字列として保存）
      data.message || '',         // H: お問い合わせ内容
      verifyResult.score          // I: reCAPTCHAスコア
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
      `■ reCAPTCHAスコア: ${verifyResult.score}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `【お問い合わせ内容】\n${data.message}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `※このメールは自動送信されています。\n` +
      `※スプレッドシートで詳細を確認できます：\n` +
      `https://docs.google.com/spreadsheets/d/1PKCWIFPMsNwToKhcbtUQgJ_5uEBptWTMsapOdGXLCI4/edit`;

    MailApp.sendEmail('naocreate52@gmail.com', subject, emailBody);

    // 成功レスポンス
    return ContentService
      .createTextOutput(JSON.stringify({result: 'success', message: 'お問い合わせを受け付けました。'}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({result: 'error', message: 'エラーが発生しました。'}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET リクエスト対応（接続テスト用）
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({result: 'success', message: 'Google Apps Script is working!'}))
    .setMimeType(ContentService.MimeType.JSON);
}

// OPTIONS リクエスト対応（CORS プリフライト）
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}