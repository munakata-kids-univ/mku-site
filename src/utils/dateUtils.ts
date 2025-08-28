/**
 * 日付関連のユーティリティ関数
 * UTC日付データを明示的にJST(Asia/Tokyo)に変換して安全な日付処理を提供
 */

/**
 * UTC日付文字列を明示的にJST(Asia/Tokyo)タイムゾーンに変換する
 * @param utcDateString - UTC形式の日付文字列（例: "2024-01-20T15:00:00.000Z"）
 * @returns JST変換済みのDateオブジェクト
 */
export function convertUTCToJST(utcDateString: string): Date | null {
  if (!utcDateString) return null;
  
  try {
    // UTC日付文字列をDateオブジェクトに変換
    const utcDate = new Date(utcDateString);
    
    // 無効な日付チェック
    if (isNaN(utcDate.getTime())) {
      console.warn(`Invalid UTC date string: ${utcDateString}`);
      return null;
    }
    
    // JST(Asia/Tokyo)タイムゾーンに変換
    // UTCから+9時間（JST = UTC+9）
    const jstDate = new Date(utcDate.getTime() + (9 * 60 * 60 * 1000));
    
    return jstDate;
  } catch (error) {
    console.error(`Error converting UTC to JST: ${utcDateString}`, error);
    return null;
  }
}

/**
 * JST変換済みのDateオブジェクトから年、月、日を抽出する
 * @param jstDate - JST変換済みのDateオブジェクト
 * @returns パースされた年、月、日を含むオブジェクト
 */
export function extractJSTDateParts(jstDate: Date): { year: number; month: number; day: number } | null {
  if (!jstDate || isNaN(jstDate.getTime())) return null;
  
  // JST変換済みDateオブジェクトからUTC時刻として年月日を取得
  // （既にJSTに変換済みなので、getUTCXXXメソッドでJSTの年月日が取得される）
  const year = jstDate.getUTCFullYear();
  const month = jstDate.getUTCMonth() + 1; // getUTCMonthは0ベースなので+1
  const day = jstDate.getUTCDate();
  
  return { year, month, day };
}

/**
 * UTC日付文字列をJSTに変換して「YYYY.MM.DD」形式にフォーマット（ニュース用）
 * @param utcDateString - UTC形式の日付文字列
 * @returns JST変換済みフォーマット文字列
 */
export function formatDateForNews(utcDateString: string): string {
  const jstDate = convertUTCToJST(utcDateString);
  if (!jstDate) return utcDateString; // フォールバック
  
  const dateParts = extractJSTDateParts(jstDate);
  if (!dateParts) return utcDateString; // フォールバック
  
  const { year, month, day } = dateParts;
  return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
}

/**
 * UTC日付文字列をJSTに変換して「YYYY年M月D日(曜)」形式にフォーマット（講座用）
 * @param utcDateString - UTC形式の日付文字列
 * @returns JST変換済みフォーマット文字列
 */
export function formatDateForCourse(utcDateString: string): string {
  const jstDate = convertUTCToJST(utcDateString);
  if (!jstDate) return utcDateString; // フォールバック
  
  const dateParts = extractJSTDateParts(jstDate);
  if (!dateParts) return utcDateString; // フォールバック
  
  const { year, month, day } = dateParts;
  
  // 曜日を計算（JST変換済み日付で）
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const weekday = jstDate.getUTCDay(); // JST変換済みDateなのでgetUTCDay()でJSTの曜日が取得される
  const weekdayStr = weekdays[weekday];
  
  return `${year}年${month}月${day}日(${weekdayStr})`;
}

/**
 * UTC日付文字列をJSTに変換して比較用数値に変換（YYYYMMDD形式）
 * @param utcDateString - UTC形式の日付文字列
 * @returns JST変換済み比較用の数値（例: 20240120）
 */
export function dateToNumber(utcDateString: string): number {
  const jstDate = convertUTCToJST(utcDateString);
  if (!jstDate) return 0;
  
  const dateParts = extractJSTDateParts(jstDate);
  if (!dateParts) return 0;
  
  const { year, month, day } = dateParts;
  return year * 10000 + month * 100 + day;
}