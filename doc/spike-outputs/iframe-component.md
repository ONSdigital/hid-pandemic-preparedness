# iframe component

This is the output of the [ONSPPT-330](https://anddigitaltransformation.atlassian.net/browse/ONSPPT-330) spike ticket to test tools hosted via [Streamlit](https://streamlit.io/) or [shinyapps](https://www.shinyapps.io/) can be integrated with the application using an iframe.

## Embedding an iframe into the page

It's simple to embed an iframe into a web page. You simply need to pass in the URL where the content of the iframe is hosted as the source (src).

```html
<iframe src="https://someurl.com/iframe-content" width="100%"></iframe>
```

This will seamlessly add the content of the iframe to the page.

![Screenshot of iframe embedded onto a webpage.](../images/iframe-example.png)

## The height issue

iframes require a fixed height to be set, they can't be set to automatically fit the height of it's content.

By default, the height of an iframe is set to 150px. The height can be overridden easily by setting a height value on to the iframe (`height="500px"`) or using styles.

There are two main problems with fixed height iframes:

1. If the iframe's content is taller than the fixed height, content will appear cut off and will cause scrollbars to appear within the iframe.
2. If the iframe's content is shorter than the fixed height, you get unwanted empty space below it.

Both scenarios offer a poor experience for mobile users in particular. As you can't tell what size screen someone will be viewing the page from, it's impossible to get the size right via a value set in the CMS.

As the page gets narrower, the content gets taller. As the page gets wider, the content gets shorter.

**The solution to this is the dynamically size the iframe using javascript.**

### Same-Origin Policy issues

Unfortunately, if the contents of our iframe is hosted somewhere with a different domain to our application's domain we are unable to access the content's height directly.

#### Solution 1: Add some Javascript code to the iframe content

Using the `window.parent.postMessage` API you can communicate from the iframe content to the parent page. When the iframe content loads or when the it's resized you can send a message to the parent page with the content height.

You set up a `message` event listener on the parent page so when you receive a message to say the content height has updated, you set the iframe to be the height received from the message.

This approach means we can use [Streamlit](https://streamlit.io/) and [shinyapps](https://www.shinyapps.io/) platforms to host our content. For this to work, you need to be able to add code to the hosted content.

```javascript
// iframe
window.parent.postMessage(
  {
    type: "iframeHeight",
    height: getPageHeight(),
  },
  "https://parent-domain.com",
);
```

```javascript
// parent
window.addEventListener("message", handleMessage);
```

#### Solution 2: Host the iframe content on the same domain as our website

If we were to host the iframe on the same domain as our website then we don't run in to Same-Origin Policy issues. We could then use Javascript to access the height of our iframe content directly using something like `iframeElement.contentWindow.document.body.scrollHeight`. We could then use these values to set the height if the iframe.

The downside to this approach is that we lose the ability to host our iframe content on platforms like [Streamlit](https://streamlit.io/) and [shinyapps](https://www.shinyapps.io/). Instead, we would need somewhere for the iframe content to live and an easy way for the end user to be able to safely upload the content.

## Further considerations

### Accurately getting the page height

Getting the height of a page's content can be a little tricky as browsers can report page heights slightly differently depending on the document's content and CSS. This function should accurately get the height:

```javascript
function getPageHeight() {
  const body = document.body;
  const html = document.documentElement;

  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight,
  );
}
```

### Security

There are a few security considerations when using `window.postMessage` to communicate from the iframe's content to its parent page.

**1. Specify the target origin inside the iframe**

```javascript
// Do this
window.parent.postMessage({ type: "iframeHeight", height }, "https://parent-domain.com");}

// Avoid this
window.parent.postMessage({ type: "iframeHeight", height }, "*");}
```

Using `*` means any website could embed our iframe and intercept messages, although if we are just communicating the document height this is probably unlikely to be an issue.

**2. Validate the message's origin in the parent**
In the parent page you should verify `event.origin` matchest the expected iframe domain before trusting the data.

```javascript
window.addEventListener("message", (event) => {
  // Only accept messages from your known iframe origin
  if (event.origin !== "https://iframe-domain.com") return;

  const { type, height } = event.data;
  if (type === "iframeHeight") {
    document.getElementById("my-iframe").style.height = `${height}px`;
  }
});
```

This prevents an attacker from sending spoofed messages from another site.

**3. Validate data types to ensure the data is well formed and safe to use**

```javascript
if (typeof event.data.height === "number") {
  // safe to use
}
```
