import conf from "~/site.config";
import { formattedDate } from "./date";
let siteName = conf.site.title;
let siteDescription = conf.site.description;

export const titleConstructor = (title: string) => {
	if (!title) return siteName;
	return `${title} | ${siteName}`;
};

export const descriptionConstructor = (description: string) => {
	if (!description) return siteDescription;
	return `${description}`;
};

export const noteTitleConstructor = (title: string | undefined, date: Date) => {
	if (title) return `A note titled ${title}`;
	return `A note from ${formattedDate(date, true)}`;
};
