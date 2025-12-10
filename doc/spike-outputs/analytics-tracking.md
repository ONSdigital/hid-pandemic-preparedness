# Analytics approach

This is the output of the [ONSPPT-306](https://anddigitaltransformation.atlassian.net/browse/ONSPPT-306) spike ticket to investigate and make appropriate recommendations for analytic tracking frameworks

## Analytics tracking

Analytics tracking refers to the process of collecting and analysing user traffic across digital platforms, such as websites. By gathering data on how users interact with the website, the Analysis For Action team can then better identify trends in user behaviour for use in optimizing user experience and allocating resources into any improvements with more effectiveness

When selecting an appropriate analytics framework, it is important to consider factors such as data privacy, ease of implementation, scalability and cost. Within this project, there is an additional consideration that any framework chosen should not negatively impact the platform's performance, especially in low-bandwidth environments \[[1]\]

## Recommendation

Given that the ONS are already utilizing Google Analytics (GA) and Google Tag Manager, it is advisable to leverage these existing tools within the Analysis For Action project. Using GA would minimize implementation overheads and cover all the insights needed to build an informed overview of user-behaviour across the site.

[Google Analytics (GA)](https://developers.google.com/analytics) offers a wide range of tools, such as real-time reporting, event tracking, and customizable dashboards. In addition to this, Google Analytics is free to use for most standard web analytics needs, making it a cost-effective choice for the analytic tracking framework.

## Alternatives to Google Analytics

While Google Analytics is a comprehensive and widely-used tool, there are alternative frameworks which could be considered if GA was not adopted as the chosen solution:

[Matomo](https://matomo.org/)

- Offers greater ownership over privacy and data, with options for self-hosting
- Open source with a wide range of available plugins
- Offers real-time reporting, event tracking and customizable dashboards similar to Google Analytics
- Both free-to-use and paid options are available

[Mixpanel](https://mixpanel.com/home/)

- Offers user-focussed analytics that provide a more granular picture of user behaviour beyond pageviews and session data
- Integrated A/B testing tools
- Offers real-time reporting, event tracking and customizable dashboards similar to Google Analytics
- A variety of price plans are available, that can be adjusted depending on the expected monthly tracked users

[Plausible](https://plausible.io/)

- Offers a privacy-focussed analytics framework, where data is anonymised and no cookies nor personal data are collected
- Claims to be more lightweight compared to its competitors \[[2]\]
- Available exclusively as a paid service

[1]: ../non-functional-requirements/performance-and-reliability.md#performance-1
[2]: https://plausible.io/lightweight-web-analytics
