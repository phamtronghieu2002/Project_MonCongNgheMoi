export const generateKeywordsWithSpaces = (str) => {
  const keywords = [];
  const words = str.split(' ');

  for (let i = 0; i < words.length; i++) {
    let currentKeyword = '';
    for (let j = 0; j < words[i].length; j++) {
      currentKeyword += words[i][j];
      keywords.push(currentKeyword);
    }

    if (i < words.length - 1) {
      // Add space and combinations with the next word
      currentKeyword += ' ';
      keywords.push(currentKeyword);

      words[i + 1].split('').forEach(char => {
        currentKeyword += char;
        keywords.push(currentKeyword);
      });
    }
  }

  return keywords;
}

export const checkPhoneNumberIsValid = (phonenumber) => {
  return /^\+?[0-9\s-]{3,20}$/.test(phonenumber);
}
