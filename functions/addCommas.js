// convertData.js

export function addCommas(number) {
  const strNumber = number.toString();
  let result = "";

  for (let i = strNumber.length - 1, j = 0; i >= 0; i--, j++) {
    if (j !== 0 && j % 3 === 0) {
      result = "," + result;
    }
    result = strNumber.charAt(i) + result;
  }

  return result;
}
