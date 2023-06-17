// convertData.js

export function convertData(data, name) {
  const noticeValue = data.find((item) => item.name === name).value;
  return noticeValue;
}
