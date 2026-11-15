import fs from 'node:fs';
import path from 'node:path';
import type { Font } from 'satori';

const FONT_DIR = path.resolve('node_modules/@fontsource/noto-sans-jp');
const WEIGHT = 700;

interface FontSlice {
    file: string; // 分割されたフォントファイルの名前
    ranges: [number, number][]; // このファイルが収録している文字コードの範囲
}

let slices: FontSlice[] | undefined;

// 700.css の @font-face からファイル名と unicode-range の対応を読み取る
function loadSlices(): FontSlice[] {
	if (slices) return slices;
	const css = fs.readFileSync(path.join(FONT_DIR, `${WEIGHT}.css`), 'utf8');
	slices = [...css.matchAll(/@font-face\s*{[^}]*}/g)].flatMap(([block]): FontSlice[] => {
		const file = block.match(/files\/([\w-]+\.woff2)\)/)?.[1];
		const range = block.match(/unicode-range:\s*([^;]+);/)?.[1];
		if (!file || !range) return [];
		const ranges = range.split(',').map((part): [number, number] => {
			const [from = '', to = from] = part.trim().replace(/^U\+/i, '').split('-');
			return [parseInt(from, 16), parseInt(to, 16)];
		});
		return [{ file, ranges }];
	});
	return slices;
}

const covers = (slice: FontSlice, code: number) => slice.ranges.some(([from, to]) => code >= from && code <= to);

// フォントに収録されていない文字（絵文字など）を取り除く
export function stripUnsupportedGlyphs(text: string): string {
	const all = loadSlices();
	return [...text].filter((char) => all.some((slice) => covers(slice, char.codePointAt(0)!))).join('');
}

// 描画する文字を含むスライスだけをフォントとして返す
export function fontsFor(text: string): Font[] {
	const codes = [...new Set([...text].map((char) => char.codePointAt(0)!))];
	return loadSlices()
		.filter((slice) => codes.some((code) => covers(slice, code)))
		.map((slice) => ({
			// 同じ名前のフォントを複数渡すと 1 つしか使用されないため、ファイル名を名前にする。
			name: slice.file,
			data: fs.readFileSync(path.join(FONT_DIR, 'files', slice.file)),
			weight: WEIGHT,
			style: 'normal',
		}));
}
