/**
 * 日付関連のユーティリティ関数
 * タイムゾーンに依存しない安全な日付処理を提供
 */

/**
 * 日付文字列またはタイムスタンプをローカルタイムゾーンでパースする（既存の動作と一致）
 * @param dateString - ISO形式の日付文字列（例: "2024-01-20" または "2024-01-20T15:00:00.000Z"）
 * @returns パースされた年、月、日を含むオブジェクト
 */
export function parseISODateString(dateString: string): { year: number; month: number; day: number } | null {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  
  // 無効な日付チェック
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date string: ${dateString}`);
    return null;
  }
  
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()は0ベースなので1を足す
  const day = date.getDate();
  
  return { year, month, day };
}

/**
 * 日付文字列を「YYYY.MM.DD」形式にフォーマット（ニュース用）
 * @param dateString - ISO形式の日付文字列
 * @returns フォーマットされた日付文字列
 */
export function formatDateForNews(dateString: string): string {
  const parsed = parseISODateString(dateString);
  if (!parsed) return dateString; // フォールバック
  
  const { year, month, day } = parsed;
  return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
}

/**
 * 日付文字列を「YYYY年M月D日(曜)」形式にフォーマット（講座用）
 * @param dateString - ISO形式の日付文字列
 * @returns フォーマットされた日付文字列
 */
export function formatDateForCourse(dateString: string): string {
  const parsed = parseISODateString(dateString);
  if (!parsed) return dateString; // フォールバック
  
  const { year, month, day } = parsed;
  
  // 曜日を計算（Dateオブジェクトを使用して既存の動作と一致）
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const weekday = calculateWeekday(dateString);
  const weekdayStr = weekdays[weekday];
  
  return `${year}年${month}月${day}日(${weekdayStr})`;
}

/**
 * 日付から曜日を計算（Dateオブジェクトを使用して既存の動作と一致）
 * @param dateString - 日付文字列
 * @returns 曜日（0=日曜日, 1=月曜日, ..., 6=土曜日）
 */
function calculateWeekday(dateString: string): number {
  const date = new Date(dateString);
  return date.getDay();
}

/**
 * 日付比較用：日付文字列を数値に変換（YYYYMMDD形式）
 * @param dateString - ISO形式の日付文字列
 * @returns 比較用の数値（例: 20240120）
 */
export function dateToNumber(dateString: string): number {
  const parsed = parseISODateString(dateString);
  if (!parsed) return 0;
  
  const { year, month, day } = parsed;
  return year * 10000 + month * 100 + day;
}