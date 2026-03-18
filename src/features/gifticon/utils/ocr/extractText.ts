import { extractTextFromImage } from 'expo-text-extractor';

export async function extractText(uri: string): Promise<string[]> {
  const lines = await extractTextFromImage(uri);
  return lines.map((line) => line.trim()).filter(Boolean);
}
