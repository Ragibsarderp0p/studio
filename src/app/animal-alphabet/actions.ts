'use server';

import { generateMissingLetter } from '@/ai/flows/generate-missing-letter';

// NOTE: This function will not work in a static export. 
// The game component has been updated to use a fallback.
export async function getMissingLetterForAnimal(animalName: string) {
  try {
    const result = await generateMissingLetter({ animalName });
    return { success: true, index: result.missingLetterIndex };
  } catch (error) {
    console.error('AI flow failed:', error);
    // Fallback logic if AI fails: pick a random letter other than the first or last.
    if (animalName.length > 2) {
        const fallbackIndex = Math.floor(Math.random() * (animalName.length - 2)) + 1;
        return { success: true, index: fallbackIndex };
    }
    return { success: true, index: 1 };
  }
}
