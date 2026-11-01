import type { ReactNode } from "react";

type AvatarContentProps = {
	children: ReactNode;
};

export const AvatarContent = ({ children }: AvatarContentProps) => {
	return <div className="flex flex-col">{children}</div>;
};
