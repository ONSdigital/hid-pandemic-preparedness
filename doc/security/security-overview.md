# Security overview

This document summarises the non-functional requirements (NFRs) and architectural decisions taken related to application security.

## Security Non-Functional Requirements (NFRs)

[NFRs related to security](../non-functional-requirements/security.md) are presented as part of the application NFRs as a whole. This section provides evidence about how the application meets relevant security NFRs, with links to existing documentation or discussion around mitigations

| Id | Requirement | Compliance and/or mitigations |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | |
| [security-4](#security-4) | Reduce attack surface | Considered by making key architectural decisions around the design of the application. [ADR-6: Use a headless CMS](../architectural-decision-records/adr-6-use-a-headless-cms.md) and [ADR-7: Deploy as a static site](../architectural-decision-records/adr-7-deploy-as-a-static-site.md) ensure there attack surface is minimised. There is no personally identifiable information (PII) managed as part of the application and any user account data is managed by a third-party service. In addition to this, deploying the site as a static site using the AWS CloudFront Content Delivery Network (CDN) further ensures attack surface is minimised |
| [security-5](#security-5) | Protect management and operations environments from targeted attacks | Considered by making key architectural decisions around the design of the application. [ADR-4: Use AWS for deploying project artifacts](../architectural-decision-records/adr-4-use-aws-for-deploying-project-artifacts.md), [ADR-6: Use a headless CMS](../architectural-decision-records/adr-6-use-a-headless-cms.md) and [ADR-7: Deploy as a static site](../architectural-decision-records/adr-7-deploy-as-a-static-site.md) provide protection against targeted attacks. Deploying the site as a static site using the AWS CloudFront Content Delivery Network (CDN) provides [features to protect against network and application layer attacks](https://aws.amazon.com/cloudfront/features/#security) |
| [security-6](#security-6) | Design for easy maintenance | Considered by making key architectural decisions around the design of the application. [ADR-1: Manage project source code as public repository on ONSdigital organisation](../architectural-decision-records/adr-1-manage-project-source-code-as-public-repository-on-onsdigital-organisation.md), [ADR-2: Manage project infrastructure code in the same repository](../architectural-decision-records/adr-2-manage-project-infrastructure-code-in-the-same-repository.md), [ADR-3: Use github actions for CI/CD pipelines](../architectural-decision-records/adr-3-use-github-actions-for-cicd-pipelines.md), [ADR-5: Use Terraform v1.12.x to manage and document project infrastructure](../architectural-decision-records/adr-5-use-terraform-v112x-to-manage-and-document-project-infrastructure.md) ensure there attack surface is minimised. There is no personally identifiable information (PII) managed as part of the application and any user account data is managed by a third-party service. In addition to this, deploying the site as a static site using the AWS CloudFront Content Delivery Network (CDN) further ensures attack surface is minimised |
| [security-7](#security-7) | Make it easy for administrators to manage access control | |
| [security-8](#security-8) | Make it easy for users to do the right thing | |
| [security-9](#security-9) | Design for scalability | |
| [security-10](#security-10) | Identify where availability depends on a third party and plan for the failure of that third party | |
| [security-11](#security-11) | Don't allow arbitrary queries against your data | |
| [security-12](#security-12) | The platform should have strong cybersecurity measures, including secure HTTPS encryption and regular security updates | |

## 3. Architectural Decisions

- **Overview:** Summary of the architecture with security focus.
- **Key Decisions:**
  - Decision 1: [Description, rationale, trade-offs]
  - Decision 2: [Description, rationale, trade-offs]
- **Attack Surface Reduction:**
  - Techniques used (e.g., network segmentation, least privilege)
- **Diagrams:** Include architecture diagrams with security zones and controls.

## 4. Pipeline and Deployment Security

- **Pipeline Overview:** Description of CI/CD pipeline.
- **Security Integrations:**
  - Automated security scans (e.g., SAST, DAST)
  - Secrets management approach
  - Approval and gating mechanisms
- **Tool Selection Rationale:** Reasons for choosing specific tools or configurations.
- **Monitoring and Incident Response:** How pipeline supports security monitoring.

## 5. Summary

- Recap how the above elements collectively satisfy security NFRs.

## 6. References

- Links to relevant documentation, standards, and tools.
