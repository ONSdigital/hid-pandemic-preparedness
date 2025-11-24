export const extractStoryblokPageContent = (node: any): string => {
  if (!node) return "";

  if (typeof node === "string") {
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}/.test(node);
    const isDate = /^\d{4}-\d{2}-\d{2}T/.test(node);
    
    if (isUUID || isDate) return "";
    return node;
  }

  if (Array.isArray(node)) {
    return node.map(extractStoryblokPageContent).join(" ");
  }

  if (typeof node === "object") {
    
    if (node.type === "text" && node.text) {
      return node.text;
    }

    const ignoredKeys = [
      "_uid", 
      "uuid", 
      "id", 
      "component", 
      "_editable", 
      "fieldtype", 
      "linktype", 
      "type",
      "attrs",
      "marks",
      "rel",
      "target"
    ];

    return Object.keys(node)
      .filter((key) => !ignoredKeys.includes(key))
      .map((key) => extractStoryblokPageContent(node[key]))
      .join(" ");
  }

  return "";
}