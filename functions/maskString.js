// convertData.js

export function maskString(string) {
  const length = string.length;

  // 앞 3개 문자 추출
  const prefix = string.slice(0, 3);

  // 나머지 문자 *로 처리
  const maskedString = prefix + "*".repeat(length - 3);

  return maskedString;
}
