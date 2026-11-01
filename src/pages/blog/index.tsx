import { getAllPosts, type Post } from "@/lib/posts";
import { BlogList } from "@/templates/blog";
import type { GetStaticProps } from "next";

type BlogPageProps = {
	posts: Post[];
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
	const posts = await getAllPosts();

	return {
		props: { posts },
	};
};

export default function BlogPage({ posts }: BlogPageProps) {
	return <BlogList posts={posts} />;
}
