import Image from "next/image";
import Link from "next/link";

import { Avatar } from "@/components/avatar";
import { Markdown } from "@/components/markdown/markdown";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import type { Post } from "@/lib/posts";
import { PostShare } from "./components/post-share";

type PostPageProps = {
	post: Post;
	content: string;
};

export const PostPage = ({ post, content }: PostPageProps) => {
	const machineDate = post.date.slice(0, 10);
	const [year, month, day] = machineDate.split("-");
	const publishedDate = `${day}/${month}/${year}`;

	const postUrl = `https://site.set/blog/${encodeURIComponent(post.slug)}`;

	return (
		<div className="mt-32 text-gray-100">
			<div className="container space-y-12 px-4 md:px-8">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild className="text-action-sm">
								<Link href="/blog">Blog</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>

						<BreadcrumbSeparator />

						<BreadcrumbItem>
							<span className="text-action-sm text-blue-200">
								{post.title}
							</span>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
					<article className="min-w-0 overflow-hidden rounded-lg border border-gray-400 bg-gray-600">
						<figure className="relative aspect-16/10 w-full overflow-hidden rounded-lg">
							<Image
								src={post.image}
								alt={post.title}
								fill
								sizes="(max-width: 1024px) 100vw, calc(100vw - 300px)"
								className="object-cover"
							/>
						</figure>

						<header className="mt-8 p-4 pb-0 md:mt-12 md:p-6 md:pb-0 lg:p-12 lg:pb-0">
							<h1 className="mb-8 text-balance text-heading-lg md:text-heading-xl">
								{post.title}
							</h1>

							<Avatar.Container>
								<Avatar.Image
									src={post.author.avatar}
									alt=""
									size="sm"
								/>

								<Avatar.Content>
									<Avatar.Title>{post.author.name}</Avatar.Title>

									<Avatar.Description>
										Publicado em{" "}
										<time dateTime={machineDate}>
											{publishedDate}
										</time>
									</Avatar.Description>
								</Avatar.Content>
							</Avatar.Container>
						</header>

						<div className="prose prose-invert mt-12 max-w-none px-4 md:px-6 lg:px-12">
							<Markdown content={content} />
						</div>
					</article>

					<PostShare
						url={postUrl}
						title={post.title}
						description={post.description}
					/>
				</div>
			</div>
		</div>
	);
};
