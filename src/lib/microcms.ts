import { createClient } from 'microcms-js-sdk';

// microCMS クライアント設定
export const client = createClient({
  serviceDomain: 'mku2025',
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// 基本的な型定義
export interface GlobalSettings {
  currentYear: string | string[];
  scheduleDescription?: string;
  siteOGP: {
    title: string;
    description: string;
    image: {
      url: string;
      width: number;
      height: number;
    };
  };
}

export interface MainCampusSettings {
  activeYear: string | string[];
  executedDate: Array<{
    year: string | string[];
    date: string;
  }>;
  phase: string | string[];
  globalNotice?: string;
  deadlines: Array<{
    deadlineKey: string | string[];
    deadlineDate: string;
  }>;
  buttons: Array<{
    type: string | string[];
    visible: boolean;
    labelAbove?: string;
    buttonText: string;
    url: string;
    labelBelow?: string;
  }>;
  firstWinners?: string;
  finalEnrollment?: string;
}

export interface MainCampusCourse {
  id: string;
  status: string | string[];
  year: string | string[];
  providerInfo?: Array<{
    providerName: string;
    providerUrl?: string;
  }>;
  title: string;
  subtitle?: string;
  courseType?: string | string[];
  targetGrades: string | string[];
  capacity?: number;
  periods?: Array<{
    periodNo: string | string[];
    periodDesc: string;
  }>;
  venue?: {
    openingMeeting?: string | string[];
    lecture?: string | string[];
    closingMeeting?: string | string[];
  };
  preparation?: string;
  thumbImg?: {
    url: string;
    width: number;
    height: number;
  };
  remarks?: string;
  recpAndDism?: {
    reception?: string;
    dismissal?: string;
  };
  noticeCourse?: string;
  afterImages?: Array<{
    url: string;
    width: number;
    height: number;
  }>;
  instructor?: string;
  afterReport?: string;
  afterMovieUrl?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface SpecialCourse {
  id: string;
  status: string | string[];
  year: string | string[];
  providerInfo?: Array<{
    providerName: string;
    providerUrl?: string;
  }>;
  title: string;
  subtitle?: string;
  outline?: string;
  courseType?: string | string[];
  targetGrades: string | string[];
  capacity?: number;
  executedDate: string; // 実施日
  lectureTime?: string; // 実施時間
  applicationDeadline?: string; // 申込締切
  venue?: string; // 会場
  participationFee?: string; // 参加費
  preparation?: string;
  thumbImg?: {
    url: string;
    width: number;
    height: number;
  };
  remarks?: string;
  cityOutsideOk: boolean; // 市外住民の参加可否
  recpAndDism?: {
    reception?: string;
    dismissal?: string;
  };
  noticeCourse?: string;
  instructor?: string;
  buttons?: Array<{
    type: string | string[];
    visible: boolean;
    labelAbove?: string;
    buttonText: string;
    url: string;
    labelBelow?: string;
  }>;
  afterImages?: Array<{
    url: string;
    width: number;
    height: number;
  }>;
  afterReport?: string;
  afterMovieUrl?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface SummerCourse {
  id: string;
  status: string | string[];
  year: string | string[];
  providerInfo?: Array<{
    providerName: string;
    providerUrl?: string;
  }>;
  title: string;
  subtitle?: string;
  outline?: string;
  courseType?: string | string[];
  targetGrades: string | string[];
  capacity?: number;
  schedule?: Array<{
    fieldId: string;
    date: string;
    subStatus?: string | string[];
    startTime?: string;
    endTime?: string;
    entryDeadline?: string;
  }>;
  atAnyTime?: boolean;
  venue?: string;
  participationFee?: string;
  preparation?: string;
  thumbImg?: {
    url: string;
    width: number;
    height: number;
  };
  remarks?: string;
  cityOutsideOk?: boolean;
  recpAndDism?: {
    reception?: string;
    dismissal?: string;
  };
  noticeCourse?: string;
  instructor?: string;
  buttons?: Array<{
    type: string | string[];
    visible: boolean;
    labelAbove?: string;
    buttonText: string;
    url: string;
    labelBelow?: string;
  }>;
  afterImages?: Array<{
    url: string;
    width: number;
    height: number;
  }>;
  afterReport?: string;
  afterMovieUrl?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface MkuDay {
  id: string;
  status: 'published' | 'draft';
  year: string | string[];
  isCurrent?: boolean;
  schoolName: {
    id: string;
    name: string;
  };
  eventDates: Array<{
    date: string;
  }>;
  expActivities?: Array<{
    grade: string | string[];
    experienceDesc: string;
  }>;
  presenActivities?: Array<{
    grade: string | string[];
    presentationDesc: string;
  }>;
  afterImages?: Array<{
    url: string;
    width: number;
    height: number;
  }>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface NewsMedia {
  id: string;
  status: 'published' | 'draft';
  title: string;
  body?: string; // 記事本文（詳細ページ用）
  excerpt?: string; // 要約（一覧表示用）
  publishedDate: string;
  category: {
    id: string;
    nameJa: string; // 日本語名
    slug?: string; // スラッグ
    type: 'news' | 'media'; // お知らせかメディア掲載かの区別
    sort?: number; // 表示順
    description?: string; // 説明文
  };
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  }; // 画像（トップページでは非表示、下層ページで表示）
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

// API 関数
export async function getGlobalSettings(): Promise<GlobalSettings> {
  try {
    const data = await client.get({
      endpoint: 'global-settings',
    });
    return data as GlobalSettings;
  } catch (error) {
    console.error('グローバル設定の取得に失敗しました:', error);
    // 開発時のフォールバック
    return {
      currentYear: 2024,
      siteOGP: {
        title: 'むなかた子ども大学',
        description: '宗像市の子どもたちに学びの機会を提供する教育プログラム',
        image: {
          url: '/og-image.png',
          width: 1200,
          height: 630
        }
      }
    };
  }
}

export async function getMainCampusSettings(): Promise<MainCampusSettings> {
  try {
    const data = await client.get({
      endpoint: 'main-campus-settings',
    });
    return data as MainCampusSettings;
  } catch (error) {
    console.error('メインキャンパス設定の取得に失敗しました:', error);
    // 開発時のフォールバック
    return {
      activeYear: 'R07',
      executedDate: [
        {
          year: 'R07',
          date: '2025-02-22'
        }
      ],
      phase: 'preEntry',
      deadlines: [],
      buttons: [
        {
          type: 'pQqq3kkPPq',
          visible: false,
          buttonText: '申し込みフォーム',
          url: '/form'
        }
      ]
    };
  }
}

export async function getMainCampusCourses(yearValue?: string): Promise<MainCampusCourse[]> {
  try {
    // 複数ページにわたってデータを取得するため、ページネーションで全件取得
    const allCourses: MainCampusCourse[] = [];
    let offset = 0;
    const limit = 100; // microCMSの最大limit
    let hasMore = true;

    while (hasMore) {
      const queries: Record<string, any> = {
        limit,
        offset
      };
      
      if (yearValue) {
        queries.filters = `year[contains]${yearValue}`;
      }
      
      const data = await client.get({
        endpoint: 'main-campus-course',
        queries
      });
      
      // 取得したコースを配列に追加
      allCourses.push(...(data.contents as MainCampusCourse[]));
      
      // 次のページがあるかチェック
      hasMore = data.contents.length === limit && (offset + limit) < data.totalCount;
      offset += limit;
      
      // 無限ループ防止（最大500件まで）
      if (offset >= 500) {
        console.warn('Reached maximum fetch limit of 500 courses to prevent infinite loop');
        break;
      }
    }
    
    return allCourses;
  } catch (error) {
    console.error('メインキャンパス講座の取得に失敗しました:', error);
    
    // APIエラーの詳細をログ出力
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack trace:', error.stack);
    }
    
    // 開発時のフォールバック（microCMSのvalueに基づく）
    return [
      {
        id: 'sample-1',
        status: 'pre',
        year: yearValue || '令和7年度',
        title: 'サンプル講座1',
        targetGrades: ['4年', '5年', '6年'],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
        revisedAt: '2024-01-01T00:00:00.000Z'
      },
      {
        id: 'sample-2',
        status: 'pre',
        year: yearValue || '令和7年度',
        title: 'サンプル講座2',
        targetGrades: ['7年', '8年', '9年'],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z',
        revisedAt: '2024-01-01T00:00:00.000Z'
      }
    ];
  }
}

export async function getSpecialCourses(yearValue?: string): Promise<SpecialCourse[]> {
  try {
    const queries: Record<string, any> = {};
    
    if (yearValue) {
      queries.filters = `year[contains]${yearValue}`;
    }
    
    const data = await client.get({
      endpoint: 'special-course',
      queries: {
        ...queries,
        limit: 100 // 取得件数を100件に増加
      },
    });
    
    return data.contents as SpecialCourse[];
  } catch (error) {
    console.error('特設講座の取得に失敗しました:', error);
    return []; // エラー時は空配列を返す
  }
}

export async function getSummerCourses(yearValue?: string): Promise<SummerCourse[]> {
  try {
    const queries: Record<string, any> = {};
    
    // フィルターは使わず、全件取得してクライアント側でフィルタリング
    // microCMSの配列フィルターが複雑なため
    
    const data = await client.get({
      endpoint: 'summer-course',
      queries: {
        limit: 100 // 取得件数を100件に増加
      },
    });
    
    let contents = data.contents as SummerCourse[];
    
    // クライアント側で年度フィルタリング
    if (yearValue) {
      contents = contents.filter(course => {
        const courseYear = Array.isArray(course.year) ? course.year[0] : course.year;
        return courseYear === yearValue;
      });
    }
    
    return contents;
  } catch (error) {
    console.error('夏の課外授業講座の取得に失敗しました:', error);
    return []; // エラー時は空配列を返す
  }
}

export async function getMkuDays(yearValue?: string): Promise<MkuDay[]> {
  try {
    const queries: Record<string, any> = {};
    
    if (yearValue) {
      queries.filters = `year[contains]${yearValue}`;
    }
    
    const data = await client.get({
      endpoint: 'mku-day',
      queries: {
        ...queries,
        limit: 100,
        depth: 1 // schoolNameのリレーション展開
      },
    });
    
    return data.contents as MkuDay[];
  } catch (error) {
    console.error('むなかた子ども大学の日の取得に失敗しました:', error);
    return []; // エラー時は空配列を返す
  }
}

export async function getNewsMedia(): Promise<NewsMedia[]> {
  try {
    const data = await getNewsMediaList();
    return data.contents;
  } catch (error) {
    console.error('ニュース・メディア掲載の取得に失敗しました:', error);
    throw error;
  }
}

// 特定のアイテムを取得する関数
export async function getMainCampusCourseById(id: string): Promise<MainCampusCourse> {
  try {
    const data = await client.get({
      endpoint: 'main-campus-course',
      contentId: id,
    });
    
    return data as MainCampusCourse;
  } catch (error) {
    console.error('メインキャンパス講座の詳細取得に失敗しました:', error);
    throw error;
  }
}

export async function getSpecialCourseById(id: string): Promise<SpecialCourse> {
  try {
    const data = await client.get({
      endpoint: 'special-course',
      contentId: id,
    });
    
    return data as SpecialCourse;
  } catch (error) {
    console.error('特設講座の詳細取得に失敗しました:', error);
    throw error;
  }
}

export async function getSummerCourseById(id: string): Promise<SummerCourse> {
  try {
    const data = await client.get({
      endpoint: 'summer-course',
      contentId: id,
    });
    
    return data as SummerCourse;
  } catch (error) {
    console.error('夏の課外授業講座の詳細取得に失敗しました:', error);
    throw error;
  }
}

export async function getNewsMediaById(id: string): Promise<NewsMedia> {
  try {
    const data = await client.get({
      endpoint: 'news-media',
      contentId: id,
      queries: {
        depth: 1 // カテゴリーのリレーション展開
      }
    });
    
    return data as NewsMedia;
  } catch (error) {
    console.error('ニュース・メディア掲載の詳細取得に失敗しました:', error);
    throw error;
  }
}

// microCMS レスポンス型定義
export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

export type MicroCMSObjectResponse<T> = T & {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

// ニュースカテゴリー型定義
export interface NewsCategory {
  id: string;
  nameJa: string; // 日本語名（表示用）
  slug?: string; // スラッグ（英数字）
  type: 'news' | 'media' | string[] | string; // お知らせかメディア掲載かの区別（microCMSから配列で返される可能性あり）
  sort?: number; // 表示順
  description?: string; // 説明文
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

// ニュース・メディア掲載を取得（汎用）
export async function getNewsMediaList(queries: any = {}): Promise<MicroCMSListResponse<NewsMedia>> {
  try {
    const data = await client.get({
      endpoint: 'news-media',
      queries: {
        limit: 100,
        orders: '-publishedDate',
        depth: 1, // カテゴリーのリレーション展開
        ...queries
      }
    });
    
    return data as MicroCMSListResponse<NewsMedia>;
  } catch (error) {
    console.error('ニュース・メディア掲載の取得に失敗しました:', error);
    // 開発時のフォールバック（各カテゴリー3件以上確保）
    return {
      contents: [
        // News items
        {
          id: 'sample-news-1',
          status: 'published' as const,
          title: 'メインキャンパス開催のお知らせ',
          excerpt: 'メインキャンパスの開催についてのお知らせです。',
          content: 'メインキャンパスの詳細内容です。',
          publishedDate: '2024-01-20',
          category: {
            id: 'main-campus',
            nameJa: 'メインキャンパス',
            type: 'news' as const
          },
          image: {
            url: '/images/sample-news.jpg',
            width: 800,
            height: 400
          },
          createdAt: '2024-01-20T00:00:00.000Z',
          updatedAt: '2024-01-20T00:00:00.000Z',
          publishedAt: '2024-01-20T00:00:00.000Z',
          revisedAt: '2024-01-20T00:00:00.000Z'
        },
        {
          id: 'sample-news-2',
          status: 'published' as const,
          title: '特設講座開催のご案内',
          excerpt: '特設講座の開催についてご案内いたします。',
          content: '特設講座の詳細内容です。',
          publishedDate: '2024-01-18',
          category: {
            id: 'special-course',
            nameJa: '特設講座',
            type: 'news' as const
          },
          image: {
            url: '/images/sample-news2.jpg',
            width: 800,
            height: 400
          },
          createdAt: '2024-01-18T00:00:00.000Z',
          updatedAt: '2024-01-18T00:00:00.000Z',
          publishedAt: '2024-01-18T00:00:00.000Z',
          revisedAt: '2024-01-18T00:00:00.000Z'
        },
        {
          id: 'sample-news-3',
          status: 'published' as const,
          title: '夏の課外授業の募集開始',
          excerpt: '夏の課外授業の参加者募集を開始いたします。',
          content: '夏の課外授業の詳細内容です。',
          publishedDate: '2024-01-16',
          category: {
            id: 'summer-course',
            nameJa: '夏の課外授業',
            type: 'news' as const
          },
          image: {
            url: '/images/sample-news3.jpg',
            width: 800,
            height: 400
          },
          createdAt: '2024-01-16T00:00:00.000Z',
          updatedAt: '2024-01-16T00:00:00.000Z',
          publishedAt: '2024-01-16T00:00:00.000Z',
          revisedAt: '2024-01-16T00:00:00.000Z'
        },
        {
          id: 'sample-news-4',
          status: 'published' as const,
          title: 'むなかた子ども大学の日開催報告',
          excerpt: 'むなかた子ども大学の日が各校で開催されました。',
          content: 'むなかた子ども大学の日の詳細内容です。',
          publishedDate: '2024-01-14',
          category: {
            id: 'mku-day',
            nameJa: 'むなかた子ども大学の日',
            type: 'news' as const
          },
          image: {
            url: '/images/sample-news4.jpg',
            width: 800,
            height: 400
          },
          createdAt: '2024-01-14T00:00:00.000Z',
          updatedAt: '2024-01-14T00:00:00.000Z',
          publishedAt: '2024-01-14T00:00:00.000Z',
          revisedAt: '2024-01-14T00:00:00.000Z'
        },
        // Media items
        {
          id: 'sample-media-1',
          status: 'published' as const,
          title: 'テレビ番組で紹介されました',
          excerpt: 'むなかた子ども大学がテレビで紹介されました。',
          content: 'テレビ番組での紹介内容です。',
          publishedDate: '2024-01-15',
          category: {
            id: 'tv-radio',
            nameJa: 'テレビ・ラジオ',
            type: 'media' as const
          },
          image: {
            url: '/images/sample-media.jpg',
            width: 800,
            height: 400
          },
          createdAt: '2024-01-15T00:00:00.000Z',
          updatedAt: '2024-01-15T00:00:00.000Z',
          publishedAt: '2024-01-15T00:00:00.000Z',
          revisedAt: '2024-01-15T00:00:00.000Z'
        },
        {
          id: 'sample-media-2',
          status: 'published' as const,
          title: '新聞に掲載されました',
          excerpt: '活動が新聞に掲載されました。',
          content: '新聞掲載の詳細内容です。',
          publishedDate: '2024-01-12',
          category: {
            id: 'newspaper-mag',
            nameJa: '新聞・雑誌',
            type: 'media' as const
          },
          image: {
            url: '/images/sample-media2.jpg',
            width: 800,
            height: 400
          },
          createdAt: '2024-01-12T00:00:00.000Z',
          updatedAt: '2024-01-12T00:00:00.000Z',
          publishedAt: '2024-01-12T00:00:00.000Z',
          revisedAt: '2024-01-12T00:00:00.000Z'
        },
        {
          id: 'sample-media-3',
          status: 'published' as const,
          title: '教育賞を受賞いたしました',
          excerpt: 'むなかた子ども大学が教育賞を受賞いたしました。',
          content: '教育賞受賞の詳細内容です。',
          publishedDate: '2024-01-10',
          category: {
            id: 'awards',
            nameJa: '受賞・表彰',
            type: 'media' as const
          },
          image: {
            url: '/images/sample-media3.jpg',
            width: 800,
            height: 400
          },
          createdAt: '2024-01-10T00:00:00.000Z',
          updatedAt: '2024-01-10T00:00:00.000Z',
          publishedAt: '2024-01-10T00:00:00.000Z',
          revisedAt: '2024-01-10T00:00:00.000Z'
        }
      ],
      totalCount: 7,
      offset: 0,
      limit: 100
    };
  }
}

// ニュースカテゴリーを取得
export async function getNewsCategories(): Promise<MicroCMSListResponse<NewsCategory>> {
  try {
    const data = await client.get({
      endpoint: 'news-category',
      queries: {
        limit: 100,
        orders: 'sort'
      }
    });
    
    return data as MicroCMSListResponse<NewsCategory>;
  } catch (error) {
    console.error('ニュースカテゴリーの取得に失敗しました:', error);
    // 開発時のフォールバック
    return {
      contents: [
        { id: 'main-campus', nameJa: 'メインキャンパス', type: 'news' as const, sort: 1, createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z', publishedAt: '2024-01-01T00:00:00.000Z', revisedAt: '2024-01-01T00:00:00.000Z' },
        { id: 'special-course', nameJa: '特設講座', type: 'news' as const, sort: 2, createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z', publishedAt: '2024-01-01T00:00:00.000Z', revisedAt: '2024-01-01T00:00:00.000Z' },
        { id: 'mku-day', nameJa: 'むなかた子ども大学の日', type: 'news' as const, sort: 3, createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z', publishedAt: '2024-01-01T00:00:00.000Z', revisedAt: '2024-01-01T00:00:00.000Z' },
        { id: 'summer-course', nameJa: '夏の課外授業', type: 'news' as const, sort: 4, createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z', publishedAt: '2024-01-01T00:00:00.000Z', revisedAt: '2024-01-01T00:00:00.000Z' },
        { id: 'others-news', nameJa: 'その他のお知らせ', type: 'news' as const, sort: 5, createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z', publishedAt: '2024-01-01T00:00:00.000Z', revisedAt: '2024-01-01T00:00:00.000Z' },
        { id: 'tv-radio', nameJa: 'テレビ・ラジオ', type: 'media' as const, sort: 1, createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z', publishedAt: '2024-01-01T00:00:00.000Z', revisedAt: '2024-01-01T00:00:00.000Z' },
        { id: 'newspaper-mag', nameJa: '新聞・雑誌', type: 'media' as const, sort: 2, createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z', publishedAt: '2024-01-01T00:00:00.000Z', revisedAt: '2024-01-01T00:00:00.000Z' },
        { id: 'awards', nameJa: '受賞・表彰', type: 'media' as const, sort: 3, createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-01T00:00:00.000Z', publishedAt: '2024-01-01T00:00:00.000Z', revisedAt: '2024-01-01T00:00:00.000Z' }
      ],
      totalCount: 8,
      offset: 0,
      limit: 100
    };
  }
}

// ニュースをカテゴリー別に取得
export async function getNewsByCategory(categoryIds?: string[], limit = 10): Promise<MicroCMSListResponse<NewsMedia>> {
  const queries: any = {
    limit,
    orders: '-publishedAt'
  };

  if (categoryIds && categoryIds.length > 0) {
    queries.filters = categoryIds.map(id => `category[equals]${id}`).join('[or]');
  }

  return getNewsMediaList(queries);
}

// お知らせ用のカテゴリーでフィルタリング（type="news"のカテゴリーのみ）
export async function getNewsItems(limit = 10, offset = 0): Promise<MicroCMSListResponse<NewsMedia>> {
  try {
    // microCMSから全てのデータを取得（複数回APIコールで100件ずつ）
    let allContents: NewsMedia[] = [];
    let currentOffset = 0;
    const batchSize = 100;
    let hasMore = true;
    
    while (hasMore) {
      const queries = {
        limit: batchSize,
        offset: currentOffset,
        orders: '-publishedDate',
        depth: 1,
        filters: 'category[exists]'
      };
      
      const batchData = await getNewsMediaList(queries);
      allContents = [...allContents, ...batchData.contents];
      
      // 次のバッチがあるかチェック
      hasMore = batchData.contents.length === batchSize;
      currentOffset += batchSize;
      
      // 無限ループ防止（最大500件まで）
      if (currentOffset >= 500) break;
    }
    
    // type="お知らせ"のカテゴリーを持つ記事のみフィルタリング
    const filteredContents = allContents.filter(item => {
      if (!item.category) return false;
      const type = Array.isArray(item.category.type) ? item.category.type[0] : item.category.type;
      return type === 'お知らせ';
    });
    
    // offsetとlimitを適用
    const paginatedContents = filteredContents.slice(offset, offset + limit);
    
    return {
      contents: paginatedContents,
      totalCount: filteredContents.length,
      offset: offset,
      limit: limit
    };
  } catch (error) {
    console.error('お知らせの取得に失敗しました:', error);
    // フォールバック
    return { contents: [], totalCount: 0, offset: 0, limit };
  }
}

// メディア掲載用のカテゴリーでフィルタリング（type="media"のカテゴリーのみ）
export async function getMediaItems(limit = 10): Promise<MicroCMSListResponse<NewsMedia>> {
  try {
    const queries = {
      limit: 50, // より多くのデータを取得してからフィルタリング
      orders: '-publishedDate',
      depth: 1,
      filters: 'category[exists]'
    };
    
    const allData = await getNewsMediaList(queries);
    
    // type="メディア掲載"のカテゴリーを持つ記事のみフィルタリング
    const filteredContents = allData.contents.filter(item => {
      if (!item.category) return false;
      const type = Array.isArray(item.category.type) ? item.category.type[0] : item.category.type;
      return type === 'メディア掲載';
    });
    
    return {
      ...allData,
      contents: filteredContents.slice(0, limit),
      totalCount: filteredContents.length
    };
  } catch (error) {
    console.error('メディア掲載の取得に失敗しました:', error);
    // フォールバック
    return getNewsMediaList({ limit });
  }
}

// カテゴリー別に記事を取得する関数
export async function getNewsItemsByCategory(categoryId: string, limit = 3): Promise<MicroCMSListResponse<NewsMedia>> {
  try {
    const queries = {
      limit,
      orders: '-publishedDate',
      depth: 1,
      filters: `category[equals]${categoryId}`
    };
    
    const allData = await getNewsMediaList(queries);
    
    // type="お知らせ"のカテゴリーを持つ記事のみフィルタリング
    const filteredContents = allData.contents.filter(item => {
      if (!item.category) return false;
      const type = Array.isArray(item.category.type) ? item.category.type[0] : item.category.type;
      return type === 'お知らせ';
    });
    
    return {
      ...allData,
      contents: filteredContents.slice(0, limit),
      totalCount: filteredContents.length
    };
  } catch (error) {
    console.error(`カテゴリー ${categoryId} のお知らせ取得に失敗しました:`, error);
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit
    };
  }
}

export async function getMediaItemsByCategory(categoryId: string, limit = 3): Promise<MicroCMSListResponse<NewsMedia>> {
  try {
    const queries = {
      limit,
      orders: '-publishedDate',
      depth: 1,
      filters: `category[equals]${categoryId}`
    };
    
    const allData = await getNewsMediaList(queries);
    
    // type="メディア掲載"のカテゴリーを持つ記事のみフィルタリング
    const filteredContents = allData.contents.filter(item => {
      if (!item.category) return false;
      const type = Array.isArray(item.category.type) ? item.category.type[0] : item.category.type;
      return type === 'メディア掲載';
    });
    
    return {
      ...allData,
      contents: filteredContents.slice(0, limit),
      totalCount: filteredContents.length
    };
  } catch (error) {
    console.error(`カテゴリー ${categoryId} のメディア掲載取得に失敗しました:`, error);
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit
    };
  }
}

// カテゴリー情報を取得
export async function getCategoriesWithLabels() {
  try {
    const categories = await getNewsCategories();
    
    return {
      newsCategories: categories.contents
        .filter(cat => {
          const type = Array.isArray(cat.type) ? cat.type[0] : cat.type;
          return type === 'お知らせ'; // microCMSは日本語で値を返している
        })
        .map(cat => ({
          id: cat.id,
          name: cat.slug || cat.id,
          nameJa: cat.nameJa,
          label: cat.nameJa,
          type: 'news' as 'news' | 'media', // UIでは英語で統一
          color: undefined
        })),
      mediaCategories: categories.contents
        .filter(cat => {
          const type = Array.isArray(cat.type) ? cat.type[0] : cat.type;
          return type === 'メディア掲載'; // microCMSは日本語で値を返している
        })
        .map(cat => ({
          id: cat.id,
          name: cat.slug || cat.id,
          nameJa: cat.nameJa,
          label: cat.nameJa,
          type: 'media' as 'news' | 'media', // UIでは英語で統一
          color: undefined
        }))
    };
  } catch (error) {
    console.error('カテゴリー情報の取得に失敗しました:', error);
    // フォールバック: 直接カテゴリー情報を返す
    return {
      newsCategories: [
        { id: 'main-campus', name: 'main-campus', nameJa: 'メインキャンパス', label: 'メインキャンパス', type: 'news' as const, color: undefined },
        { id: 'special-course', name: 'special-course', nameJa: '特設講座', label: '特設講座', type: 'news' as const, color: undefined },
        { id: 'mku-day', name: 'mku-day', nameJa: 'むなかた子ども大学の日', label: 'むなかた子ども大学の日', type: 'news' as const, color: undefined },
        { id: 'summer-course', name: 'summer-course', nameJa: '夏の課外授業', label: '夏の課外授業', type: 'news' as const, color: undefined },
        { id: 'others-news', name: 'others-news', nameJa: 'その他のお知らせ', label: 'その他のお知らせ', type: 'news' as const, color: undefined }
      ],
      mediaCategories: [
        { id: 'tv-radio', name: 'tv-radio', nameJa: 'テレビ・ラジオ', label: 'テレビ・ラジオ', type: 'media' as const, color: undefined },
        { id: 'newspaper-mag', name: 'newspaper-mag', nameJa: '新聞・雑誌', label: '新聞・雑誌', type: 'media' as const, color: undefined },
        { id: 'awards', name: 'awards', nameJa: '受賞・表彰', label: '受賞・表彰', type: 'media' as const, color: undefined }
      ]
    };
  }
}

// 夏課外カテゴリー型定義
export interface SummerCategory {
  id: string;
  category: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

// 夏課外カテゴリー取得関数
export async function getSummerCategories(): Promise<SummerCategory[]> {
  try {
    const data = await client.get({
      endpoint: 'summer-category',
      queries: {
        limit: 100
      },
    });
    
    return data.contents as SummerCategory[];
  } catch (error) {
    console.error('夏課外カテゴリーの取得に失敗しました:', error);
    
    // 開発時のフォールバック
    return [
      {
        id: '8xt7plkerd',
        category: 'ものづくり',
        slug: 'craft',
        createdAt: '2025-06-17T23:51:08.276Z',
        updatedAt: '2025-06-17T23:53:06.77Z',
        publishedAt: '2025-06-17T23:51:08.276Z',
        revisedAt: '2025-06-17T23:51:08.276Z'
      },
      {
        id: 'okrwxl_u07p',
        category: '自然体験',
        slug: 'nature',
        createdAt: '2025-06-17T23:51:22.996Z',
        updatedAt: '2025-06-17T23:53:13.346Z',
        publishedAt: '2025-06-17T23:51:22.996Z',
        revisedAt: '2025-06-17T23:51:22.996Z'
      },
      {
        id: 'kduvt_1sxpvz',
        category: 'スポーツ・遊び',
        slug: 'sports-play',
        createdAt: '2025-06-17T23:51:48.395Z',
        updatedAt: '2025-06-17T23:52:01.699Z',
        publishedAt: '2025-06-17T23:51:48.395Z',
        revisedAt: '2025-06-17T23:52:01.699Z'
      }
    ];
  }
}