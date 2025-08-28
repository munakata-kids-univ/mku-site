/**
 * 日付関連のユーティリティ関数
 * タイムゾーンに依存しない安全な日付処理を提供
 */

/**
 * ISO日付文字列またはタイムスタンプをタイムゾーンに関係なく安全にパースする
 * @param dateString - ISO形式の日付文字列（例: "2024-01-20" または "2024-01-20T15:00:00.000Z"）
 * @returns パースされた年、月、日を含むオブジェクト
 */
export function parseISODateString(dateString: string): { year: number; month: number; day: number } | null {
  if (!dateString) return null;
  
  // タイムスタンプ形式の場合、日付部分のみを抽出
  let cleanDateString = dateString;
  if (dateString.includes('T')) {
    cleanDateString = dateString.split('T')[0];
  }
  
  // ISO日付形式（YYYY-MM-DD）の検証
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoDatePattern.test(cleanDateString)) {
    console.warn(`Invalid ISO date string: ${dateString}`);
    return null;
  }
  
  const [yearStr, monthStr, dayStr] = cleanDateString.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  
  // 基本的な日付バリデーション
  if (year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) {
    console.warn(`Invalid date values: ${dateString}`);
    return null;
  }
  
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
  
  // 曜日を計算（Zellerの公式を使用してタイムゾーンに依存しない）
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const weekday = calculateWeekday(year, month, day);
  const weekdayStr = weekdays[weekday];
  
  return `${year}年${month}月${day}日(${weekdayStr})`;
}

/**
 * Zellerの公式を使用して曜日を計算（タイムゾーンに依存しない）
 * @param year - 年
 * @param month - 月
 * @param day - 日
 * @returns 曜日（0=日曜日, 1=月曜日, ..., 6=土曜日）
 */
function calculateWeekday(year: number, month: number, day: number): number {
  // Zellerの公式では1月と2月を前年の13月、14月として扱う
  if (month < 3) {
    month += 12;
    year -= 1;
  }
  
  const k = year % 100; // 年の下2桁
  const j = Math.floor(year / 100); // 年の上2桁
  
  // Zellerの公式
  const h = (day + Math.floor((13 * (month + 1)) / 5) + k + Math.floor(k / 4) + Math.floor(j / 4) - 2 * j) % 7;
  
  // Zellerの公式の結果を日曜日=0の形式に変換
  return (h + 5) % 7;
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