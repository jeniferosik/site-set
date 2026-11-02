"use client";

import { Button } from "@/components/ui/button";
import { useShare } from "@/hooks";

type PostShareProps = {
	url: string;
	title: string;
	description: string;
};

export const PostShare = ({ url, title, description }: PostShareProps) => {
	const { shareButtons } = useShare({
		url,
		title,
		text: description,
	});

	return (
		<aside className="space-y-6">
			<div className="rounded-lg bg-gray-700 p-4 md:p-6">
				<h2 className="mb-4 text-heading-xs text-gray-100">Compartilhar</h2>

				<div className="flex flex-wrap justify-between gap-2 lg:flex-col">
					{shareButtons.map((provider) => (
						<Button
							key={provider.provider}
							type="button"
							onClick={() => void provider.action()}
							variant="outline"
							className="w-fit justify-start gap-2 lg:w-full">
							{provider.icon}
							<span className="hidden lg:inline">{provider.name}</span>
						</Button>
					))}
				</div>
			</div>
		</aside>
	);
};
