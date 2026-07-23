# Driving Test Companion — Project Specification

## Mandatory collaboration model

The developer is learning React Native and wants to write the application code
personally.

- Speak with the developer in Portuguese.
- Keep all user-facing application copy in English.
- Teach in small, testable steps.
- Explain the relevant React, React Native, TypeScript, Expo, Expo Router, and
  NativeWind concepts before moving on.
- Ask the developer to type the code, save it, and test it before presenting the
  next step.
- Do not edit application code unless the developer explicitly asks Codex to
  implement or change it.
- Codex may inspect files, run read-only checks, explain errors, and review the
  developer's changes without separate permission.
- When reviewing an error, explain its cause and guide the developer toward the
  correction. Do not silently fix it.
- Avoid delivering large feature implementations or large code blocks at once.
- Commands intended to change the project or start the app should normally be
  given to the developer to run.

## Sources of truth

Before every task:

1. Read this file completely.
2. Inspect the real files involved in the task.
3. Run `git status --short` and preserve unrelated developer changes.
4. Confirm dependency versions in `package.json` when they affect the task.
5. Before writing application code, read the exact Expo SDK 54 documentation at
   <https://docs.expo.dev/versions/v54.0.0/>.

`PROJECT_CONTEXT.md` is supporting project history. If it conflicts with the
current source code or this specification, the current source code and this file
take precedence.

## Product

Driving Test Companion is an Android and iOS application that connects learner
drivers and driving instructors in Ireland.

The planned account roles are:

```text
STUDENT
INSTRUCTOR
ADMIN
```

The MVP includes:

- student and instructor authentication;
- instructor invitations and student/instructor linking;
- driving test date and test centre;
- regular lessons, extra lessons, mock tests, and pre-test lessons;
- extra-lesson requests and approval;
- skill assessments and student progress;
- study content and quizzes;
- test-day checklist;
- Google Calendar integration and notifications.

## Technical stack

```text
Mobile: React Native + TypeScript + Expo SDK 54
Navigation: Expo Router
Styling: NativeWind 4 + Tailwind CSS 3
Gestures: React Native Gesture Handler
Animations: React Native Reanimated
Local persistence: AsyncStorage
Future backend: Java + Spring Boot
Future database: PostgreSQL
Future infrastructure: AWS
```

Use the versions installed in `package.json`. Expo dependencies must normally be
installed with:

```bash
npx expo install <package>
```

Do not upgrade `babel-preset-expo` independently from Expo SDK 54.

## Application architecture

```text
app/
├── _layout.tsx              # providers and protected root navigation
├── index.tsx                # initial redirect
├── (auth)/                  # unauthenticated screens
└── (tabs)/                  # authenticated screens

components/ui/               # reusable presentation components
contexts/                    # shared application state
hooks/                       # reusable hooks and context access
schemas/                     # Yup validation schemas
utils/                       # framework-independent helpers
```

Route groups between parentheses do not become URL segments. Authentication
guards belong in the root layout, and screen components should use the existing
context hooks instead of reading contexts directly.

## UI conventions

- Use NativeWind utility classes for ordinary styling.
- Reuse the brand tokens defined in `tailwind.config.js`.
- Reuse existing UI components before creating duplicates.
- Use `bg-white/90` for translucent backgrounds; do not add parent `opacity`
  when child content must remain opaque.
- Respect safe areas and keyboard behavior on both Android and iOS.
- Keep Hooks at the top level of React components and custom Hooks.
- Include accessibility roles and states for interactive controls when relevant.

## Validation and quality

After the developer completes a step, guide them to run the smallest relevant
check. Before considering a feature complete, verify:

```bash
npm run lint
npx tsc --noEmit
```

Also inspect `git diff` and use `git diff --check` before committing.

## Git workflow

- Use one feature branch per feature.
- Use Conventional Commits.
- Do not commit automatically unless the developer explicitly requests it.
- Do not include unrelated files in a commit.

Examples:

```text
feat(dashboard): add upcoming lesson card
fix(auth): handle invalid stored session
refactor(ui): extract lesson card component
```

## Current learning step

The upcoming-lesson dashboard milestone is complete:

1. Added the upcoming lesson section and typed lesson data.
2. Extracted the reusable upcoming lesson card.
3. Added protected navigation to the lesson details screen.
4. Passed typed lesson data through route parameters.

The next planned milestone is lesson persistence. Implement it incrementally in
a separate feature branch, starting with a typed storage model before adding
AsyncStorage.

Update this section whenever the active learning milestone changes.
