import { Inter, PT_Sans_Caption } from "next/font/google";

import { Footer } from "./footer";
import { Header } from "./header";

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500"],
	variable: "--font-inter",
});

const ptSansCaption = PT_Sans_Caption({
	subsets: ["latin"],
	weight: "700",
	variable: "--font-sans",
});

type LayoutProps = {
	children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
	return (
		<div
			className={`${inter.variable} ${ptSansCaption.variable} relative flex min-h-screen flex-col bg-gray-700 font-inter`}>
			<Header />

			<main className="mt-10 flex flex-1 flex-col">{children}</main>

			<Footer />
		</div>
	);
};
