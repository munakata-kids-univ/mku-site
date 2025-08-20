// 自動生成された型定義ファイル
// microCMSスキーマファイルから生成されています。直接編集しないでください。
// 更新するには: npm run generate:types

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

// Object API のレスポンス
export type MicroCMSObjectResponse<T> = T & {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

// 共通フィールド型
export interface MediaField {
  url: string;
  height?: number;
  width?: number;
}

export interface SelectItem {
  id: string;
  value: string;
}

export interface RichEditorContent {
  html: string;
  text?: string;
}


// GlobalSettings
export interface GlobalSettings extends MicroCMSBase {
  currentYear: string;
  siteTitle?: string;
  ogImage?: MediaField;
}

// MainCampusCourse
export interface MainCampusCourse extends MicroCMSBase {
  status: string;
  year: string;
  providerInfo?: any[];
  title: string;
  subtitle?: string;
  courseType?: string;
  targetGrades: string[];
  capacity?: number;
  periods?: any[];
  venue?: any;
  preparation?: RichEditorContent;
  thumbImg?: MediaField;
  remarks?: RichEditorContent;
  recpAndDism?: any;
  noticeCourse?: RichEditorContent;
  afterImages?: MediaField[];
  instructor?: string;
  afterReport?: RichEditorContent;
  afterMovieUrl?: string;
}

// 限目詳細
export interface MainCampusCourse {
  periodNo: string;
  periodDesc: RichEditorContent;
}

// 会場詳細
export interface MainCampusCourse {
  openingMeeting?: string;
  lecture?: string;
  closingMeeting?: string;
}

// 受付解散詳細
export interface MainCampusCourse {
  reception?: RichEditorContent;
  dismissal?: RichEditorContent;
}

// 協力業者・団体・大学詳細
export interface MainCampusCourse {
  providerName?: string;
  providerUrl?: string;
}

// MainCampusSettings
export interface MainCampusSettings extends MicroCMSBase {
  activeYear: string;
  executedDate: string;
  phase: string;
  globalNotice?: RichEditorContent;
  deadlines?: any[];
  buttons?: any[];
  firstWinners?: RichEditorContent;
  finalEnrollment?: RichEditorContent;
}

// 締切項目
export interface MainCampusSettings {
  deadlineKey?: string;
  deadlineDate?: string;
}

// ボタン項目
export interface MainCampusSettings {
  type: string;
  visible?: boolean;
  labelAbove?: string;
  buttonText: string;
  url: string;
  labelBelow?: string;
}

// MkuDay
export interface MkuDay extends MicroCMSBase {
  year: string;
  isCurrent?: boolean;
  schoolName: any;
  eventDates?: any[];
  expActivities?: any[];
  presenActivities?: any[];
  afterImages?: MediaField[];
}

// 実施日
export interface MkuDay {
  date?: string;
}

// 体験活動項目
export interface MkuDay {
  grade: string;
  experienceDesc: string;
}

// 学習発表項目
export interface MkuDay {
  grade: string;
  presentationDesc: string;
}

// NewsCategory
export interface NewsCategory extends MicroCMSBase {
  nameJa: string;
  slug?: string;
  type: string;
  sort?: number;
  description?: string;
}

// NewsMedia
export interface NewsMedia extends MicroCMSBase {
  title: string;
  category: any;
  publishedDate?: string;
  thumbnail?: MediaField;
  body: RichEditorContent;
}

// SchoolMaster
export interface SchoolMaster extends MicroCMSBase {
  name: string;
  kana: string;
  slug: string;
  schoolType: string;
}

// SpecialCourse
export interface SpecialCourse extends MicroCMSBase {
  status: string;
  year: string;
  providerInfo?: any[];
  title: string;
  subtitle?: string;
  outline?: string;
  courseType?: string;
  targetGrades: string[];
  capacity?: number;
  executedDate: string;
  lectureTime?: string;
  applicationDeadline?: string;
  venue?: string;
  participationFee?: string;
  preparation?: RichEditorContent;
  thumbImg?: MediaField;
  remarks?: RichEditorContent;
  cityOutsideOk: boolean;
  recpAndDism?: any;
  noticeCourse?: RichEditorContent;
  instructor?: string;
  buttons?: any[];
  afterImages?: MediaField[];
  afterReport?: RichEditorContent;
  afterMovieUrl?: string;
}

// 受付解散詳細
export interface SpecialCourse {
  reception?: RichEditorContent;
  dismissal?: RichEditorContent;
}

// ボタン項目
export interface SpecialCourse {
  type: string;
  visible?: boolean;
  labelAbove?: string;
  buttonText: string;
  url: string;
  labelBelow?: string;
}

// 協力企業・団体・大学詳細
export interface SpecialCourse {
  providerName?: string;
  providerUrl?: string;
}

// SummerCategory
export interface SummerCategory extends MicroCMSBase {
  category?: string;
  slug?: string;
}

// SummerCourse
export interface SummerCourse extends MicroCMSBase {
  year: string;
  title: string;
  subtitle?: string;
  thumbImg?: MediaField;
  schedule?: any[];
  atAnyTime?: boolean;
  capacity?: number;
  category?: any;
  courseType?: string;
  providerInfo?: any[];
  providerItem?: { providerName?: string; providerUrl?: string; }[];
  targetGrades: string[];
  cityOutsideOk: boolean;
  parentJoin?: string;
  participationFee?: string;
  venue?: string;
  address?: string;
  applyMethod?: string;
  courseContact?: RichEditorContent;
  preparation?: RichEditorContent;
  remarks?: RichEditorContent;
  note?: RichEditorContent;
  noticeCourse?: RichEditorContent;
  afterImages?: MediaField[];
  instructor?: string;
  afterReport?: RichEditorContent;
  participantCount?: number;
}

// 開催日程項目
export interface SummerCourse {
  date?: string;
  subStatus?: string;
  startTime?: string;
  endTime?: string;
  entryDeadline?: string;
}

// 協力企業・団体・大学詳細
export interface SummerCourse {
  providerName?: string;
  providerUrl?: string;
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
  NEWS_POST: 'news-post'
} as const;

export type EndpointType = typeof MICROCMS_ENDPOINTS[keyof typeof MICROCMS_ENDPOINTS];
