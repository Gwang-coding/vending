export default function convertArrayToObject(arr) {
  const obj = {};
  arr.forEach((item) => {
    obj[item.name] = item.value;
  });
  return obj;
}
