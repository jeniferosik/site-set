import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAllPosts, getPostContent } from "@/lib/posts";
import { PostPage } from "@/templates/blog";

const siteUrl = "https://site-set-lilac.vercel.app";

type BlogPostPageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export const revalidate = 60;

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params;

	const posts = await getAllPosts();
	const post = posts.find((item) => item.slug === slug);

	if (!post) {
		return {};
	}

	const postUrl = `${siteUrl}/blog/${encodeURIComponent(slug)}`;
	const postImageUrl = new URL(post.image, siteUrl).toString();

	return {
		title: post.title,
		description: post.description,
		authors: [{ name: post.author.name }],
		robots: "index, follow",
		openGraph: {
			title: post.title,
			description: post.description,
			url: postUrl,
			siteName: "Site.Set",
			locale: "pt_BR",
			type: "article",
			images: [
				{
					url: postImageUrl,
					alt: post.title,
				},
			],
		},
	};
}

export async function generateStaticParams() {
	const posts = await getAllPosts();

	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;

	const posts = await getAllPosts();
	const post = posts.find((item) => item.slug === slug);

	if (!post) {
		notFound();
	}

	const content = await getPostContent(slug);

	return <PostPage post={post} content={content} />;
}
