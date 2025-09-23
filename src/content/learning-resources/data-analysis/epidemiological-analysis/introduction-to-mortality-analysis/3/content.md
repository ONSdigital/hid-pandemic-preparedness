# Death Registrations vs Death Occurrences

#### Definition

Mortality statistics for a given time period can be based on either the date of death occurrence or the date of death registration.

- Date of death occurrence refers to the actual date on which the death took place.
- Date of death registration refers to the date on which the death was formally registered.

The registration delay is the difference between these two dates. For example, a death registered on the same day it occurred has a delay of zero days; if registered the following day, the delay is one day.

#### Why it matters

1. Understanding the distinction between occurrence and registration dates is essential for accurate interpretation of mortality data:

- Promptly registered deaths offer a timely view of mortality trends but may not capture all deaths that occurred in the same period due to delays.
- Deaths with longer registration delays may be missing from short-term statistics, affecting how recent trends are understood.
- Registration delays can distort the timing of deaths in the data, which is particularly important when monitoring public health issues or analysing patterns over time.

2. Factors Contributing to Longer Delays

- **Coroner referrals:** Deaths that are sudden, unexplained, or involve external causes (ICD-10 Chapter 20) are referred to a coroner. These cases often require further investigation before a cause of death can be confirmed.
- **Inquests:** Certain deaths — including those related to alcohol, drugs, suicide, and infant mortality — may require a formal inquest. This process can take weeks or months, delaying registration.

**Exceptional cases:** Registration may be delayed in rare circumstances, such as:

- Deaths re-registered following legal proceedings or official reviews
- Cases where the body is not immediately recovered or is found long after death

---

#### Implications for Data Interpretation

Routine deaths, certified by a doctor, are usually registered promptly and appear quickly in registration-based statistics.

- Deaths requiring coroner involvement are less likely to be included in short-term data releases, particularly in weekly or recent monthly figures.
- This can result in underreporting in occurrence-based statistics for recent periods, especially for causes of death that are subject to investigation.

Recognising these patterns is important for analysts and public health professionals to ensure mortality data is interpreted accurately, particularly when assessing short-term trends or emerging issues.

---

#### Deaths “due to” vs “involving”

Deaths “due to” a condition

- These are deaths where the condition was identified as the underlying cause of death. This is the standard measure used in official mortality statistics.

Deaths “involving” a condition

- These include all deaths where the condition was mentioned anywhere on the death certificate, whether as the underlying cause or a contributory factor. This provides a broader measure of the impact of a condition on mortality. For example, a death “due to” COVID-19 means COVID-19 was the underlying cause. A death “involving” COVID-19 means it was mentioned on the certificate, either as the underlying cause or as a contributing condition.

---

#### Why it matters

- The distinction between underlying and contributory causes is essential for understanding the primary drivers of mortality.
- Using “due to” provides a consistent basis for comparison across time and geography.
- Using “involving” gives a fuller picture of the burden of disease, especially for conditions that may exacerbate other health issues

# Leading Cause of Death

#### Definition

A cause of death refers to the disease, condition, or injury that initiated the sequence of events leading directly to death. Causes of death are recorded on the death certificate and coded using the International Classification of Diseases.

Each death may have multiple causes recorded, but for statistical purposes, these are categorised into:

- **Underlying cause of death:** The disease or injury that initiated the train of morbid events leading directly to death. This is the main cause used in mortality statistics and international comparisons.
- Secondary (or contributory) causes of death In some countries, death certificates may also list other significant conditions that contributed to the death but were not part of the direct sequence of events leading to it.

---

#### How it is measured

- The leading cause is identified by counting the number of deaths where a specific cause was recorded as the underlying cause.
- Rankings are usually produced for the top 10 causes of death, broken down by sex, age group, and geographical area.
- Where a death certificate allows more than one cause to be listed a hierarchical classification may be used to ensure each death is counted only once, under the most specific category. For example, if a death certificate lists both pneumonia and dementia, and dementia is the underlying cause, the death is counted under dementia.

---

#### Why it matters

- Identifying the leading causes of death helps inform public health priorities, resource allocation, and policy development.
- It enables comparisons over time and between different population groups.
- It supports the monitoring of emerging health threats, and the evaluation of interventions aimed at reducing preventable mortality

---

#### Considerations

- Rankings can vary depending on the population group, age structure, and time period analysed.
- The use of broad groupings may mask variation within categories (e.g. different types of cancer).
- Changes in certification practices or ICD coding rules can affect comparability over time.

# Childhood Mortality

