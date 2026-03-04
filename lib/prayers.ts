import fs from 'fs';
import path from 'path';
import { prayerSchema, type PrayerVerse, type PrayerMetadata } from './schemas/prayer';

export type { PrayerVerse, PrayerMetadata };

export interface Prayer {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly language?: string;
  readonly author?: string;
  readonly category?: string;
  readonly verses: readonly PrayerVerse[];
}

const prayersDirectory = path.join(process.cwd(), 'content/prayers');

export function getAllPrayers(): readonly Prayer[] {
  const files = fs.readdirSync(prayersDirectory);
  const prayers: Prayer[] = [];

  files.forEach(file => {
    if (!file.endsWith('.json')) return;

    const slug = file.replace('.json', '');
    const filePath = path.join(prayersDirectory, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    try {
      const validatedData = prayerSchema.parse(data);
      prayers.push({
        slug,
        title: validatedData.metadata.title,
        description: validatedData.metadata.description,
        language: validatedData.metadata.language,
        author: validatedData.metadata.author,
        category: validatedData.metadata.category,
        verses: validatedData.verses,
      });
    } catch (error: any) {
      console.error(`\n❌ Validation error in ${filePath}:`);
      if (error.errors) {
        error.errors.forEach((err: any) => {
          console.error(`  - ${err.path.join('.')}: ${err.message}`);
        });
      }
      throw new Error(`Invalid prayer data in ${file}`);
    }
  });

  return prayers.sort((a, b) => a.title.localeCompare(b.title));
}

export function getPrayerBySlug(slug: string): Prayer | null {
  const prayers = getAllPrayers();
  return prayers.find(prayer => prayer.slug === slug) || null;
}
