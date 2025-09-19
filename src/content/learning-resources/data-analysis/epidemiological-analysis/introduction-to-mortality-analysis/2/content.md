# Data Quality

Quality assurance is embedded throughout the mortality data lifecycle, beginning at the point of registration and continuing through to publication. Initial checks by registrars confirm jurisdiction, informant eligibility, and the validity of the medical certificate. The Registration Online (RON) system then applies automated validations to detect inconsistencies and prompt corrections.

Once data reaches the Office for National Statistics (ONS), further validations are applied. The Life Events Data Repository (LEDR) uses over 1,000 rules to check for:

- Logical inconsistencies
- Spurious characters
- Duplicate records

ONS also works closely with the General Register Office (GRO) to resolve registration issues such as missing or duplicate deaths. These checks ensure that the data is fit for statistical processing and meets national standards for accuracy and completeness.

# Assessing Completeness

Completeness refers to the extent to which all deaths that occur are registered and included in the dataset within the expected timeframe. In England and Wales, death registration is a legal requirement, supporting near-complete coverage. However, delays—particularly those involving coroner referrals—can affect timeliness. ONS monitors these delays and applies cut-off dates to determine which deaths are included in each statistical release.

Late registrations are incorporated into future updates, and early releases are marked as provisional. Completeness also depends on accurate population estimates, which are periodically revised and must be considered when interpreting mortality trends.
To assess completeness, analysts should:

- Confirm that all legally required deaths are registered
- Monitor registration delays, especially for coroner-referred cases
- Apply cut-off rules consistently across releases
- Track and incorporate late registrations
- Use the most current population estimates for rate calculation

# Data Cleaning

Data cleaning ensures that mortality records are internally consistent, free from errors, and ready for analysis. While many of these processes are detailed in the lifecycle steps, the core activities include:

- Duplicate Removal: Identifying and removing records registered more than once or sharing the same entry number

Cause of Death Validation: Ensuring ICD-10 codes are correctly applied, with monthly checks for:

- Suicides at young ages
- Sex-specific conditions
- Compatibility with inquest conclusions
- Cross-field Consistency Checks: Verifying relationships between fields (e.g. age vs marital status, birth vs death date)
- Handling Missing Data: Imputing or deriving values from other fields to maintain analytical integrity

These cleaning activities ensure that mortality data is robust, reliable, and suitable for publication and analysis.For an example of the “Life cycle of mortality data in England and Wales” please see the Case Study.
