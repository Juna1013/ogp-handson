import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderOgCard } from '../../lib/og/card';

// 記事1件につき1つのパス（/og/<記事ID>.png）を返す
export const getStaticPaths = (async () => {
    const posts = await getCollection('posts');
    return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
    const { title, description } = props.post.data;
    const png = await renderOgCard({ title, description });
    return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
