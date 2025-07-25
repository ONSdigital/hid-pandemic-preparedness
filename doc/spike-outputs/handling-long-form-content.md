# Handling long form content

This is the output of the [ONSPPT-74](https://anddigitaltransformation.atlassian.net/browse/ONSPPT-74) spike ticket to investigate how we would handle long form content, and to develop some content guidelines based on what is found.

There is a need for the application to show long form content, perhaps up to 250 A4 pages long. The questions this spike aims to answer are:

- If content equivalent to the length of 250 A4 pages was presented on a single page, would it load in a reasonable timeframe?
- Would long form content provide a good user experience?
- Could long form content be provided and also meet the project availability and accessibility requirements?
- Are there any technical solutions we can put in place to ensure long form content can be presented effectively?

## How "big" is a 250 page document?

The project document [Pandemic Preparedness Toolkit: Toolkit Outline and Structural Plan](https://drive.google.com/file/d/1li-abNDX_wmydXV_K-VddHFtC9lHXtb_/view?usp=drive_link) is a 218 page pdf. It contains text but also includes images and tables so seems representative of a large document that would be a resource provided by the application. This document has the following attributes:

- 218 pages
- 44,311 words in total including headings, captions etc
- 5 images
- An estimated 25 tables of data
- 1.6 MB file size

## A representative html file

The high-level architecture choice of building the application as a static site, and using the astro frontend framework, would result in a single html page containing this content. The content may be broken up into different sections, or shown/hidden depending on user interaction, to improve the user experience when viewing the content.

As part of this spike, a "representative" html file was created with a similar word count to the project document described above. The content was split into multiple paragraphs with images and bulletted lists. This html file had the following attributes:

- 36,325 lines of code
- 45,009 words in total not including html tags
- 8,101 individual paragraphs
- 2.7 MB file size

The form of this document does not provide a good user experience as it is very hard to navigate, but it provides a useful indication of the size of an html equivalent if a large document was rendered in full on a single page.

## What does "low bandwidth" mean?

Average broadband connection speeds for the four project partner countries according to data obtained from [statistica.com](https://www.statista.com/) are given in the table below.

| Country                                                                                              | Average broadband connection speed (Mbit/s) |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [Argentina](https://www.statista.com/outlook/co/digital-connectivity-indicators/argentina)           | 56.12                                       |
| [Malawi](https://www.statista.com/outlook/co/digital-connectivity-indicators/malawi)                 | 10.52                                       |
| [Nepal](https://www.statista.com/outlook/co/digital-connectivity-indicators/nepal)                   | 25.36                                       |
| [United Kingdom](https://www.statista.com/outlook/co/digital-connectivity-indicators/united-kingdom) | 116.10                                      |

This gives us a "worst-case" connection speed across the four project partner countries of 10.5 Mbit/s which we will use as a definition of a "low-bandwidth" connection for this project.

## How "big" is a median web page?

A web page consists of html, text, styling scripts, images and other content. To render this content using a browser all of this content must be transferred over the network from the server where the page is stored or generated and the users device. The total size of this data transferred is known as the "page weight". The 2025 median page weights for desktop and mobile pages as published by [httparchive.org](https://httparchive.org/reports/page-weight#bytesTotal) are given in the table below. The time to load a page with this page weight using our "low-bandwidth" speed is also given.

| Platform | Median page weight (MB) | Median page weight (Mbits) | Estimated time to load with "low-bandwidth" connection (seconds) |
| -------- | ----------------------- | -------------------------- | ---------------------------------------------------------------- |
| Desktop  | 2.86                    | 22.88                      | 2.17                                                             |
| Mobile   | 2.56                    | 20.48                      | 1.95                                                             |

## How "fast" is "fast enough"?

A general goal of ["under a second"](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_long_is_too_long) is often given as an optimal page load time, but this is rarely achieved in practice. 2025 median values for speeds to load various content of a web page are published by [httparchive.org](https://httparchive.org/reports/loading-speed).

- **First contentful paint (FCP)** the number of seconds from the time the navigation has started until the page's primary content appears on the screen
- **DOMContentLoaded** the number of seconds taken until all html has been parsed and all styling scripts have been loaded, excluding resources such as images
- **onLoad** the number number of seconds taken until everything on the page has loaded including all resources such as images

The 2025 median values for these different metrics are given in the table below.

| Platform | Time to FCP (seconds) | Time to DOMContentLoaded (seconds) | Time to onLoad (seconds) |
| -------- | --------------------- | ---------------------------------- | ------------------------ |
| Desktop  | 2.0                   | 3.0                                | 4.9                      |
| Mobile   | 3.2                   | 7.4                                | 8.0                      |

Any page load time of over 3 seconds is generally accepted to be a poor user experience and should be avoided. However this doesn't mean that total times to load all content needs to meet this time. As long as primary content is loaded quickly, images can be loaded in the background to provide a good user experience even if the total time to `onLoad` is significantly higher.

## Recommendations

### Aim for a maximum page weight of 3.35MB

Using the values for acceptable load times along with our "low-bandwidth" speed definition we can calculate what a maximum page weight should be for the project to ensure a good user experience.

- The time to FCP should be 2.0 seconds. Using our "low-bandwidth" speed this would allow a maximum of 2.65 MB of content to load.
- The time to DOMContentLoaded should be 3.0 seconds. Again using our "low-bandwidth" speed this would allow a maximum of 1.31 MB of assets excluding deferred resources (e.g html, css and js scripts) to load.
- Time to onLoad should be 5.0 seconds. This would allow a total of 2.65 MB of images and other resources that can be loaded in the background to load

These are best case scenarios that assume a perfect network with no latency. To ensure we can meet these targets in the real world, the following guidelines are given in the table below.

| Resource                      | Recommended maximum weight (MB) |
| ----------------------------- | ------------------------------- |
| Content                       | 1.3                             |
| Assets excluding deferred     | 0.65                            |
| Deferred assets (e.g. images) | 1.4                             |
| **Total**                     | **3.35**                        |

It is assumed that the weight of html, css and js assets would be static across pages. Depending on the content type, the content and deferred asset weights could be flexed to meet the overal total page weight requirement.

### Minify html, css and Javascript

The time between FCP and DOMContentLoaded includes the loading of css styling and Javascript. [Minifying](https://sustainablewebdesign.org/guidelines/3-2-minify-your-html-css-and-javascript/) removes whitespace from css and js source code which does affect human readability but has no affect on machine readability. This will reduce the file size of these assets which in turn will reduce loading times.

### Image compression and alternative text

Images will form the majority of the overall weight of a page. Using the following guidelines will ensure image files are as small as possible, optimising the time to onLoad.

The [WebP](https://developers.google.com/speed/webp) image format should be used to optimise image file size. This will ensure images loaded over the network are as small as possible.

Alternative text should be provided for every image. As well as meeting accessibility requirements, this also ensures placeholder text is displayed before an image is loaded if the image is loaded lazily. It also ensures a better user experience if internet connectivity results in the inability to load images successfully.

### Use lazy loading

[Lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading) can be used to load non-critical resources and only when needed. It's a way to shorten the length of the critical rendering path, which translates into reduced page load times. In practice, this means resources will only be loaded when they are "on screen", so the whole page does not have to load before the user can start interacting with it.

Using the javascript [script type module](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading#javascript) will ensure any javascript contained within `<script>` tags with the `type="module"` attribute will have deferred loading by default.

CSS must be loaded before the browser renders any content, so it is considered a blocking resource. CSS can be split according to media types, so only CSS files applicable to the device being used or the viewport size can be loaded.

Resources contained within the `<img>` or `<iframe>` tags can be set to lazy load using the `<loading>` attribute. This instructs the browser to defer loading of images/iframes that are off-screen until the user scrolls near them. This allows non-critical resources to load only if needed, potentially speeding up initial page loads and reducing network usage.
