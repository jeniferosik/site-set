import { Button } from "@/components/ui/button";
import { FileQuestion, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
			<FileQuestion size={64} className="mx-auto mb-6 text-gray-100" />

			<h1 className="sr-only">Erro 404: página não encontrada</h1>

			<div
				className="relative mb-3 inline-block font-sans"
				aria-hidden="true">
				<span className="inline-block -translate-x-1 -translate-y-2 -rotate-12 text-8xl font-bold text-white">
					4
				</span>
				<span className="inline-block text-8xl font-bold text-white">
					0
				</span>
				<span className="inline-block text-8xl font-bold text-white">
					4
				</span>
			</div>

			<p className="mb-8 text-gray-100">Página não encontrada</p>

			<div className="flex flex-wrap justify-center gap-4">
				<Button variant="primary" asChild>
					<Link href="/">Home</Link>
				</Button>

				<Button variant="secondary" asChild>
					<Link href="/blog?q=">
						<Search size={16} />
						Pesquisar posts
					</Link>
				</Button>
			</div>
		</div>
	);
}
