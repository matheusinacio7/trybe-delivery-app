export default function save({ key, data }) {
  console.log({ key, data });
  window.localStorage.setItem(key, JSON.stringify(data));
}
