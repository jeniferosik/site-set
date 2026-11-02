import type { Metadata } from "next";
import { Suspense } from "react";

import { getAllPosts } from "@/lib/posts";
import { BlogList } from "@/templates/blog";

export const metadata: Metadata = {
	title: "Blog",
	description: "Dicas e estratégias para impulsionar seu negócio",
	robots: "index, follow",
	openGraph: {
		title: "Blog | Site.Set",
		description: "Dicas e estratégias para impulsionar seu negócio",
		url: "https://site-set-lilac.vercel.app/blog",
		siteName: "Site.Set",
		locale: "pt_BR",
		type: "website",
		images: [
			{
				url: "https://site-set-lilac.vercel.app/og-image.jpg",
				width: 800,
				height: 600,
				alt: "Site.Set",
			},
		],
	},
};

export default async function BlogListPage() {
	const posts = await getAllPosts();

	return (
		<Suspense
			fallback={
				<p className="container py-10 text-gray-300">Carregando posts...</p>
			}>
			<BlogList posts={posts} />
		</Suspense>
	);
}
