export function formatTitle(title) {
  return title
    .toLowerCase()
    .replace(/\W/g, " ")
    .replace(/^\s+|\s+$/g, "")
    .split(" ")
    .map(t => t.charAt(0).toUpperCase() + t.slice(1))
    .join(" ");
}
