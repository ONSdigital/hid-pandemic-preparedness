# ADR-4: Use AWS for deploying project artifacts

## Related NFRs

[availability-1][1], [availability-2][2], [development-6][3], [performance-1][4], [performance-3][5], [security-9][6], [sustainability-1][7], [sustainability-2][8]

## Rationale

Project artifacts must be available and discoverable across multiple regions \[[1]\], \[[2]\]. Deployed artifacts must load quickly \[[4]\] and be scalable to demand \[[6]\]. This leads to the decision to use public cloud services to host project artifacts, as they provide the necessary services to meet these requirements.

AWS was chosen as the cloud services supplier as there is existing knowledge with this supplier in both the development team and wider ONS Digital Services.

[1]: ../non-functional-requirements/availability.md#availability-1
[2]: ../non-functional-requirements/availability.md#availability-2
[3]: ../non-functional-requirements/development.md#development-6
[4]: ../non-functional-requirements/performance.md#performance-1
[5]: ../non-functional-requirements/performance.md#performance-3
[6]: ../non-functional-requirements/security.md#security-9
[7]: ../non-functional-requirements/sustainability.md#sustainability-1
[8]: ../non-functional-requirements/sustainability.md#sustainability-2
