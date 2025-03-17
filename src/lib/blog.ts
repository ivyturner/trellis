import siteConfig from "~/site.config";
import type { CollectionEntry } from "astro:content";

type PostWithDate = {
	data: {
		date: Date;
	};
};

const sortByDateDescending = <T extends PostWithDate>(posts: T[]): T[] => {
	return posts.sort((a, b) =>
		isDateBefore(a.data.date, b.data.date) ? 1 : -1
	);
};

const filterPublishedPosts = <T extends { data: { draft?: boolean } }>(
	posts: T[]
): T[] => {
	if (import.meta.env.PROD) {
		return posts.filter((post) => !post.data.draft);
	}
	return siteConfig.devMode.showDraftPages
		? posts
		: posts.filter((post) => !post.data.draft);
};

export const getPublishedAndSortedPosts = (
	allPosts: CollectionEntry<"blog">[]
): CollectionEntry<"blog">[] => {
	return sortByDateDescending(filterPublishedPosts(allPosts));
};

export const getPublishedAndSortedNotes = (
	allPosts: CollectionEntry<"notes">[]
): CollectionEntry<"notes">[] => {
	return sortByDateDescending(allPosts);
};

// helper function to check if date1 is before date2
export const isDateBefore = (date1: Date, date2: Date): boolean =>
	date1.getTime() < date2.getTime();
