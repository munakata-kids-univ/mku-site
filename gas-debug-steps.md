# Google Apps Script CORS 設定確認手順

## 1. Google Apps Script Editor で確認すること

### A. デプロイ設定
1. **「デプロイ」** → **「デプロイを管理」**
2. **「アクセスできるユーザー」** = **「全員」** になっているか確認
3. **「権限」** で **「編集者」** 以上になっているか確認

### B. 実行権限確認
1. **「実行」** ボタンで doPost 関数を手動実行
2. **権限許可ダイアログ** が出た場合は許可する
3. **エラーが出ないか確認**

### C. ログ確認
1. **「実行数」** タブでログを確認
2. **エラーが記録されていないか確認**

## 2. テスト用 doGet 関数の追加

現在のコードの最後に以下を追加してテスト：

```javascript
// テスト用関数（追加）
function doGet() {
  return ContentService
    .createTextOutput('Google Apps Script is working!')
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}
```

保存後、ブラウザで直接URL（.../exec）にアクセスして「Google Apps Script is working!」が表示されるか確認。

## 3. 確認結果を報告してください

- [ ] デプロイ設定が「全員」になっている
- [ ] 権限エラーが出ていない  
- [ ] doGet テストで正常応答が返る
- [ ] コンソールにログが記録されている