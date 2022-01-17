export default function save({ key, data }) {
  window.localStorage.setItem(key, JSON.stringify(data));
}
