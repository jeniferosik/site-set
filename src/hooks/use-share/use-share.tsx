import { Check, Link } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useClipboard } from "../use-clipboard/use-clipboard";
import {
	SOCIAL_PROVIDERS,
	type ShareConfig,
	type SocialProvider,
} from "./social-providers";

type UseShareProps = ShareConfig & {
	clipboardTimeout?: number;
};

export const useShare = ({
	url,
	title,
	text,
	clipboardTimeout = 2000,
}: UseShareProps) => {
	const { isCopied, handleCopy } = useClipboard({
		timeout: clipboardTimeout,
	});

	const shareConfig = useMemo<ShareConfig>(
		() => ({
			url,
			...(title && { title }),
			...(text && { text }),
		}),
		[url, title, text],
	);

	const share = useCallback(
		async (provider: SocialProvider): Promise<boolean> => {
			if (!url) return false;

			if (provider === "clipboard") {
				return handleCopy(url);
			}

			const providerConfig = SOCIAL_PROVIDERS[provider];

			if (providerConfig.type === "clipboard") {
				return handleCopy(url);
			}

			try {
				const shareUrl = providerConfig.shareUrl(shareConfig);

				const shareWindow = window.open(
					shareUrl,
					"_blank",
					"width=600,height=600,location=yes,status=yes",
				);

				if (!shareWindow) return false;

				shareWindow.opener = null;
				return true;
			} catch (error) {
				console.error("Falha ao abrir o compartilhamento:", error);
				return false;
			}
		},
		[handleCopy, shareConfig, url],
	);

	const shareButtons = useMemo(
		() => [
			...Object.entries(SOCIAL_PROVIDERS).map(([key, provider]) => ({
				provider: key,
				name: provider.name,
				icon: provider.icon,
				action: () => share(key as SocialProvider),
			})),
			{
				provider: "clipboard",
				name: isCopied ? "Link copiado!" : "Copiar link",
				icon:
					isCopied ?
						<Check className="h-4 w-4" />
					:	<Link className="h-4 w-4" />,
				action: () => share("clipboard"),
			},
		],
		[isCopied, share],
	);

	return { shareButtons };
};
