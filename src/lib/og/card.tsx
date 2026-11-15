import satori from 'satori';
import sharp from 'sharp';
import { fontsFor, stripUnsupportedGlyphs } from './fonts';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const SITE_NAME = 'OGP Handson Blog';

export interface OgCardInput {
    title: string;
    description: string;
}

export async function renderOgCard(input: OgCardInput): Promise<Buffer> {
    const title = stripUnsupportedGlyphs(input.title);
    const description = stripUnsupportedGlyphs(input.description);

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
            // 画像に描画する文字を含むスライスだけを渡す
            fonts: fontsFor(title + description + SITE_NAME),
        },
    );

    // SVG を PNG に変換する
    return sharp(Buffer.from(svg)).png().toBuffer();
}
