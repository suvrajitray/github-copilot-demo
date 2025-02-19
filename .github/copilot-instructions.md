# GitHub Copilot Instructions for React & Node.js Project

## Project Overview

This is a **full-stack web application** built using:

- **Frontend**: React (with Hooks, Context API/Redux, TypeScript), styled with TailwindCSS.
- **Backend**: Node.js with Express.js and a database (Firebase).
- **Development Tools**: ESLint, Prettier, Jest for unit testing.
- **Style Guide**: **Follow Airbnb JavaScript & React Style Guide**.

---

## General Guidelines

✅ **Follow Airbnb JavaScript Style Guide** ([Reference](https://github.com/airbnb/javascript)).
✅ Use **ESLint with Airbnb rules** for code formatting and linting.
✅ Prefer **functional components** over class components in React.
✅ Ensure **type safety** with **TypeScript (if applicable)**.
✅ Use **async/await** for handling asynchronous operations.
✅ Enforce **single responsibility principle** for functions and components.
✅ Follow **RESTful API** design patterns in backend development.
✅ Write **unit and integration tests using Jest ** instead of Jasmine.

---

## Unit Testing with Jest

- **Use Jest for unit testing** (`npm install --save-dev Jest`).
- Test **React components, hooks, and API endpoints**.
- Place test files in the **`__tests__` directory** or use `.spec.js`/`.spec.ts` naming convention.
- Use **spyOn** to mock function calls.
- Always use **describe, it, beforeEach, and expect** for structuring tests.
- Ensure **100% test coverage for critical business logic**.

## AI-Assisted Code Generation Guidelines

### ✅ Copilot should:

- Follow **Airbnb JavaScript & React Style Guide**.
- Generate **modular, reusable, and optimized** code snippets.
- Follow **ESLint rules** and avoid anti-patterns.
- Suggest **meaningful comments and docstrings**.
- Use **React Hooks, functional components, and async/await**.
- Ensure **performance optimization** by suggesting best practices for:
  - Lazy loading
  - Code splitting
  - Efficient state management
- Generate **unit tests using Jest**, following the given project structure.
- Use **TypeScript types and interfaces** when applicable.
- Prioritize **security best practices**, such as:
  - Avoiding hardcoded secrets
  - Implementing input validation
  - Using secure authentication methods (e.g., JWT)

### ❌ Copilot should avoid:

- Hardcoded values, API keys, or credentials.
- Generating redundant or unnecessary code.
- Writing inline styles instead of using proper CSS or utility classes.
- Ignoring existing project structures, folder conventions, or architectural patterns.
- Suggesting deprecated or outdated methods.
- Producing large, monolithic components instead of breaking them into smaller, reusable parts.
- Writing tests with Jasmine instead of the required **Jest** framework.

---

### 🔹 Example: Correct Code Suggestion

```jsx
// ✅ Correct: Copilot should suggest this modular, reusable React component
const Button = ({ label, onClick }) => (
  <button
    className="px-4 py-2 bg-blue-500 text-white rounded"
    onClick={onClick}
  >
    {label}
  </button>
)

export default Button
```

```jsx
// ❌ Incorrect: Copilot should avoid inline styles and non-reusable components
const Button = ({ text, handler }) => (
  <button
    style={{ backgroundColor: "blue", color: "white", padding: "10px" }}
    onClick={handler}
  >
    {text}
  </button>
)
```

## Security Best Practices

Ensuring security is a top priority in both frontend and backend development. Follow these best practices to protect the application from vulnerabilities.

### 🔒 General Security Guidelines

✅ Never commit **API keys**, **database credentials**, or **secrets** to the repository.
✅ Use **environment variables** (`.env`) and load them with `dotenv`.
✅ Keep dependencies updated to avoid security vulnerabilities.
✅ Regularly audit security with `npm audit` or `yarn audit`.
