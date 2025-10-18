<!--
Sync Impact Report:
Version change: 1.0.0 → 1.0.0 (initial creation)
Modified principles: N/A (initial creation)
Added sections: Core Principles, React Native Standards, Development Workflow, Governance
Removed sections: N/A (initial creation)
Templates requiring updates: ✅ plan-template.md, ✅ spec-template.md, ✅ tasks-template.md
Follow-up TODOs: None
-->

# Social Studio Dashboard Constitution

## Core Principles

### I. Mobile-First Architecture
Every feature MUST be designed for mobile-first experience; React Native components must be responsive and touch-optimized; Cross-platform compatibility (iOS/Android/Web) is mandatory; Performance optimization for mobile devices is non-negotiable.

### II. Expo Ecosystem Integration
MUST leverage official Expo SDK features and APIs; Use Expo Router for navigation; Implement Expo's asset system for images and fonts; Utilize Expo's push notification system; Secure sensitive data with Expo's SecureStore; Deploy updates using Expo's OTA mechanism.

### III. TypeScript-First Development
All code MUST be written in TypeScript with strict type checking; No `any` types allowed without explicit justification; Interfaces must be defined for all data structures; Type safety is non-negotiable for maintainability and developer experience.

### IV. Component-Driven Development
Components MUST be functional with React hooks; Reusable components in dedicated files; Props interfaces must be explicitly typed; Components must be independently testable; Follow React Native best practices for component lifecycle.

### V. NativeWind Styling Standards
MUST use NativeWind for all styling; Follow Tailwind CSS utility-first approach; Maintain consistent design system; Responsive design patterns for mobile/tablet; No inline styles except for dynamic values; Style components using NativeWind classes.

## React Native Standards

### Performance Requirements
- App startup time MUST be under 3 seconds on average devices
- Screen transitions MUST be smooth (60fps)
- Memory usage MUST stay under 100MB for typical usage
- Bundle size MUST be optimized for OTA updates
- Images MUST be optimized and lazy-loaded

### Testing Discipline
- Unit tests for all utility functions and hooks
- Component tests for UI components
- Integration tests for user flows
- E2E tests for critical user journeys
- Test coverage MUST be above 80% for core functionality

### Security & Data Protection
- All API calls MUST use HTTPS
- Sensitive data MUST be stored in Expo SecureStore
- User authentication MUST use secure tokens
- API keys MUST be environment variables
- Data validation MUST use Zod schemas

## Development Workflow

### Code Organization
- Follow the established folder structure: `app/`, `src/`, `assets/`
- Components in `src/components/`
- Screens in `app/` (Expo Router structure)
- Utilities in `src/utils/`
- Hooks in `src/hooks/`
- Services in `src/services/`

### Git Workflow
- Feature branches MUST be created for all development
- Commits MUST be atomic and descriptive
- Pull requests MUST include tests and documentation
- Code review is mandatory before merging
- Use conventional commit messages

### Quality Gates
- All code MUST pass ESLint checks
- TypeScript compilation MUST succeed without errors
- Tests MUST pass before merging
- Performance benchmarks MUST be met
- Security scan MUST pass

## Governance

This constitution supersedes all other development practices. Amendments require:
1. Documentation of the proposed change
2. Team consensus on the modification
3. Update to all dependent templates
4. Migration plan for existing code

All PRs and reviews MUST verify compliance with these principles. Complexity must be justified with clear rationale. Use `.cursor/rules/` for runtime development guidance.

**Version**: 1.0.0 | **Ratified**: 2025-01-27 | **Last Amended**: 2025-01-27