#### Definition

Child mortality statistics refer to deaths of children under the age of 16 years. These are broken down into the following age groups:

- **Neonatal deaths:** deaths of infants aged under 28 days.
- **Postneonatal deaths:** deaths of infants aged 28 days to under 1 year.
- **Infant deaths:** all deaths of children aged under 1 year (includes both neonatal and postneonatal).
- **Child deaths:** deaths of children aged 1 year to 15 years.

---

#### Data Sources and Coverage

Data are derived from death registrations collected through the civil registration system, linked to birth registration records.

- The statistics include live births only; stillbirths are excluded.
- Deaths of children born outside England and Wales, or not usually resident, are excluded from published rates.
- The data are compiled using information from the General Register Office (GRO) and NHS Birth Notification records, which are linked to improve data quality and completeness.

---

#### Cause of Death Classification

Causes of death are coded using the International Classification of Diseases

- The underlying cause of death is determined using World Health Organization (WHO) rules and automated coding software.

For infant deaths, causes are often grouped into categories such as:

- Congenital anomalies
- Prematurity and low birthweight
- Infections
- Sudden infant death syndrome (SIDS)
  For children aged 1 to 15, leading causes include neoplasms, external causes (such as accidents), and neurological conditions.

---

#### Why it matters

Child mortality is a key indicator of:

- Population health
- Healthcare quality
- Social and environmental conditions

Monitoring child mortality supports:

- Public health planning
- Policy development
- Targeted interventions
- International comparisons, including reporting against Sustainable Development Goals (SDGs)

---

#### Considerations

- Some deaths, particularly those involving external causes or requiring a coroner’s inquest, may be subject to registration delays.
- The linkage between birth and death records improves the ability to analyse risk factors such as gestational age, birthweight, and maternal characteristics

# Calculating Rates

#### Overview

Mortality rates are statistical measures used to quantify the frequency of deaths in a population. They are essential for understanding population health, identifying inequalities, monitoring trends over time, and informing public health policy.

Different types of rates serve different analytical purposes, and selecting the appropriate rate depends on the context, population structure, and intended use. This section outlines the key mortality rate types used in official statistics, including their definitions, formulas, advantages, limitations, and practical considerations.

# Crude Mortality Rates

#### Definition

The crude mortality rate is a basic measure of mortality that represents the total number of deaths in a population during a specified time period, divided by the total population at risk during that period. It is typically expressed per 1,000 population.

---

##### Formula

BANGFORMULA Mₖ = (dₖ / pₖ) × 1,000

---

#### Use Case

Provides a high-level snapshot of overall mortality within a population. Commonly used in public health reporting, demographic studies, and international comparisons.

**Advantages**

- Straightforward to calculate and interpret
- Useful for broad comparisons across time or regions
- Requires minimal data inputs

**Limitations**

- Does not adjust for differences in age distribution or other demographic factors
- Can be misleading when comparing populations with varying age structures (e.g., older vs. younger populations)
- Not suitable for detailed epidemiological analysis

# Age-Specific Mortality Rate

#### Definition

The number of deaths in a specific age group per 1,000 people in that age group.

#### Formula

BANGFORMULA Mₖ = (dₖ / pₖ) × 1,000

**Where:**

- Mₖ = age-specific death rate for age group k
- dₖ = deaths in age group k
- pₖ = population in age group k (typically mid-year estimates; for infants under 1 year, live births are used) = ageₖ

---

#### Use Case

Highlights mortality patterns across different age groups, helping to identify age-related health risks and inform targeted public health interventions.

**Advantages**

- Enables detailed, age-specific analysis of mortality
- Can be disaggregated by sex or other demographic variables
- Useful for identifying vulnerable age groups

**Limitations**

- Requires detailed and granular data by age
- Not suitable for summarising overall mortality across a population
- Can be affected by small population sizes in certain age groups, leading to unstable rates

# Perinatal Mortality Rate

#### Definition

The number of deaths in a specific age group per 1,000 people in that age group.

---

### Formula

BANGFORMULA Mₖ = (dₖ / pₖ) × 1,000

**Where:**

- Mₖ = age-specific death rate for age group k
- dₖ = deaths in age group k
- pₖ = population in age group k(typically mid-year estimates; for infants under 1 year, live births are used) = ageₖ

---

#### Use Case

Highlights mortality patterns across different age groups, helping to identify age-related health risks and inform targeted public health interventions.

**Advantages**

- Enables detailed, age-specific analysis of mortality
- Can be disaggregated by sex or other demographic variables
- Useful for identifying vulnerable age groups

