// microCMS API レスポンス型定義

// 基本的なmicroCMSのメタデータ
export interface MicroCMSBase {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

// List API のレスポンス
export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

// Object API のレスポンス（グローバル設定、メインキャンパス設定）
export type MicroCMSObjectResponse<T> = T & {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

// 共通フィールド型
export interface MediaField {
  url: string;
  height: number;
  width: number;
}

export interface SelectItem {
  id: string;
  value: string;
}

// グローバル設定（object形式）
export interface GlobalSettings {
  currentYear: string;
  siteTitle?: string;
  ogImage?: MediaField;
}

// メインキャンパス設定（object形式）
export interface MainCampusSettings {
  // スキーマファイルの内容に基づいて後で追加
}

// メインキャンパス講座（list形式）
export interface MainCampusCourse extends MicroCMSBase {
  title: string;
  // スキーマファイルの内容に基づいて後で追加
}

// 特設講座（list形式）
export interface SpecialCourse extends MicroCMSBase {
  title: string;
  // スキーマファイルの内容に基づいて後で追加
}

// 夏の課外授業講座（list形式）
export interface SummerCourse extends MicroCMSBase {
  title: string;
  // スキーマファイルの内容に基づいて後で追加
}

// むなかた子ども大学の日（list形式）
export interface MkuDay extends MicroCMSBase {
  title: string;
  // スキーマファイルの内容に基づいて後で追加
}

// 学校マスタ（list形式）
export interface SchoolMaster extends MicroCMSBase {
  name: string;
  // スキーマファイルの内容に基づいて後で追加
}

// 夏課外カテゴリ（list形式）
export interface SummerCategory extends MicroCMSBase {
  name: string;
  // スキーマファイルの内容に基づいて後で追加
}

// お知らせカテゴリ（list形式）
export interface NewsCategory extends MicroCMSBase {
  name: string;
  // スキーマファイルの内容に基づいて後で追加
}

// お知らせ・メディア掲載（list形式）
export interface NewsMedia extends MicroCMSBase {
  title: string;
  // スキーマファイルの内容に基づいて後で追加
}

// エンドポイント定義
export const MICROCMS_ENDPOINTS = {
  // Object形式
  GLOBAL_SETTINGS: 'global-settings',
  MAIN_CAMPUS_SETTINGS: 'main-campus-settings',
  
  // List形式
  MAIN_CAMPUS_COURSE: 'main-campus-course',
  SPECIAL_COURSE: 'special-course',
  SUMMER_COURSE: 'summer-course',
  MKU_DAY: 'mku-day',
  SCHOOL_MASTER: 'school-master',
  SUMMER_CATEGORY: 'summer-category',
  NEWS_CATEGORY: 'news-category',
  NEWS_MEDIA: 'news-media'
} as const;

// エンドポイント型の連想
export type EndpointType = typeof MICROCMS_ENDPOINTS[keyof typeof MICROCMS_ENDPOINTS];