import rss from '@astrojs/rss';
import conf from "~/site.config";
import { getCollection } from 'astro:content';

import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
    const blog = await getCollection('blog');
    return rss({
        // `<title>` field in output xml
        title: `${conf.site.title} blog`,
        // `<description>` field in output xml
        description: conf.site.description,
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#site
        site: context.site + "/blog",
        stylesheet: "/feed.xsl",
        // Array of `<item>`s in output xml
        // See "Generating items" section for examples using content collections and glob imports
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.description,
            // Compute RSS link from post `id`
            // This example assumes all posts are rendered as `/blog/[id]` routes
            link: `/blog/${post.id}/`,
            trailingSlash: false,
            content: sanitizeHtml(parser.render(post.body), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
            }),
            ...post.data,
        })),
        // (optional) inject custom xml
        customData: `<language>en-gb</language>`,
    });
}