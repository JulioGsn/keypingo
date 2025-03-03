<script lang="ts">
	import { setChars } from '$lib/actions';
	type Word = {
		text: string;
		correct: boolean;
		error: boolean;
	};
	let words: Word[] = $state([
		{ text: 'Oi,', correct: false, error: false },
		{ text: 'Rita.', correct: false, error: false },
		{ text: 'Esse', correct: false, error: false },
		{ text: 'é', correct: false, error: false },
		{ text: 'um', correct: false, error: false },
		{ text: 'site', correct: false, error: false },
		{ text: 'para', correct: false, error: false },
		{ text: 'digitar', correct: false, error: false },
		{ text: 'rápido', correct: false, error: false },
		{ text: 'palavras,', correct: false, error: false },
		{ text: 'mas', correct: false, error: false },
		{ text: 'vai', correct: false, error: false },
		{ text: 'ter', correct: false, error: false },
		{ text: 'muitas', correct: false, error: false },
		{ text: 'funcionalidades', correct: false, error: false },
		{ text: 'se', correct: false, error: false },
		{ text: 'eu', correct: false, error: false },
		{ text: 'não', correct: false, error: false },
		{ text: 'for', correct: false, error: false },
		{ text: 'preguiçoso', correct: false, error: false },
		{ text: 'demais', correct: false, error: false }
	]);

	let currentWordIndex = $state(0);
	let inputWord = $state('');
	const SPACEKEY = ' ';

	let currentWord: Word = $state(words[0]);
	let currentChars = $state(setChars(words[0].text));

	let pastWords: Word[] = $state([]);

	let rest = $derived(
		words
			.filter((w, idx) => idx > currentWordIndex)
			.map((w) => w.text)
			.join(' ')
	);

	let currentTypedIndex = $state(0);
	function type(e: KeyboardEvent) {
		let typed = e.key;

		if (typed === SPACEKEY) {
			if (!currentChars.some((c) => c.error)) {
				words[currentWordIndex].correct = true;
			} else {
				words[currentWordIndex].error = true;
			}
			currentWordIndex += 1;
			currentTypedIndex = 0;
			if (words[currentWordIndex] === undefined) {
				return;
			}
			pastWords.push(currentWord);
			console.log('chegou aqui');
			currentWord = words[currentWordIndex];
			currentChars = currentWord.text.split('').map((c) => {
				return {
					char: c,
					correct: false,
					error: false
				};
			});
			inputWord = '';
			return;
		}

		console.log('Typed: ', typed);
		console.log('currentWord[currentTypedIndex]: ', currentWord.text[currentTypedIndex]);
		console.log('currentChars[currentTypedIndex]: ', currentChars[currentTypedIndex]);

		if (typed === currentWord.text[currentTypedIndex]) {
			currentChars[currentTypedIndex].correct = true;
		} else {
			currentChars[currentTypedIndex].error = true;
		}
		if (currentTypedIndex < currentChars.length) {
			currentTypedIndex += 1;
		}
	}

	function restart() {
		inputWord = '';
		currentWordIndex = 0;
		currentTypedIndex = 0;
		pastWords = [];
		for (const word of words) {
			word.correct = false;
			word.error = false;
		}
	}
</script>

<div class="words">
	<!--
	{#each words as word, idx}
		<span
			class="word"
			class:correct={word.correct}
			class:error={word.error}
			class:next={idx === currentWordIndex}>{word.w}</span
		>
	{/each}
  -->
	{pastWords.map((p) => p.text).join(' ')}
	{#each currentChars as char}
		<span class="word-char" class:correct={char.correct} class:error={char.error}
			>{char.char}
		</span>
	{/each}
	<span class="word-rest">{rest}</span>
</div>
<br />
<input
	type="text"
	bind:value={inputWord}
	onkeypress={type}
	disabled={currentWordIndex === words.length}
/>

<button type="button" onclick={restart}>Reiniciar</button>
Certas: {words.filter((w) => w.correct).length}
| Erradas: {words.filter((w) => w.error).length}

<style>
	.words {
		width: 500px;
	}
	.word {
		padding: 5px;
	}
	.correct {
		color: green;
	}
	.error {
		color: red;
	}
	.word.next {
		background: oklch(0.929 0.013 255.508);
	}
</style>
