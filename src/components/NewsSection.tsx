import { useState, useEffect, useRef } from 'react';
import BaseButton from './BaseButton';
import { formatDateForNews } from '../utils/dateUtils';

// ニュース項目の型定義
interface NewsItem {
  id: string;
  title: string;
  excerpt?: string; // 要約（一覧表示用）
  publishedDate: string; // 公開日（publishedAtからpublishedDateに変更）
  category: {
    id: string;
    nameJa: string; // 日本語名
    slug?: string; // スラッグ
    type: 'news' | 'media'; // お知らせかメディア掲載かの区別
    sort?: number; // 表示順
    description?: string; // 説明文
  };
  image?: {
    url: string;
    width: number;
    height: number;
  }; // 画像（トップページでは非表示）
}

// カテゴリータブの型定義
interface CategoryTab {
  id: string;
  name: string;
  nameJa: string;
  label: string;
  type: 'news' | 'media';
  color?: string | undefined;
}

interface NewsSectionProps {
  newsItems: NewsItem[];
  allItems: NewsItem[];
  categoryData: Record<string, NewsItem[]>;
  categories: CategoryTab[];
  type: 'news' | 'media';
  title: string;
  className?: string;
}

export default function NewsSection({ newsItems, allItems, categoryData, categories, type, title, className = '' }: NewsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [displayItems, setDisplayItems] = useState<NewsItem[]>(newsItems.slice(0, 3));
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // カテゴリー変更時にデータを設定
  useEffect(() => {
    if (activeCategory === 'all') {
      setDisplayItems(allItems.slice(0, 3));
    } else {
      const categoryItems = categoryData[activeCategory] || [];
      setDisplayItems(categoryItems.slice(0, 3));
    }
  }, [activeCategory, allItems, categoryData]);

  // スクロールアニメーション用のIntersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // UTC日付をJSTに変換してフォーマット
  const formatDate = (utcDateString: string) => {
    return formatDateForNews(utcDateString);
  };

  return (
    <section className={`news-section ${className}`}>
      <div 
        ref={containerRef}
        className="news-section__container"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        <div className="news-section__header">
          <h2 className="news-section__title">{title}</h2>
          <p className="news-section__subtitle">{type === 'news' ? 'News' : 'Media'}</p>
        </div>

        {/* タブナビゲーション */}
        <div className="news-section__tabs">
          <button
            className={`news-section__tab ${activeCategory === 'all' ? 'news-section__tab--active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            すべて
          </button>
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <button
                key={category.id}
                className={`news-section__tab ${activeCategory === category.id ? 'news-section__tab--active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.nameJa}
              </button>
            ))
          ) : (
            <span style={{color: 'red'}}>カテゴリーがありません</span>
          )}
        </div>

        {/* ニュース一覧 */}
        <div className="news-section__content">
          {displayItems.length > 0 ? (
            <div className="news-section__list">
              {displayItems.map((item) => (
                <article key={item.id} className="news-item">
                  <div className="news-item__meta">
                    <time className="news-item__date">{formatDate(item.publishedDate)}</time>
                    <span className="news-item__category">{item.category.nameJa}</span>
                  </div>
                  <h3 className="news-item__title">
                    <a href={`/${type}/${item.id}`} className="news-item__link">
                      {item.title}
                    </a>
                  </h3>
                  {item.excerpt && (
                    <p className="news-item__excerpt">{item.excerpt}</p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="news-section__empty">
              <p>現在、{activeCategory === 'all' ? '' : categories.find(cat => cat.id === activeCategory)?.nameJa}の{title}はありません。</p>
            </div>
          )}

          {/* 一覧へのリンク */}
          <div className="news-section__actions">
            <BaseButton href={`/${type}`} variant="blue">
              {title}一覧へ
            </BaseButton>
          </div>
        </div>
      </div>
    </section>
  );
}