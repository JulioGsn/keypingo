import { setChars } from '$lib/actions';
import { describe, expect, test } from 'vitest';

describe('Test actions', () => {
	test('Should return characteres from a word', () => {
		const word = { text: 'Hi', correct: false, error: false };
		const chars = setChars(word.text);

		expect(chars).toEqual([
			{
				char: 'H',
				correct: false,
				error: false
			},
			{
				char: 'i',
				correct: false,
				error: false
			}
		]);
	});
});
