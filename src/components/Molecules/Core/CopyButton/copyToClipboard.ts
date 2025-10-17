export async function copyToClipboard(element: HTMLElement) {
  const plainText = element.innerText;
  const htmlContent = element.innerHTML;

  const blobPlain = new Blob([plainText], { type: "text/plain" });
  const blobHtml = new Blob([htmlContent], { type: "text/html" });

  const clipboardItem = new ClipboardItem({
    "text/plain": blobPlain,
    "text/html": blobHtml,
  });

  try {
    await navigator.clipboard.write([clipboardItem]);
    return true;
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
}
