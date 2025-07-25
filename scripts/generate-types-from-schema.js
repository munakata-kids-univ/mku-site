#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// スキーマディレクトリ
const schemaDir = path.join(__dirname, '../src/types/microcms');
const outputPath = path.join(__dirname, '../src/types/microcms-generated.ts');

// microCMSの基本型
const baseTypes = `// 自動生成された型定義ファイル
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

`;

function convertKindToTypeScript(field) {
  switch (field.kind) {
    case 'text':
      return 'string';
    case 'textArea':
      return 'string';
    case 'richEditorV2':
      return 'RichEditorContent';
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'media':
      return 'MediaField';
    case 'mediaList':
      return 'MediaField[]';
    case 'select':
      if (field.multipleSelect) {
        return 'string[]';
      }
      return 'string';
    case 'date':
      return 'string';
    case 'dateTime':
      return 'string';
    case 'repeater':
      return 'any[]'; // カスタムフィールドの詳細解析が必要
    case 'custom':
      return 'any'; // カスタムフィールドの詳細解析が必要
    default:
      return 'any';
  }
}

function generateTypeFromSchema(schemaData, typeName) {
  const fields = schemaData.apiFields || [];
  const customFields = schemaData.customFields || [];
  
  let typeDefinition = `
// ${typeName}
export interface ${typeName} extends MicroCMSBase {`;

  // 基本フィールド
  fields.forEach(field => {
    const tsType = convertKindToTypeScript(field);
    const optional = field.required ? '' : '?';
    typeDefinition += `
  ${field.fieldId}${optional}: ${tsType};`;
  });

  typeDefinition += `
}
`;

  // カスタムフィールドの型定義も生成
  customFields.forEach(customField => {
    const customTypeName = `${typeName}${customField.name.replace(/[^\w]/g, '')}`;
    typeDefinition += `
// ${customField.name}
export interface ${customTypeName} {`;
    
    customField.fields.forEach(field => {
      const tsType = convertKindToTypeScript(field);
      const optional = field.required ? '' : '?';
      typeDefinition += `
  ${field.fieldId}${optional}: ${tsType};`;
    });
    
    typeDefinition += `
}
`;
  });

  return typeDefinition;
}

try {
  let generatedTypes = baseTypes;
  
  // スキーマファイルを読み込み
  const schemaFiles = fs.readdirSync(schemaDir).filter(file => file.endsWith('.json'));
  
  schemaFiles.forEach(file => {
    const filePath = path.join(schemaDir, file);
    const schemaData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // ファイル名から型名を生成
    const baseName = file
      .replace('api-', '')
      .replace(/-\d{14}\.json$/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/\s/g, '');
    
    const typeDefinition = generateTypeFromSchema(schemaData, baseName);
    generatedTypes += typeDefinition;
  });
  
  // エンドポイント定義
  generatedTypes += `
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
`;

  // TypeScriptファイルを書き出し
  fs.writeFileSync(outputPath, generatedTypes, 'utf-8');
  
  console.log('✅ microCMS型定義ファイルを生成しました:', outputPath);
  
} catch (error) {
  console.error('❌ microCMS型定義ファイルの生成に失敗しました:', error);
  process.exit(1);
}