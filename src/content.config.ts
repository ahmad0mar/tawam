import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    /** Alternative text for the cover image. Leave empty for decorative stock photos. */
    imageAlt: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

const guideBase = {
  name: z.string(),
  slug: z.string().optional(),
  level: z.string(),
  last_updated: z.coerce.date().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
};

const examCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/exams' }),
  schema: z.object({
    ...guideBase,
    conducting_body: z.string(),
    courses_covered: z.array(z.string()).default([]),
    exam_mode: z.string().optional(),
  }),
});

const courseCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/courses' }),
  schema: z.object({
    ...guideBase,
    duration: z.string(),
    eligibility: z.string(),
    accepted_exams: z.array(z.string()).default([]),
    average_fees_range: z.string().optional(),
    specializations: z.array(z.string()).default([]),
  }),
});

const collegeCourseSchema = z.object({
  name: z.string(),
  slug: z.string().optional(),
  level: z.string().optional(),
  duration: z.string().optional(),
  annual_fee: z.string().optional(),
  seats: z.number().optional(),
  cutoff_summary: z.string().optional(),
});

const collegeCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/colleges' }),
  schema: z.object({
    name: z.string(),
    short_name: z.string().optional(),
    slug: z.string().optional(),
    state: z.string(),
    state_code: z.string(),
    state_slug: z.string(),
    city: z.string(),
    city_slug: z.string(),
    type: z.enum(['Government', 'Private', 'Deemed']),
    established: z.number().optional(),
    nirf_rank: z.union([z.string(), z.number()]).optional(),
    naac_grade: z.string().optional(),
    affiliation: z.string().optional(),
    streams: z.array(z.string()).default([]),
    courses_offered: z.array(collegeCourseSchema).default([]),
    accepted_exams: z.array(z.string()).default([]),
    campus_size: z.string().optional(),
    hostel_available: z.boolean().default(true),
    hostel_details: z.string().optional(),
    average_package: z.string().optional(),
    highest_package: z.string().optional(),
    top_recruiters: z.array(z.string()).default([]),
    address: z.string(),
    pincode: z.string().optional(),
    website: z.string().optional(),
    featured: z.boolean().default(false),
    cover_image: z.string().optional(),
    imageAlt: z.string().optional(),
    gallery_images: z.array(z.string()).default([]),
    description: z.string().optional(),
    last_updated: z.coerce.date().optional(),
    metadata: metadataDefinition(),
  }),
});

const scholarshipCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/scholarships' }),
  schema: z.object({
    name: z.string(),
    provider: z.string(),
    eligibility: z.string(),
    amount: z.string(),
    deadline: z.string().optional(),
    applicable_state: z.string().optional(),
    applicable_courses: z.array(z.string()).default([]),
    how_to_apply: z.string().optional(),
    official_link: z.string().optional(),
    last_updated: z.coerce.date().optional(),
  }),
});

export const collections = {
  post: postCollection,
  exams: examCollection,
  courses: courseCollection,
  colleges: collegeCollection,
  scholarships: scholarshipCollection,
};
