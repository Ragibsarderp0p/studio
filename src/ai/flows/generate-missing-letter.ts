'use server';

/**
 * @fileOverview A flow to generate which letter is missing in an animal name for the Animal Alphabet Game.
 *
 * - generateMissingLetter - A function that handles the generation of the missing letter.
 * - GenerateMissingLetterInput - The input type for the generateMissingLetter function.
 * - GenerateMissingLetterOutput - The return type for the generateMissingLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMissingLetterInputSchema = z.object({
  animalName: z.string().describe('The name of the animal.'),
});
export type GenerateMissingLetterInput = z.infer<typeof GenerateMissingLetterInputSchema>;

const GenerateMissingLetterOutputSchema = z.object({
  missingLetterIndex: z
    .number()
    .describe(
      'The index of the letter that should be missing in the animal name.  Must be between 0 and the length of the animalName minus one.'
    ),
});
export type GenerateMissingLetterOutput = z.infer<typeof GenerateMissingLetterOutputSchema>;

export async function generateMissingLetter(input: GenerateMissingLetterInput): Promise<GenerateMissingLetterOutput> {
  return generateMissingLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMissingLetterPrompt',
  input: {schema: GenerateMissingLetterInputSchema},
  output: {schema: GenerateMissingLetterOutputSchema},
  prompt: `Given the animal name "{{animalName}}", determine a single letter to remove from the word.

Return the index representing the position of the letter to remove. The index should be a valid position within the word.

Please return a single integer. For example, if the animalName is "zebra", you might return "3". Do not include any other text in your output.`,
});

const generateMissingLetterFlow = ai.defineFlow(
  {
    name: 'generateMissingLetterFlow',
    inputSchema: GenerateMissingLetterInputSchema,
    outputSchema: GenerateMissingLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
