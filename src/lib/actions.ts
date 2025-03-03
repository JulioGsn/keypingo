export function setChars(word: string) {
	return word.split('').map((c) => {
		return {
			char: c,
			correct: false,
			error: false
		};
	});
}
