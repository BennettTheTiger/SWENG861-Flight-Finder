/**
 * Returns a sentence with capital letter words
 * @param {String} value sentence to fix
 * @returns {String}
 */
function useWordCasing(value) {
  const words = value.toLowerCase().split(' ');
  const fixedWords = words.map((word) => {
    word.toLowerCase();
    const firstLetter = word.charAt(0);

    const firstLetterCap = firstLetter.toUpperCase();

    const remainingLetters = word.slice(1);

    return firstLetterCap + remainingLetters;
  });

  return fixedWords.join(' ');
}

export default useWordCasing;
