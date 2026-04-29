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
        image: z.string().optional(),
        github: z.string().optional(),
        slug: z.string().optional(),
        demo: z.string().optional(),
        pinned: z.boolean().default(false),
        featured: z.boolean().default(false),
        order: z.number().default(99),
        role: z.string().optional(),
        duration: z.string().optional(),
        client: z.string().optional(),
        highlights: z.array(z.object({
          value: z.string(),
          label: z.string(),
        })).optional(),
        sections: z.array(z.object({
          title: z.string(),
          description: z.string(),
          image: z.string().optional(),
          reverse: z.boolean().default(false),
          features: z.array(z.string()).optional(),
        })).optional(),
      }),
    }),
  },
})