import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const SITE_NAME = 'OGP Handson Blog';

// 英数字だけを収録したファイル
const FONT_PATH = path.resolve('node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-latin-700-normal.woff2');

export interface OgCardInput {
    title: string;
    description: string;
}

export async function renderOgCard({ title, description }: OgCardInput): Promise<Buffer> {
    // JSX を SVG に文字列を変換する
    const svg = await satori(
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                width: OG_WIDTH,
                height: OG_HEIGHT,
                padding: 72,
                backgroundColor: '#0f172a',
                color: '#f8fafc',
                borderLeft: '24px solid #38bdf8',
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                <div style={{ fontSize: 64, lineHeight: 1.3, lineClamp: 3 }}>{title}</div>
                <div style={{ fontSize: 30, lineHeight: 1.6, lineClamp: 2, color: '#cbd5e1' }}>{description}</div>
            </div>
            <div style={{ fontSize: 32, color: '#38bdf8' }}>{SITE_NAME}</div>
        </div>,
        {
            width: OG_WIDTH,
            height: OG_HEIGHT,
            fonts: [{ name: 'Noto Sans JP', data: fs.readFileSync(FONT_PATH), weight: 700, style: 'normal' }],
        },
    );

    // SVG を PNG に変換する
    return sharp(Buffer.from(svg)).png().toBuffer();
}
