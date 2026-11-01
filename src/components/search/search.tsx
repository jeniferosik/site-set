import { cn } from "@/lib/utils";
import { CircleX, SearchIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useCallback, type ChangeEvent, type SubmitEvent } from "react";

export const Search = () => {
	const router = useRouter();
	const query = typeof router.query.q === "string" ? router.query.q : "";

	const handleSearch = useCallback(
		(event: SubmitEvent<HTMLFormElement>) => {
			event.preventDefault();

			if (query.trim()) {
				router.push(`/blog?q=${encodeURIComponent(query)}`);
			}
		},
		[query, router],
	);

	const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newQuery = event.target.value;

		router.push(`/blog?q=${encodeURIComponent(newQuery)}`, undefined, {
			shallow: true,
			scroll: false,
		});
	};

	const resetSearch = () => {
		router.push("/blog", undefined, {
			shallow: true,
			scroll: false,
		});
	};

	return (
		<form onSubmit={handleSearch} className="relative group w-full md:w-60">
			<SearchIcon
				className={cn(
					"text-gray-300 absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200 group-focus-within:text-blue-300",
					query ? "text-blue-300" : "",
				)}
			/>

			<input
				type="text"
				placeholder="Buscar"
				aria-label="Buscar artigos"
				value={query}
				onChange={handleQueryChange}
				className="w-full h-10 md:w-60 bg-transparent border border-gray-400 pl-9 pr-9 text-gray-100 rounded-md text-body-sm outline-none transition-all duration-200 focus-within:border-blue-300 focus-within:ring-1 focus-within:ring-blue-300 placeholder:text-gray-300 placeholder:text-body-sm"
			/>

			{query && (
				<button
					type="button"
					aria-label="Limpar busca"
					onClick={resetSearch}
					className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-100">
					<CircleX className="h-4 w-4" />
				</button>
			)}
		</form>
	);
};
