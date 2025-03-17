// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Import loader(s)
import { glob } from "astro/loaders";

// 3. Define your collection(s)
const blog = defineCollection({
	loader: glob({ pattern: "*.md", base: "src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.date().default(new Date()),
		tags: z.array(z.string()).optional(),
		draft: z.boolean().default(false),
		icon: z.string().optional().default("fa-solid fa-blog"),
		image: z
			.object({
				src: z.string(),
				alt: z.string(),
			})
			.optional(),
	}),
});

const notes = defineCollection({
	loader: glob({ pattern: "*.md", base: "src/content/notes" }),
	schema: z.object({
		title: z.string().optional(),
		exturl: z.string().url().optional(),
		date: z.date(),
		tags: z.array(z.string()).optional(),
		icon: z.string().optional().default("fa-solid fa-sticky-note"),
		draft: z.boolean().default(false),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: "*.md", base: "src/content/projects" }),
	schema: z.object({
		name: z.string(),
		description: z.string(),
		date: z.date(),
		url: z.string().url().optional(), // homepage
		repo: z.string().url().optional(), // git{hub,.sr.ht} link
		status: z.enum(["active", "finished", "backburner", "scrapped"]),
		version: z.string(),
		icon: z.string().optional().default("fa-solid fa-wrench"),
	}),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { blog, notes, projects };
