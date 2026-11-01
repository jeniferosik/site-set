import { useCallback, useEffect, useState } from "react";

type UseClipboardProps = {
	timeout?: number;
};

export const useClipboard = ({ timeout = 2000 }: UseClipboardProps = {}) => {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = useCallback(async (text: string): Promise<boolean> => {
		if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
			console.error("Área de transferência não suportada neste navegador.");
			return false;
		}

		try {
			await navigator.clipboard.writeText(text);
			setIsCopied(true);
			return true;
		} catch (error) {
			console.error("Falha ao copiar o texto:", error);
			setIsCopied(false);
			return false;
		}
	}, []);

	useEffect(() => {
		if (!isCopied) return;

		const timer = window.setTimeout(() => setIsCopied(false), timeout);
		return () => window.clearTimeout(timer);
	}, [isCopied, timeout]);

	return { isCopied, handleCopy };
};
