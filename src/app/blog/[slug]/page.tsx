import { getAllPosts, getPostContent } from "@/lib/posts";
import { PostPage } from "@/templates/blog";
import { notFound } from "next/navigation";

type BlogPostPageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export const revalidate = 60;

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
