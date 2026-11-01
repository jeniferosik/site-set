declare module "*.mdx" {
	export const metadata: {
		title: string;
		description: string;
		date: string;
		image: string;
		author: {
			name: string;
			avatar: string;
		};
	};
}
