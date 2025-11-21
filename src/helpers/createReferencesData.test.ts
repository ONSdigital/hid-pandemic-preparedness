import type { ISbStoryData } from "storyblok-js-client";
import { describe, expect, test } from "vitest";

import type { ReferenceProps } from "@src/components/Molecules/Core/Reference/Reference.interface";

// Story contains reference data
import story from "@src/content/stories/home.json?raw";

import { createReferencesData } from "./createReferencesData";

describe("createReferencesData helper", () => {
  test("returns empty array if input story contains no content", () => {
    const emptyContentStory: ISbStoryData = {
      ...JSON.parse(story).story,
      content: {},
    };

    const references: ReferenceProps[] =
      createReferencesData(emptyContentStory);
    expect(references).toEqual([]);
  });

  test("returns empty array if input story contains no references as part of the content", () => {
    const emptyReferencesStory: ISbStoryData = {
      ...JSON.parse(story).story,
      // Just some placeholder content that doesn't include references
      content: {
        Body: [
          {
            _uid: "8a0c53ae-a462-4b4f-b550-82cdb8ddafb4",
            link: {
              id: "843daaab-ad93-455c-a8b9-97fe96bcb309",
              rel: "",
              url: "",
              title: "About the platform",
              linktype: "story",
              fieldtype: "multilink",
              cached_url: "about",
            },
            image: {
              id: 103889953934268,
              alt: "",
              name: "",
              focus: "",
              title: "",
              source: "",
              filename:
                "https://a.storyblok.com/f/287525897740819/854x523/7e271c55b4/aa-image.png",
              copyright: "",
              fieldtype: "asset",
              meta_data: {},
              is_external_url: false,
            },
            title: "What is Analysis for Action?",
            subTitle:
              "Analysis for Action is a free-to-use global platform designed for National Statistical Offices and public health stakeholders. Developed by an international team of experts, the platform provides quality assured tools, guidance, and training to strengthen preparedness and support evidence-based decision-making during emergencies, such as infectious disease outbreaks. By building sustainable capacity across five key areas, Analysis for Action strives to ensure that countries are better equipped to respond effectively and confidently when it matters most.",
            component: "ImageAndText",
          },
        ],
      },
    };

    const references: ReferenceProps[] =
      createReferencesData(emptyReferencesStory);
    expect(references).toEqual([]);
  });

  test("returns array of `ReferenceProps` items if input story contains references as part of the content", () => {
    // Json story contains reference data
    const referencesStory: ISbStoryData = {
      ...JSON.parse(story).story,
    };

    const expectedReferences: ReferenceProps[] = [
      {
        _uid: "60c14c86-23a5-4301-917d-d755f5d7afd1",
        type: "",
        component: "Reference",
        websiteUrl:
          "https://archive.ourworldindata.org/20250624-125417/grapher/deaths-from-infectious-diseases.html ",
        accessedDate: "26th August 2025",
        websiteTitle:
          "Global Burden of Disease (2024)– with minor processing by Our World in Data. Deaths from infectious diseases [dataset]. In: Global Burden of Disease - Deaths and DALYs [original data]",
        websiteAuthor: "Institute for Health Metrics and Evaluation (IHME)",
        yearPublished: "2024",
        _editable:
          '\u003C!--#storyblok#{"name": "Reference", "space": "287525897740819", "uid": "60c14c86-23a5-4301-917d-d755f5d7afd1", "id": "102414283876191"}--\u003E',
      },
      {
        _uid: "d2749648-d92c-4b85-8d86-993af8a4715b",
        type: "",
        component: "Reference",
        websiteUrl: "https://data.who.int/dashboards/covid19/deaths",
        accessedDate: "26th August 2025",
        websiteTitle: "WHO COVID-19 dashboard",
        websiteAuthor: "World Health Organisation",
        yearPublished: "2025",
        _editable:
          '\u003C!--#storyblok#{"name": "Reference", "space": "287525897740819", "uid": "d2749648-d92c-4b85-8d86-993af8a4715b", "id": "102414283876191"}--\u003E',
      },
      {
        _uid: "81701d24-1567-4995-81a1-d9c08fc3016f",
        type: "",
        component: "Reference",
        websiteUrl:
          " https://www.worldbank.org/en/publication/poverty-and-shared-prosperity",
        accessedDate: "26th August 2025",
        websiteTitle: "Washington, DC: World Bank Group",
        websiteAuthor: "The World Bank Group. Poverty and Shared Prosperity",
        yearPublished: "2020",
        _editable:
          '\u003C!--#storyblok#{"name": "Reference", "space": "287525897740819", "uid": "81701d24-1567-4995-81a1-d9c08fc3016f", "id": "102414283876191"}--\u003E',
      },
      {
        _uid: "6de82ce6-830c-4a8a-a138-edac384eebfc",
        type: "",
        component: "Reference",
        websiteUrl:
          "https://cdn.who.int/media/docs/default-source/consultation-rdb/prioritization-pathogens-v6final.pdf",
        accessedDate: "26th August 2025",
        websiteTitle: "Pathogens Prioritization",
        websiteAuthor: "World Health Organisation",
        yearPublished: "2019",
        _editable:
          '\u003C!--#storyblok#{"name": "Reference", "space": "287525897740819", "uid": "6de82ce6-830c-4a8a-a138-edac384eebfc", "id": "102414283876191"}--\u003E',
      },
      {
        _uid: "d9df2510-e104-41cc-92e0-0d645e5b9003",
        type: "",
        component: "Reference",
        websiteUrl:
          " https://theindependentpanel.org/wp-content/uploads/2021/05/COVID-19-Make-it-the-Last-Pandemic_final.pdf",
        accessedDate: "19th August 2025",
        websiteTitle: "COVID-19: Make it the Last Pandemic",
        websiteAuthor:
          "The Independent Panel for Pandemic Preparedness & Response",
        yearPublished: "2021",
        _editable:
          '\u003C!--#storyblok#{"name": "Reference", "space": "287525897740819", "uid": "d9df2510-e104-41cc-92e0-0d645e5b9003", "id": "102414283876191"}--\u003E',
      },
      {
        _uid: "2fad1e62-3bb9-4d77-9675-77b65c8a724d",
        type: "",
        component: "Reference",
        websiteUrl:
          "https://archive.ourworldindata.org/20250624-125417/grapher/deaths-from-infectious-diseases.html ",
        accessedDate: "26th August 2025",
        websiteTitle:
          "Global Burden of Disease (2024)– with minor processing by Our World in Data. Deaths from infectious diseases [dataset]. In: Global Burden of Disease - Deaths and DALYs [original data]",
        websiteAuthor: "Institute for Health Metrics and Evaluation (IHME)",
        yearPublished: "2024",
        _editable:
          '\u003C!--#storyblok#{"name": "Reference", "space": "287525897740819", "uid": "2fad1e62-3bb9-4d77-9675-77b65c8a724d", "id": "102414283876191"}--\u003E',
      },
      {
        _uid: "b6abf8b4-0590-482e-8993-f4055984a4fc",
        type: "",
        component: "Reference",
        websiteUrl: "https://data.who.int/dashboards/covid19/deaths",
        accessedDate: "26th August 2025",
        websiteTitle: "WHO COVID-19 dashboard",
        websiteAuthor: "World Health Organisation",
        yearPublished: "2025",
        _editable:
          '\u003C!--#storyblok#{"name": "Reference", "space": "287525897740819", "uid": "b6abf8b4-0590-482e-8993-f4055984a4fc", "id": "102414283876191"}--\u003E',
      },
      {
        _uid: "569cf90b-e8d9-4437-babe-26c3d612eacb",
        type: "",
        component: "Reference",
        websiteUrl:
          " https://www.worldbank.org/en/publication/poverty-and-shared-prosperity",
        accessedDate: "26th August 2025",
        websiteTitle: "Washington, DC: World Bank Group",
        websiteAuthor: "The World Bank Group. Poverty and Shared Prosperity",
        yearPublished: "2020",
        _editable:
          '\u003C!--#storyblok#{"name": "Reference", "space": "287525897740819", "uid": "569cf90b-e8d9-4437-babe-26c3d612eacb", "id": "102414283876191"}--\u003E',
      },
      {
        _uid: "98497269-d5c8-4f98-afc4-6045b5f159ea",
        type: "",
        component: "Reference",
        websiteUrl:
          "https://cdn.who.int/media/docs/default-source/consultation-rdb/prioritization-pathogens-v6final.pdf",
        accessedDate: "26th August 2025",
        websiteTitle: "Pathogens Prioritization",
        websiteAuthor: "World Health Organisation",
        yearPublished: "2019",
        _editable:
          '\u003C!--#storyblok#{"name": "Reference", "space": "287525897740819", "uid": "98497269-d5c8-4f98-afc4-6045b5f159ea", "id": "102414283876191"}--\u003E',
      },
      {
        _uid: "03b7c24c-c82e-4513-a567-1680f1911c5e",
        type: "",
        component: "Reference",
        websiteUrl:
          " https://theindependentpanel.org/wp-content/uploads/2021/05/COVID-19-Make-it-the-Last-Pandemic_final.pdf",
        accessedDate: "19th August 2025",
        websiteTitle: "COVID-19: Make it the Last Pandemic",
        websiteAuthor:
          "The Independent Panel for Pandemic Preparedness & Response",
        yearPublished: "2021",
        _editable:
          '\u003C!--#storyblok#{"name": "Reference", "space": "287525897740819", "uid": "03b7c24c-c82e-4513-a567-1680f1911c5e", "id": "102414283876191"}--\u003E',
      },
    ];

    const references: ReferenceProps[] = createReferencesData(referencesStory);
    expect(references).toEqual(expectedReferences);
  });
});
