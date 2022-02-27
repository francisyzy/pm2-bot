/**
 * Escape MarkdownV2 Characters
 * @param {string} str - The string with characters to escape
 * @return {string} Escaped strings
 */
export function toEscapeMsg(str: string): string {
  return str
    .replace(/_/gi, "\\_")
    .replace(/-/gi, "\\-")
    .replace("+", "\\+")
    .replace("=", "\\=")
    .replace("~", "\\~")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/\</g, "\\<")
    .replace(/\>/g, "\\>")
    .replace(/!/gi, "\\!")
    .replace(/`/gi, "\\`")
    .replace(/\./g, "\\.");
}

/**
 * Escape HTML Characters
 * For some reason the < and the > dont wanna escape properly. Prob due to &
 * @param {string} str - The string with characters to escape
 * @return {string} Escaped strings
 */
export function toEscapeHTMLMsg(str: string): string {
  return (
    str
      // .replace(/\</g, "&gt;")
      // .replace(/\>/g, "&lt;")
      // .replace(/\&/g, "&amp;");
      .replace("<", "&gt;")
      .replace(">", "&lt;")
      .replace("&", "&amp;")
  );
}

/**
 * Template function that adds a right padding of 12 to the first string
 *
 * @export
 * @param {TemplateStringsArray} template
 * @param {any} key
 * @returns {string}
 */
export function pad(template: TemplateStringsArray, key: any) {
  const maxLength = 12;
  let strings = [...template];
  let start = strings.splice(0, 1)[0].trim();
  return ` ${start.padEnd(maxLength)}${key}${strings.pop() || ""}`;
}

/**
 * Returns elapsed time
 *
 * @export
 * @param {(number|string)} timestamp
 * @returns {string}
 */
export function timeSince(timestamp: number | string) {
  let diff = (new Date().getTime() - Number(timestamp)) / 1000;
  let seconds = diff;
  let minutes = 0;
  let hours = 0;
  let days = 0;
  let str = `${Math.abs(Math.round(seconds))}s`;
  if (seconds > 60) {
    seconds = Math.abs(Math.round(diff % 60));
    minutes = Math.abs(Math.round((diff /= 60)));
    str = `${minutes}m ${seconds}s`;
  }
  if (minutes > 60) {
    minutes = Math.abs(Math.round(diff % 60));
    hours = Math.abs(Math.round(diff / 60));
    str = `${hours}h ${minutes}m`;
  }
  if (hours > 24) {
    days = Math.abs(Math.round(hours / 24));
    hours = Math.abs(Math.round(hours % 24));
    str = `${days}d ${hours}h`;
  }
  return str;
}
