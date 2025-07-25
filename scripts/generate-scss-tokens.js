#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// tokens.jsonを読み込み
const tokensPath = path.join(__dirname, '../src/tokens.json');
const outputPath = path.join(__dirname, '../src/styles/tokens/_variables.scss');

try {
  const tokensData = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));
  const tokens = tokensData['mode-1'];
  
  if (!tokens) {
    throw new Error('mode-1 data not found in tokens.json');
  }
  
  let scssContent = `// 自動生成されたトークンファイル
// tokens.jsonから生成されています。直接編集しないでください。
// 更新するには: npm run generate:tokens

// カラートークン
`;

  // カラー変数を生成
  Object.entries(tokens).forEach(([key, value]) => {
    if (key.startsWith('color-')) {
      const scssVarName = `$${key.replace(/color-/, '').replace(/-/g, '-')}`;
      scssContent += `${scssVarName}: ${value};\n`;
    }
  });

  scssContent += `\n// タイポグラフィ - フォントファミリー\n`;
  
  // フォントファミリー
  Object.entries(tokens).forEach(([key, value]) => {
    if (key.includes('font-family')) {
      const scssVarName = `$font-family-${key.includes('ja') ? 'ja' : 'en'}`;
      scssContent += `${scssVarName}: "${value}";\n`;
    }
  });

  scssContent += `\n// タイポグラフィ - フォントウェイト\n`;
  
  // フォントウェイト
  Object.entries(tokens).forEach(([key, value]) => {
    if (key.includes('font-weight')) {
      const lang = key.includes('ja') ? 'ja' : 'en';
      const weight = key.includes('semibold') ? 'semibold' : 'regular';
      const scssVarName = `$font-weight-${lang}-${weight}`;
      scssContent += `${scssVarName}: ${value};\n`;
    }
  });

  scssContent += `\n// タイポグラフィ - フォントサイズ（PC）\n`;
  
  // フォントサイズ（PC）
  Object.entries(tokens).forEach(([key, value]) => {
    if (key.includes('font-size') && key.includes('p-c')) {
      const lang = key.includes('ja') ? 'ja' : 'en';
      const sizeKey = key.replace(`typography-font-size-${lang}-p-c-`, '');
      const scssVarName = `$font-size-pc-${lang}-${sizeKey}`;
      scssContent += `${scssVarName}: ${value}px;\n`;
    }
  });

  scssContent += `\n// タイポグラフィ - フォントサイズ（SP）\n`;
  
  // フォントサイズ（SP）
  Object.entries(tokens).forEach(([key, value]) => {
    if (key.includes('font-size') && key.includes('s-p')) {
      const lang = key.includes('ja') ? 'ja' : 'en';
      const sizeKey = key.replace(`typography-font-size-${lang}-s-p-`, '');
      const scssVarName = `$font-size-sp-${lang}-${sizeKey}`;
      scssContent += `${scssVarName}: ${value}px;\n`;
    }
  });

  scssContent += `\n// ボーダーラディウス\n`;
  
  // ラディウス
  Object.entries(tokens).forEach(([key, value]) => {
    if (key.startsWith('radius-')) {
      const scssVarName = `$${key}`;
      scssContent += `${scssVarName}: ${value}px;\n`;
    }
  });

  // ディレクトリが存在しない場合は作成
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  
  // SCSSファイルを書き出し
  fs.writeFileSync(outputPath, scssContent, 'utf-8');
  
  console.log('✅ SCSSトークンファイルを生成しました:', outputPath);
  
} catch (error) {
  console.error('❌ SCSSトークンファイルの生成に失敗しました:', error);
  process.exit(1);
}