import type { APIRoute } from 'astro';
import { renderOgCard } from '../../lib/og/card';

export const GET: APIRoute = async () => {
    const png = await renderOgCard({
        title: 'OGP Handson Blog',
        description: '動的OGPのハンズオン用サンプルサイトです。',
    });
    return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
