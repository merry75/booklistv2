export function formatTitle(str) {
    return str
        .toLowerCase()
        .replace(/\W/g, " ")
        .replace(/^\s+|\s+$/g, "")
        .split(" ")
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ");
}
