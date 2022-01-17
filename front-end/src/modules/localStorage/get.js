export default function get(key) {
  const storedData = window.localStorage.getItem(key);
  if (storedData) {
    return JSON.parse(storedData);
  }

  return null;
}
