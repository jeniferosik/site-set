"use client";

import { Search } from "@/components/search";
import type { Post } from "@/lib/posts";
import { Inbox } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { PostCard } from "./components/post-card";
import { PostGridCard } from "./components/post-grid-card";

export type BlogListProps = {
	posts: Post[];
};

const formatPostDate = (date: string) => {
	const [year, month, day] = date.slice(0, 10).split("-");
	return `${day}/${month}/${year}`;
};

export function BlogList({ posts }: BlogListProps) {
	const searchParams = useSearchParams();
	const query = searchParams?.get("q") ?? "";

	const pageTitle =
		query ?
			`Resultados de busca para "${query}"`
		:	"Dicas e estratégias para impulsionar seu negócio";

	const normalizedQuery = query.trim().toLowerCase();

	const postList =
		normalizedQuery ?
			posts.filter((post) =>
				post.title.toLowerCase().includes(normalizedQuery),
			)
		:	posts;

	const hasPosts = postList.length > 0;

	return (
		<div className="flex h-full grow flex-col py-24">
			<header className="pb-14">
				<div className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
					<div className="flex flex-col gap-4 md:px-0">
						<span className="text-body-xs w-fit rounded-md bg-cyan-300 px-4 py-2 text-center text-cyan-100 md:text-left">
							BLOG
						</span>

						<h1 className="font-sans text-heading-lg md:text-heading-xl max-w-2xl text-start text-balance text-gray-100">
							{pageTitle}
						</h1>
					</div>

					<Search />
				</div>
			</header>

			{hasPosts && (
				<PostGridCard>
					{postList.map((post) => (
						<PostCard
							key={post.slug}
							slug={post.slug}
							title={post.title}
							description={post.description}
							image={post.image}
							date={formatPostDate(post.date)}
							author={post.author}
						/>
					))}
				</PostGridCard>
			)}

			{!hasPosts && (
				<div className="container px-8">
					<div className="flex flex-col items-center justify-center gap-8 rounded-lg border-2 border-dashed border-gray-300 p-8 md:p-12">
						<Inbox className="h-12 w-12 text-cyan-100" />

						<p className="text-center text-gray-100">
							Nenhum post encontrado.
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
