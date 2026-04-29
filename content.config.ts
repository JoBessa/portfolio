import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        github: z.string().optional(),
        slug: z.string().optional(),
        demo: z.string().optional(),
        pinned: z.boolean().default(false),
        featured: z.boolean().default(false),
        order: z.number().default(99),
      }),
    }),
  },
})