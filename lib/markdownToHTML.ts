import { marked } from "marked";
// import { sanitizeUrl } from "@braintree/sanitize-url";

export default async function markdownToHTML(markdown: string) {
  const result = marked(markdown);
  return result.toString();
}
