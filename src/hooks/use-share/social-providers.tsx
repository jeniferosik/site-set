import {
	AtSign,
	BriefcaseBusiness,
	MessageSquareText,
	Send,
	UsersRound,
} from "lucide-react";
import type { ReactNode } from "react";

export type ShareConfig = {
	url: string;
	title?: string;
	text?: string;
};

type ShareProviderConfig =
	| {
			type: "external";
			name: string;
			icon: ReactNode;
			shareUrl: (config: ShareConfig) => string;
	  }
	| {
			type: "clipboard";
			name: string;
			icon: ReactNode;
	  };

export const SOCIAL_PROVIDERS = {
	linkedin: {
		type: "external",
		name: "LinkedIn",
		icon: <BriefcaseBusiness className="h-4 w-4" />,
		shareUrl: ({ url }: ShareConfig) =>
			`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
	},
	facebook: {
		type: "external",
		name: "Facebook",
		icon: <UsersRound className="h-4 w-4" />,
		shareUrl: ({ url }: ShareConfig) =>
			`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
	},
	slack: {
		type: "clipboard",
		name: "Slack",
		icon: <MessageSquareText className="h-4 w-4" />,
	},
	twitter: {
		type: "external",
		name: "Twitter / X",
		icon: <Send className="h-4 w-4" />,
		shareUrl: ({ url, title }: ShareConfig) =>
			`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title ?? "")}`,
	},
	threads: {
		type: "external",
		name: "Threads",
		icon: <AtSign className="h-4 w-4" />,
		shareUrl: ({ url, title }: ShareConfig) =>
			`https://www.threads.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title ?? "")}`,
	},
} satisfies Record<string, ShareProviderConfig>;

export type SocialProvider = keyof typeof SOCIAL_PROVIDERS | "clipboard";
