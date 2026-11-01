import matter from "gray-matter";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export type PostAuthor = {
	name: string;
	avatar: string;
};

export type Post = {
	slug: string;
	title: string;
	description: string;
	date: string;
	image: string;
	author: PostAuthor;
};

const postsDirectory = path.join(process.cwd(), "posts");

export async function getAllPosts(): Promise<Post[]> {
	const fileNames = await readdir(postsDirectory);

	const mdxFiles = fileNames.filter((fileName) => fileName.endsWith(".mdx"));

	const posts = await Promise.all(
		mdxFiles.map(async (fileName): Promise<Post> => {
			const source = await readFile(
				path.join(postsDirectory, fileName),
				"utf8",
			);

			const { data } = matter(source);

			const slug = fileName.replace(/\.mdx$/, "");
			const author = data.author;

			if (
				typeof data.title !== "string" ||
				typeof data.description !== "string" ||
				typeof data.date !== "string" ||
				typeof data.image !== "string" ||
				!author ||
				typeof author.name !== "string" ||
				typeof author.avatar !== "string"
			) {
				throw new Error(`Metadados inválidos no artigo: ${fileName}`);
			}

			return {
				slug,
				title: data.title,
				description: data.description,
				date: data.date,
				image: data.image,
				author: {
					name: author.name,
					avatar: author.avatar,
				},
			};
		}),
	);

	return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostContent(slug: string): Promise<string> {
	const source = await readFile(
		path.join(postsDirectory, `${slug}.mdx`),
		"utf8",
	);

	return matter(source).content;
}
