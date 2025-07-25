// デザイントークンの型定義
import tokens from '../tokens.json';

// トークンのキー型を自動生成
export type TokenKeys = keyof typeof tokens['mode-1'];

// カラートークンの型
export type ColorToken = 
  | 'color-background-select'
  | 'color-background-hover'
  | 'color-background-accent'
  | 'color-background-quaternary'
  | 'color-background-tertiary'
  | 'color-background-secondary'
  | 'color-background-primary'
  | 'color-text-disabled'
  | 'color-text-link-hover'
  | 'color-text-secondary'
  | 'color-text-link'
  | 'color-text-primary'
  | 'color-text-tertiary'
  | 'color-text-white'
  | 'color-text-success'
  | 'color-text-error'
  | 'color-text-select'
  | 'color-border-hover'
  | 'color-border-tetiery'
  | 'color-border-secondary'
  | 'color-border-primary'
  | 'color-feedback-success'
  | 'color-feedback-error'
  | 'color-brand-secondary'
  | 'color-brand-primary'
  | 'color-brand-pink'
  | 'color-brand-turquoise'
  | 'color-brand-purple'
  | 'color-brand-black'
  | 'color-brand-sub-yellow-low'
  | 'color-brand-sub-yellow'
  | 'color-brand-sub-turquoise-low'
  | 'color-brand-sub-turquoise'
  | 'color-brand-sub-purple-low'
  | 'color-brand-sub-purple'
  | 'color-brand-sub-pink-low'
  | 'color-brand-sub-pink'
  | 'color-background-dark-gray'
  | 'color-text-dark-gray'
  | 'color-brand-sub-yellow-very-low'
  | 'color-brand-sub-purple-very-low';

// タイポグラフィトークンの型
export type TypographyToken = 
  | 'typography-font-family-ja'
  | 'typography-font-family-en'
  | 'typography-font-weight-semibold-en'
  | 'typography-font-weight-semibold-ja'
  | 'typography-font-weight-regular-en'
  | 'typography-font-weight-regular-ja';

// フォントサイズトークンの型（PC）
export type FontSizePCToken = 
  | 'typography-font-size-ja-p-c-4-s'
  | 'typography-font-size-ja-p-c-s'
  | 'typography-font-size-ja-p-c-m'
  | 'typography-font-size-ja-p-c-4-l'
  | 'typography-font-size-ja-p-c-2-l'
  | 'typography-font-size-ja-p-c-l'
  | 'typography-font-size-ja-p-c-3-s'
  | 'typography-font-size-ja-p-c-3-l'
  | 'typography-font-size-ja-p-c-5-l'
  | 'typography-font-size-ja-p-c-2-s'
  | 'typography-font-size-en-p-c-5-l'
  | 'typography-font-size-en-p-c-4-l'
  | 'typography-font-size-en-p-c-3-l'
  | 'typography-font-size-en-p-c-2-l'
  | 'typography-font-size-en-p-c-l'
  | 'typography-font-size-en-p-c-m'
  | 'typography-font-size-en-p-c-s'
  | 'typography-font-size-en-p-c-2-s'
  | 'typography-font-size-en-p-c-4-s'
  | 'typography-font-size-en-p-c-3-s';

// フォントサイズトークンの型（SP）
export type FontSizeSPToken = 
  | 'typography-font-size-ja-s-p-5-l'
  | 'typography-font-size-ja-s-p-4-l'
  | 'typography-font-size-ja-s-p-3-l'
  | 'typography-font-size-ja-s-p-2-l'
  | 'typography-font-size-ja-s-p-l'
  | 'typography-font-size-ja-s-p-m'
  | 'typography-font-size-ja-s-p-s'
  | 'typography-font-size-ja-s-p-2-s'
  | 'typography-font-size-ja-s-p-4-s'
  | 'typography-font-size-ja-s-p-3s'
  | 'typography-font-size-en-s-p-5-l'
  | 'typography-font-size-en-s-p-4-l'
  | 'typography-font-size-en-s-p-3-l'
  | 'typography-font-size-en-s-p-2-l'
  | 'typography-font-size-en-s-p-l'
  | 'typography-font-size-en-s-p-m'
  | 'typography-font-size-en-s-p-s'
  | 'typography-font-size-en-s-p-2-s'
  | 'typography-font-size-en-s-p-4-s'
  | 'typography-font-size-en-s-p-3-s';

// ラディウストークンの型
export type RadiusToken = 
  | 'radius-full'
  | 'radius-3-l'
  | 'radius-2-l'
  | 'radius-m'
  | 'radius-s'
  | 'radius-x-s'
  | 'radius-l'
  | 'radius-4-l'
  | 'radius-5-l';

// すべてのトークンの型
export type AllTokens = ColorToken | TypographyToken | FontSizePCToken | FontSizeSPToken | RadiusToken;

// トークン値の型
export type TokenValue = string | number;

// トークンオブジェクトの型
export interface DesignTokens {
  'mode-1': Record<TokenKeys, TokenValue>;
}

// トークン取得用のヘルパー関数の型
export function getToken<T extends TokenKeys>(key: T): typeof tokens['mode-1'][T] {
  return tokens['mode-1'][key];
}

// CSS変数名を生成する関数
export function getCSSVar(tokenKey: TokenKeys): string {
  return `var(--${tokenKey.replace(/_/g, '-')})`;
}

// カラートークンの値を取得する関数
export function getColor(colorKey: ColorToken): string {
  return getToken(colorKey) as string;
}

// フォントサイズトークンの値を取得する関数
export function getFontSize(fontSizeKey: FontSizePCToken | FontSizeSPToken): number {
  return getToken(fontSizeKey) as number;
}

// ラディウストークンの値を取得する関数
export function getRadius(radiusKey: RadiusToken): number {
  return getToken(radiusKey) as number;
}