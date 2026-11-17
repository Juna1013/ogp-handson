import fs from 'node:fs';
import sharp from 'sharp';

// グラデーションの背景に円を1つ描く
// 800 × 600 のwebp画像を生成する
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
    <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#f97316" />
            <stop offset="1" stop-color="#db2777" />
        </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#g)" />
    <circle cx="400" cy="300" r="160" fill="#fde68a" />
</svg>`;

fs.mkdirSync('public/covers', { recursive: true });
await sharp(Buffer.from(svg)).webp().toFile('public/covers/sample.webp');
