import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// 画像を取得し、satori に渡せる JPEG の data URI に変換する（失敗したら undefined）
export async function loadImage(
	source: string,
	{ width, height }: { width: number; height: number },
): Promise<string | undefined> {
	try {
		let buffer: Buffer;
		if (/^https?:\/\//.test(source)) {
			const res = await fetch(source, { signal: AbortSignal.timeout(15_000) });
			if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
			buffer = Buffer.from(await res.arrayBuffer());
		} else {
			buffer = fs.readFileSync(path.join('public', source));
		}
		// 指定した大きさに合わせて中央を切り抜き、JPEG に変換する。
		const jpeg = await sharp(buffer).resize({ width, height, fit: 'cover' }).jpeg({ quality: 88 }).toBuffer();
		return `data:image/jpeg;base64,${jpeg.toString('base64')}`;
	} catch (error) {
		console.warn(`[og] 画像を取得できませんでした (${source}):`, error);
		return undefined;
	}
}