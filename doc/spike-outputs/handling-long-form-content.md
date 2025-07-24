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
