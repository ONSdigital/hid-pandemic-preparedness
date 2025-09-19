import { describe, it, expect } from "vitest";

import { createLearningSections } from "./createLearningSections";

const testMarkdownContent: string =
  "# Definition of Importance of Mortality Analysis\n" +
  "\n" +
  "Mortality analysis involves examining data on deaths to understand patterns, causes, and trends across populations. It includes calculating mortality rates, analysing causes of death, and interpreting life expectancy.\n" +
  "\n" +
  "## Importance\n" +
  "\n" +
  "- Provides insight into the health status of populations\n" +
  "- Identifies inequalities and emerging health issues\n" +
  "- Supports planning and evaluation of health services and interventions\n" +
  "\n" +
  "## Step-by-step\n" +
  "\n" +
  "1. Identify the population or subgroup to be analysed\n" +
  "1. Obtain death registration data from a reliable source\n" +
  "1. Apply standard methods to calculate mortality indicators\n" +
  "1. Interpret results in the context of demographic and health trends\n" +
  "\n" +
  "# Relevance and Coverage\n" +
  "\n" +
  "Mortality data plays a central role in informing health and demographic statistics. It is used to:\n" +
  "\n" +
  "- Monitor public health outcomes and identify trends over time\n" +
  "- Support the planning and delivery of health and social care services\n" +
  "- Allocate resources based on population needs and mortality patterns\n" +
  "- Conduct research into health inequalities, disease burden, and life expectancy\n" +
  "- Produce national and subnational population estimates and projections\n" +
  "- Quality assure census outputs and demographic models\n" +
  "- Report on social and demographic changes\n" +
  "- Provide timely information on public health emergencies (e.g., COVID-19)\n" +
  "- Enable detailed analysis of specific mortality topics, such as drug-related deaths or infant mortality linked to birth characteristics\n" +
  "\n" +
  "These applications contribute to both national policy development and international reporting obligations, including **Sustainable Development Goals (SDGs) and WHO health indicators.**\n" +
  "\n" +
  "## Coverage\n" +
  "\n" +
  "Mortality statistics are based on information collected during the death registration process. The data typically includes:\n" +
  "\n" +
  "- Demographic details: Age, sex, and usual residence of the deceased\n" +
  "- Event details: Date and place of death\n" +
  "  Medical information: Cause of death, coded using the International Classification of Diseases (ICD-10 or ICD-11) The coverage of mortality data is influenced by the legal and administrative framework for death registration. For example, in England and Wales, all deaths must be registered by law, ensuring high completeness.\n" +
  "\n" +
  "## Quality Considerations\n" +
  "\n" +
  "To ensure mortality data is fit for purpose, the following aspects should be assessed:\n" +
  "\n" +
  "### Completeness\n" +
  "\n" +
  "All deaths should be registered. Delays may occur in cases referred to a coroner, but these are accounted for in statistical outputs.\n" +
  "\n" +
  "### Timeliness\n" +
  "\n" +
  "Data is published regularly, with provisional and final releases. **Timeliness may vary depending on registration delays or the complexity of cause-of-death coding.**\n" +
  "\n" +
  "### Accuracy\n" +
  "\n" +
  "Causes of death are coded using ICD standards. Coding is based on the information provided by certifying doctors or coroners, and may be affected by the quality of medical certification.\n" +
  "\n" +
  "# Uses of Mortality Analysis\n" +
  "\n" +
  "Mortality analysis supports a wide range of statistical, demographic, and public health functions. It is used to:\n" +
  "\n" +
  "- Produce population estimates and projections at national and subnational levels\n" +
  "- Calculate life expectancy at birth and at various ages\n" +
  "- Quality assure census estimates and outputs\n" +
  "- Report on social and demographic trends over time\n" +
  "- Provide timely information on public health issues (e.g., the COVID-19 pandemic)\n" +
  "- Conduct health analyses to understand disease burden and health inequalities\n" +
  "- Analyse mortality by cause, including deaths from infections and drug-related causes\n" +
  "- Examine infant mortality in more detail by linking death records to birth characteristics (e.g., parental age, birthweight, multiple births)\n" +
  "\n" +
  "These uses help inform **policy, allocate resources, and monitor progress against health objectives.**\n" +
  "\n" +
  "## Step-by-step\n" +
  "\n" +
  "1. Define the purpose of the analysis (e.g., population projections, health surveillance)\n" +
  "1. Select appropriate mortality indicators and breakdowns (e.g., age, sex, cause)\n" +
  "1. Use linked datasets where available to enhance analysis (e.g., birth-death linkage for infant mortality)\n" +
  "1. Present findings in a format that supports decision-making and further research\n" +
  "\n" +
  "# Example Users\n" +
  "\n" +
  "Mortality data is used by a wide range of organisations across the public, private, and international sectors. Each group applies the data to support decision-making, planning, and monitoring activities relevant to their specific responsibilities. **The following examples indicate users of mortality data across the UK.**\n" +
  "\n" +
  "### Public Sector Users\n" +
  "\n" +
  "- Department of Health and Social Care (DHSC), the Cabinet Office, the UK Health Security Agency, and the Office for Health Improvement and\n" +
  "\n" +
  "### Disparity use mortality data to:\n" +
  "\n" +
  "- Inform health policy decisions\n" +
  "- Monitor population health\n" +
  "- Track progress against national health targets (e.g. reducing stillbirth and neonatal mortality)\n" +
  "- Devolved administrations such as the Welsh Government and Public Health Wales (PHW) use the data for regional health planning and performance monitoring.\n" +
  "\n" +
  "### Other government departments:\n" +
  "\n" +
  "- Home Office andpolice force use data on external causes of death (e.g. homicides) for crime and safety analysis.\n" +
  "- Department for Work and Pensions (DWP) uses mortality data in statistical models to estimate pensions and benefits.\n" +
  "- Local authorities use mortality data to support service planning, health needs assessments, and resource allocation at the community level.\n" +
  "\n" +
  "### Private Sector Users\n" +
  "\n" +
  "- Banks, insurance companies, and investment firms use mortality data by single year of age and region for risk modelling, underwriting, and financial forecasting.\n" +
  "\n" +
  "### International Organisations\n" +
  "\n" +
  "- World Health Organization and the United Nations (UN) Statistics Division use mortality statistics to:\n" +
  "- Monitor global health trends\n" +
  "- Track progress toward international goals such as the UN's\n" +
  "- Sustainable Development Goals.";

describe("createLearningSections", () => {
  it("parses markdown into learning sections correctly", async () => {
    const result = await createLearningSections(testMarkdownContent);

    expect(result).toHaveLength(4);

    expect(result[0]).toMatchObject({
      title: "Definition of Importance of Mortality Analysis",
    });
  });
});
