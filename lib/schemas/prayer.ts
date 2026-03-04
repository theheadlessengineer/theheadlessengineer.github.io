import { z } from 'zod';

export const prayerVerseSchema = z.object({
  verse: z.string(),
  transliteration: z.string().optional(),
  hindi: z.string().optional(),
  english: z.string().optional(),
});

export const prayerMetadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  language: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
});

export const prayerSchema = z.object({
  metadata: prayerMetadataSchema,
  verses: z.array(prayerVerseSchema).min(1),
});

export type PrayerVerse = z.infer<typeof prayerVerseSchema>;
export type PrayerMetadata = z.infer<typeof prayerMetadataSchema>;
export type PrayerData = z.infer<typeof prayerSchema>;
