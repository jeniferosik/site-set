import { getAllPosts } from "@/lib/posts";
import { BlogList } from "@/templates/blog";
import { Suspense } from "react";

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
