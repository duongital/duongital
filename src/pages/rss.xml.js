import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION } from '../config'

export async function GET(context) {
  const posts = await getCollection('posts')
  // Sort by pubDate descending
  posts.sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate))

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.pubDate),
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  })
}
