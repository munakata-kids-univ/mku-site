/**
 * 年度とパス間の変換ユーティリティ
 */

/**
 * 年度文字列（例: "令和7年度"）をパス用文字列（例: "r07"）に変換
 * @param year - 年度文字列（例: "令和7年度", "令和6年度"）
 * @returns パス用文字列（例: "r07", "r06"）
 */
export function convertYearToPath(year: string): string {
  if (!year) return '';
  
  // 令和年度の数字を抽出
  const reiwaMatch = year.match(/令和(\d+)年度/);
  if (reiwaMatch) {
    const reiwaYear = parseInt(reiwaMatch[1]);
    return `r${reiwaYear.toString().padStart(2, '0')}`;
  }
  
  // マッチしない場合はそのまま返す（フォールバック）
  return year.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * パス用文字列（例: "r07"）を年度文字列（例: "令和7年度"）に変換
 * @param pathYear - パス用文字列（例: "r07", "r06"）
 * @returns 年度文字列（例: "令和7年度", "令和6年度"）
 */
export function convertPathToYear(pathYear: string): string {
  if (!pathYear) return '';
  
  // 令和年度パスの処理
  const reiwaMatch = pathYear.match(/^r(\d{2})$/);
  if (reiwaMatch) {
    const reiwaYear = parseInt(reiwaMatch[1]);
    return `令和${reiwaYear}年度`;
  }
  
  // マッチしない場合はそのまま返す（フォールバック）
  return pathYear;
}

/**
 * 年度文字列の配列からパス用文字列の配列に変換
 * @param years - 年度文字列の配列
 * @returns パス用文字列の配列
 */
export function convertYearsToPathArray(years: string[]): string[] {
  return years.map(year => convertYearToPath(year));
}

/**
 * パス用文字列の配列から年度文字列の配列に変換
 * @param pathYears - パス用文字列の配列
 * @returns 年度文字列の配列
 */
export function convertPathsToYearArray(pathYears: string[]): string[] {
  return pathYears.map(pathYear => convertPathToYear(pathYear));
}