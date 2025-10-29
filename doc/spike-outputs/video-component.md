# Video component

This is the output of the [ONSPPT-259](https://anddigitaltransformation.atlassian.net/browse/ONSPPT-359) spike ticket to design how we can show videos as part of page content within the application.

For the purposes of this project, we assume that content videos will be included as part of CMS genenerated content as a url, and will be streamed from YouTube. In order to meet project accessibility requirements \[[1], [2]\], content videos should be provided with captions and a [transcript](https://www.w3.org/WAI/media/av/transcripts/).

## A YouTube Storyblok blok

Storyblok does not have a built-in "blok" or field to embed a video from YouTube or any other streaming service. The Storyblok docs recommonend [creating a custom blok to do this](https://www.storyblok.com/tp/add-youtube-to-headless-cms), with an associated component within the application code. This blok should include a text field that the user can enter the video url, and an asset field where the user can upload the video transcript file. The blok should be configured so it can be added to a Story on its own, or as an embedded blok as part of a RichText field. This blok should also include the following configuration parameters that can be used with the YouTube api when embedded the video as part of a component:

- autoplay: A boolean field determining whether the video should automatically start playing when the player loads. The default should be `false`
- start: An optional timefield that a user can set the time offset at which the video should begin playing
- end: An optional timefield that a user can set the time offset at which the video should stop playing

## A YouTube React component

The YouTube player can be embedded as part of a React component by simply using an [iframe HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe) and the [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference). The YouTube docs provide a simple iframe example below.

```html
<iframe
  id="ytplayer"
  type="text/html"
  width="720"
  height="405"
  src="https://www.youtube.com/embed/M7lc1UVf-VE?cc_load_policy=1&enablejsapi=1"
  frameborder="0"
  allowfullscreen
></iframe>
```

This component should include the following:

- An interface that matches the structure of the data provided by the Storyblok content API for a YouTube blok created according to the [design above](#a-youtube-storyblok-blok)
- The component should santize the input YouTube url to make sure it is a valid YouTube url, and the sanitization should remove any querystring paremeters from the provided url to ensure the configuration options specified by the interface (e.g. `autoplay` or `start`) are used consistently
- The embedded player should set the `cc_load_policy` parameter to `true` by default
- The embedded player should set the `controls` parameter to `true` by default
- The embedded player should set the `modestbranding` parameter to `true` by default
- The embedded player should set applicable parameters according to the data provided by the Storyblok content API for a YouTube blok
- The embedded player should have a minimum viewport size of 200px by 200px
- The embedded player should be typically rendered with a 16:9 aspect ration and at a size of at least 480px by 270px
- The component should include a link to download the transcript asset close to the video player

The component should be designed to be used both as part of a rendered rich text field (e.g. as part of unit content) or more standalone (e.g. as a component on a list or overview page).

[1]: ../non-functional-requirements/accessibility.md#accessibility-1
[2]: ../non-functional-requirements/content.md#content-video-14
