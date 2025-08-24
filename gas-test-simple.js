function doPost(e) {
  console.log('テスト用doPost関数が呼び出されました');
  console.log('受信データ:', JSON.stringify(e.parameter));
  
  try {
    // テスト用：スプレッドシートIDとシート名
    const SHEET_ID = '1PKCWIFPMsNwToKhcbtUQgJ_5uEBptWTMsapOdGXLCI4';
    const SHEET_NAME = 'test-form';
    
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    
    // テスト用シートを取得または作成
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // ヘッダー行を追加
      sheet.appendRow(['タイムスタンプ', 'お名前', 'メールアドレス', 'お問い合わせ内容']);
    }
    
    // フォームデータの取得
    const data = e.parameter;
    
    // 現在の日時
    const now = new Date();
    const timestamp = Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
    
    // データを追加
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.email || '',  
      data.message || ''
    ]);
    
    console.log('データ保存完了');
    
    // 成功レスポンス
    return ContentService
      .createTextOutput(JSON.stringify({
        result: 'success', 
        message: 'テスト成功',
        receivedData: data
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('エラー:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        result: 'error', 
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('テスト用GAS稼働中')
    .setMimeType(ContentService.MimeType.TEXT);
}