import rss from '@astrojs/rss';
import conf from "~/site.config";
import { getCollection } from 'astro:content';

import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import { formattedDate } from '~/lib/date';

const parser = new MarkdownIt();

/**
 * Extract links from HTML and append them as footnotes.
 * @param {string} html - The HTML content to process.
 * @returns {string} - The plain text content with links as footnotes.
 */
function stripHtmlAndAddFootnotes(html) {
    const linkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)">(.*?)<\/a>/g;
    let footnotes = [];
    let footnoteIndex = 1;

    // Replace links with footnote references
    const text = html.replace(linkRegex, (match, href, text) => {
        footnotes.push(`[${footnoteIndex}]: ${href}`);
        return `${text} [${footnoteIndex++}]`;
    });

    // Strip remaining HTML tags
    const plainText = sanitizeHtml(text, { allowedTags: [], allowedAttributes: {} });

    // Append footnotes to the content
    return `${plainText}\n\n${footnotes.join('\n')}`;
}

export async function GET(context) {
    const blog = await getCollection('notes');
    return rss({
        title: conf.site.title,
        description: conf.site.description,
        site: context.site,
        // stylesheet: "/feed.xsl",
        items: blog.map((post) => {
            const contentWithFootnotes = stripHtmlAndAddFootnotes(parser.render(post.body));
            return {
                title: post.data.title || `A note from ${formattedDate(post.data.date)}`,
                pubDate: post.data.date,
                description: post.data.description,
                link: `/notes/${post.id}/`,
                trailingSlash: false,
                content: contentWithFootnotes,
                ...post.data,
            };
        }),
        customData: `<language>en-gb</language>`,
    });
}