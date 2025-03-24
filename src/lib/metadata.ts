import conf from "~/site.config";

export const isBlog = (pathname: string) => {
	return pathname.startsWith("/blog");
};

export const titleConstructor = (title: string, pathname: string) => {
	if (isBlog(pathname)) {
		return title
			? `${title} | Everything And The Girl`
			: "Everything And The Girl";
	}
	if (!title) return conf.siteName;
	return `${title} | ${conf.siteName}`;
};

export const descriptionConstructor = (description: string) => {
	if (!description) return conf.description;
	return `${description}`;
};

export const noteTitleConstructor = (title: string, date: Date) => {
	if (title) return title;
	return `A note from ${date.toLocaleDateString()}`;
};
