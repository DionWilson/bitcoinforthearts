# Contributing to Bitcoin For The Arts

Thank you for your interest in contributing to Bitcoin For The Arts, Inc. We welcome contributions from developers, designers, writers, and anyone who supports our mission of funding sovereign creators with Bitcoin.

## Ways to Contribute

### Code & Development
- Fix bugs or improve existing features
- Build new tools for artists and donors
- Improve accessibility, performance, or security
- Write or improve documentation

### Non-Code Contributions
- Report bugs or suggest features via GitHub Issues
- Improve copy, translations, or educational materials
- Help with design, UX research, or accessibility audits
- Spread the word about Bitcoin For The Arts

### Financial Support
- Donate Bitcoin: [bitcoinforthearts.org/donate](https://bitcoinforthearts.org/donate)
- All donations are tax-deductible (501(c)(3) status pending)

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Local Development

```bash
# Clone the repository
git clone https://github.com/Bitcoin-For-The-Arts/Bitcoin-For-The-Arts.git
cd Bitcoin-For-The-Arts

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Environment Variables

Copy `.env.example` (if available) or refer to the README for the list of environment variables. Most features work without any env vars for local development.

## Submitting Changes

### Pull Request Process

1. **Fork** the repository and create a feature branch from `main`.
2. **Make your changes** with clear, descriptive commits.
3. **Test** your changes locally (`npm run build` should pass).
4. **Lint** your code (`npm run lint`).
5. **Open a Pull Request** against `main` with a clear description of what you changed and why.

### Commit Messages

Use clear, descriptive commit messages:
- `feat: Add Lightning donation support`
- `fix: Correct mobile nav overflow`
- `docs: Update grant application instructions`
- `style: Improve donation card contrast`

### Code Style

- We use TypeScript, Next.js (App Router), and Tailwind CSS.
- Follow the existing patterns in the codebase.
- Run `npm run lint` before submitting.

## Issue Guidelines

### Bug Reports
Use the **Bug Report** issue template. Include:
- Steps to reproduce
- Expected vs. actual behavior
- Browser/OS information
- Screenshots if applicable

### Feature Requests
Use the **Feature Request** issue template. Describe:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold a welcoming, inclusive, and respectful environment.

## Questions?

- Email: hello@bitcoinforthearts.org
- Website: [bitcoinforthearts.org](https://bitcoinforthearts.org)

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