**Limitations**

- Requires detailed and granular data by age
- Not suitable for summarising overall mortality across a population
- Can be affected by small population sizes in certain age groups, leading to unstable rates

# Years of Life Lost (YLL)

#### Definition

Years of Life Lost (YLL) quantifies the impact of premature mortality by estimating the number of years lost due to deaths occurring before a defined age threshold (commonly age 75). It reflects the burden of early death from specific causes and is a key component of burden of disease metrics.

---

##### Formula

BANGFORMULA YLL = Σ (aᵢ × dᵢ)

**Where:**

- dᵢ = number of deaths in age group i
- aᵢ = age i + 0.5

---

#### Use Case

Used to highlight the burden of early death from specific causes, supporting comparisons across diseases and informing public health priorities.

**Notes**

- From 2023, YLL is calculated for ages 1 to 74.
- Excludes deaths under 1 year and at high ages where cause may be uncertain

# Mean Age at Death

#### Definition

An indicator of premature mortality, calculated as the average age at which deaths occur. It provides a summary measure of longevity and helps contextualise the burden of mortality across age groups.

---

##### Formula

BANGFORMULA Mean age at death = (Σ (aᵢ × dᵢ)) / d

**Where:**

- aᵢ = age i + 0.5
- dᵢ = number of deaths at age i
- d = total number of deaths

---

#### Use Case

Provides insight into overall longevity and the distribution of mortality, supporting comparisons across populations and time periods.

# Crude Rate of Years of Life Lost

#### Definition

The crude rate of Years of Life Lost (YLL) is defined as the total number of years lost due to premature mortality among individuals aged 1 to 74 years, expressed per 100,000 population within the same age range. It provides a population-level measure of the burden of early death.

---

##### Formula

BANGFORMULA Crude YLL rate = (YLLᵢ / P) × 100,000

**Where:**

- YLLᵢ = total years of life lost for individuals aged 1 to 74
- P = population aged 1 to 74

---

#### Use Case

Used to assess and compare the overall burden of premature mortality across populations, regions, or time periods.

# Potential Years of Life Lost (PYLL)

## Definition

Potential years of life lost (PYLL) is a measure of the potential number of years lost when a person dies prematurely from any cause. The basic concept of PYLL is that deaths at younger ages are weighted more heavily than those at older ages. The advantage in doing this is that deaths at younger ages may be seen as less important if cause-specific death rates were just used on their own in highlighting the burden of disease and injury, since conditions such as cancer and heart disease usually occur at older ages and have relatively high mortality rates.

To enable comparisons between areas and over time, age-standardised PYLL rates, also known as SYLL rates, are calculated. These rates represent the PYLL if the population of England and Wales had the same population structure as the 2013 European Standard Population (ESP). SYLL rates are presented as years of life lost per 100,000 population. PYLL is calculated as the sum of the mortality rate in each age group weighted by the potential number of years of life lost as indicated by remaining life expectancy for each age group. To calculate SYLL, this is then standardised to the 2013 ESP as shown in the equation:

---

##### Formula

BANGFORMULA SYLL = Σ ((dᵢ × aᵢ) / nᵢ × wᵢ)

**Where:**

- ᵢ = age group (less than 1 year, 1 to 4 years, 5 to 9 years, 10 to 14 years, ..., 85 to 89 years, and 90 years and over)
- dᵢ = number of deaths in age group ᵢ
- aᵢ = weight or average age-specific period life expectancy in age group ᵢ for a given year
- nᵢ = population in age group ᵢ
- wᵢ = number of individuals in the standard population in age group ᵢ

---

#### Use Case

Highlights the burden of early death and supports comparisons across areas and time periods.

# Life Expectancy Methods

#### Definition

Life expectancy is a summary measure of mortality that estimates the average number of additional years a person of a given age is expected to live, assuming current age-specific mortality rates remain unchanged throughout their life.
The most commonly used measure is period life expectancy, which reflects the mortality conditions of a specific time period. It does not account for future changes in mortality and should not be interpreted as a forecast.

---

#### What is a Life Table?

A life table is a demographic tool used to model the survival experience of a hypothetical population. It applies observed mortality rates to a starting population (typically 100,000 live births) and calculates how many people survive to each age, how many die, and how many years are lived at each age.

