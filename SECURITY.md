# Security Policy

Bitcoin For The Arts, Inc. takes the security of our software, donation infrastructure, and community seriously. If you discover a security vulnerability, please follow the responsible disclosure process below.

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest (main branch) | Yes |
| Older releases | Best effort |

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, report them privately via one of the following methods:

1. **Email:** hello@bitcoinforthearts.org with the subject line `[SECURITY]`
2. **GitHub Security Advisories:** Use the "Report a vulnerability" button in the Security tab of this repository (if enabled)

### What to Include

- A description of the vulnerability
- Steps to reproduce the issue
- The potential impact (e.g., data exposure, fund theft, XSS)
- Any suggested remediation (optional but appreciated)

### Response Timeline

- **Acknowledgement:** Within 48 hours of your report
- **Initial assessment:** Within 5 business days
- **Resolution target:** Depends on severity; critical issues are prioritized immediately

## Security Best Practices for Contributors

- Never commit secrets, API keys, wallet private keys, or `.env` files
- Use environment variables for all sensitive configuration
- Follow the principle of least privilege in API routes and admin endpoints
- Validate and sanitize all user inputs
- Keep dependencies up to date

## Donation & Wallet Security

- Public donation addresses are for **receiving only**; private keys are never stored in this repository
- The HODL Vault uses a multi-signature setup (3-of-5) managed offline
- Treasury information is published for transparency; wallet private keys are never accessible through any code or configuration in this repository
- BTCPay Server integration uses invoice-based flows; no private keys are handled by the website

## Scope

This security policy covers:
- The Bitcoin For The Arts website and its source code
- API endpoints (contact, grants, donations, volunteer, etc.)
- Build and deployment configurations
- Third-party integrations (BTCPay, Resend, MongoDB)

Out of scope:
- Third-party services not maintained by Bitcoin For The Arts
- Social engineering attacks against individual team members
- Issues in dependencies that have already been publicly disclosed (please still let us know so we can update)

## Recognition

We appreciate security researchers who help keep Bitcoin For The Arts safe. With your permission, we will acknowledge your contribution in our release notes.

Thank you for helping protect sovereign creators and their supporters.
