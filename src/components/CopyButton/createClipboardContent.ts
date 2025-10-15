export function createClipboardContent(element: HTMLInputElement) {
  const plainText = element.innerText;
  const htmlContent = element.innerHTML;

  const blobPlain = new Blob([plainText], { type: "text/plain" });
  const blobHtml = new Blob([htmlContent], { type: "text/html" });

  return new ClipboardItem({
    "text/plain": blobPlain,
    "text/html": blobHtml,
  });
}