| Symbol Description | Description                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| mx                 | Central mortality rate: average number of deaths at age x divided by the average population at that age |
| qx                 | Probability of dying between age x and x+1                                                              |
| lx                 | Number of survivors to exact age x from a cohort of 100,000 live births                                 |
| dx                 | Number of deaths between age x and x+1 (dx = lx − lx+1)                                                 |
| Lx                 | Person-years lived between age x and x+1                                                                |
| Tx                 | Total person-years lived from age x onward                                                              |
| ex                 | Life expectancy at exact age x (ex = Tx / lx)                                                           |

---

#### Calculation Process

1. Start with 100,000 live births (l₀).
2. Calculate qₓ using observed mortality rates. For ages 1 and above:

BANGFORMULA qₓ = (2⋅mₓ) / (2 + mₓ)

3. Calculate dₓ:
   BANGFORMULA dₓ = qₓ ⋅ lₓ

4. Calculate lₓ:
   BANGFORMULA lₓ₊₁ = lₓ − dₓ

5. =Calculate Lₓ:
   BANGFORMULA For most ages: Lₓ = (lₓ + lₓ₊₁) / 2
   BANGFORMULA For age 0: L₀ = l₁ + a₀ ⋅ d₀

where a₀ is the average age at death in the first year of life.

6. Calculate Tₓ:
   BANGFORMULA Tₓ = ∑(from y = x to ω) Lᵧ

7. Calculate eₓ:
   BANGFORMULA eₓ = Tₓ / lₓ

---

#### Special Considerations

Infant Mortality (Age 0) Infant deaths are not evenly distributed across the first year of life. To improve accuracy, deaths are grouped into:

- Under 4 weeks
- 1–2 months
- 3–5 months
- 6–8 months
- 9-11 months

---

#### Very Old Ages (90+)

Standard population estimates become less reliable at older ages due to:

- Age misreporting
- Incomplete historical records
- Migration effects

**Example:** ONS uses two methods to estimate the population aged 90 and over within England and Wales:

- Survivor ratio method compares survival patterns over time
- Extinct cohort method uses death registrations to reconstruct the size of older cohorts

These methods are detailed in the QMI: **Estimates of the Very Old Including Centenarians.**

# Excess deaths calculations

#### Definition

Excess deaths are used to assess the total impact of events such as pandemics, seasonal illnesses, or environmental disruptions on mortality. This measure captures both direct and indirect effects, including deaths not explicitly attributed to the event in question.

It provides a more complete picture of mortality trends and is useful for:

- Monitoring public health impacts over time
- Supporting epidemiological surveillance
- Informing policy and resource allocation
- Facilitating comparisons across regions and countries

Excess deaths can be defined as the difference between observed deaths and the number of deaths that would be expected.

---

#### Methods for calculating excess deaths

The next section outlines two different methods to estimate expected deaths

---

#### Method 1: Historical Average Method

This method calculated expected deaths by taking the average number of deaths over a baseline period, typically five years. Excess deaths were then calculated as:

- Excess Deaths = Observed Deaths − Average Deaths (baseline)

**Advantages:**

- Simple and easy to interpret
- Quick to implement
- Useful for public-facing out

**Limitations:**

- Does not account for population growth or ageing
- Sensitive to the choice of baseline years
- Can produce misleading results if mortality trends have shifted

---

#### Method 2: Modelled Expected Deaths

This method outlines a statistical modelling approach to estimate expected deaths. This method accounts for long-term trends, seasonal variation, and demographic changes. It is implemented using Generalised Additive Models (GAMs), which allow for flexible, non-linear relationships between mortality and time-related covariates.

**The model includes:**

- A smooth function for time to capture long-term trends
- A seasonal component to account for regular fluctuations
- Adjustments for population size and age structure
- Exclusion of COVID-19 pandemic years (2020–2022) from the training data to avoid distortion

#### Calculation

**Let:**

- Dₜ be the observed deaths at time t
- Ēₜ be the modelled expected deaths at time t

**Then:**

- Excess Deathsₜ = Dₜ − Ēₜ

**Where:**

- f₁, f₂, f₃ are smooth functions fitted to the data
- εₜ is the error term

**Advantages:**

- Adjusts for demographic and seasonal factors
- Produces statistically robust estimates
- Includes uncertainty intervals to reflect confidence in the estimates
- Suitable for long-term and regional analysis

**Limitations:**

- Requires statistical expertise
- Less intuitive for non-technical audiences
- Sensitive to modelling assumptions and data quality

This method can be published alongside age-standardised rates and confidence intervals, to support interpretation and comparability.

Dummy data and Python code will be provided to demonstrate the implementation of the modelled method, including visual comparisons of observed and expected deaths
