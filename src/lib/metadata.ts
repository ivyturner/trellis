import conf from "~/site.config";
import { formattedDate } from "./date";

let siteName = conf.site.title;
let siteDescription = conf.site.description;

function template(input: string): string {
	return `${input} | ${siteName}`
}

export function titleConstructor(title: string | undefined): string {
	if (!title) return siteName;
	return template(title);
};

export function descriptionConstructor(description: string) {
	if (!description) return siteDescription;
	return `${description}`;
};

export function noteTitleConstructor(title: string | undefined, date: Date) {
	if (title) return template(`A note titled ${title}`);
	return template(`A note from ${formattedDate(date, true)}`);
};
