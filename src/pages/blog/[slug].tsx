import { getAllPosts, getPostContent, type Post } from "@/lib/posts";
import { PostPage } from "@/templates/blog";
import type { GetStaticPaths, GetStaticProps } from "next";

type PostRouteProps = {
	post: Post;
	content: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await getAllPosts();
	const paths = posts.slice(0, 5).map((post) => ({
		params: { slug: post.slug },
	}));

	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps<PostRouteProps> = async ({
	params,
}) => {
	const slug = params?.slug;

	if (typeof slug !== "string") {
		return { notFound: true };
	}

	const posts = await getAllPosts();
	const post = posts.find((item) => item.slug === slug);

	if (!post) {
		return { notFound: true };
	}

	const content = await getPostContent(post.slug);

	return {
		props: { post, content },
	};
};

export default function BlogPostRoute({ post, content }: PostRouteProps) {
	return <PostPage post={post} content={content} />;
}
