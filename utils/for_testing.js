const palindrome = (string) => {
  return Array.from(string).reverse().join('');
};

module.exports = { palindrome };
