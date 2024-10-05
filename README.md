# Checklist app

A simple task checklist application allows users to manage their tasks efficiently with a clean and intuitive interface.

## Features

- Add new tasks to the checklist
- Mark tasks as completed
- Remove tasks from the list
- Clear the task list by long pressing O in the title
- Filter tasks based on their status (All, Active, Done)
- Sort tasks by dragging and dropping in the list
- Progressive Web App (PWA) support – install the app on your device for offline access and a native app experience

## Live Demo

You can view the live demo of this project on GitHub Pages: [GitHub Pages Link](https://temmmus.github.io/checklist)

## CI/CD

This project is set up with a CI/CD pipeline using **GitHub Actions**. Every time changes are pushed to the repository or a pull request is merged into the `main` branch, the following steps are automatically triggered:

1. The application is built.
2. End-to-end (e2e) tests are run using **Playwright** to ensure the functionality of the application.
3. If the tests pass, the application is deployed to GitHub Pages.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/temmmus/checklist.git
   ```
2. Navigate to the project directory:
   ```bash
   cd checklist
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
    npm run dev
   ```
5. Open your browser and go to link from console.

## Build and Deployment

To create a production build:

```bash
npm run build
```

To deploy the app (includes building, running tests and deploying to GitHub Pages):

```bash
npm run deploy
```

## Testing

This project includes unit tests with Vitest and end-to-end (e2e) tests with Playwright for ensuring application reliability.

Run all unit tests:

```bash
npm run test:unit
```

Run end-to-end tests in headed mode (with a visible browser window):

```bash
npm run test:e2e:dev
```

## Technologies

- **[Vue.js](https://vuejs.org/)**: A progressive JavaScript framework used to build the user interface.
- **[TypeScript](https://www.typescriptlang.org/)**: A superset of JavaScript that adds static types.
- **[Vite](https://vitejs.dev/)**: A build tool and development server that provides fast hot module replacement.
- **[Vitest](https://vitest.dev/)**: A unit testing framework optimized for Vite.
- **[Playwright](https://playwright.dev/)**: A framework for end-to-end testing that supports multiple browsers.
- **[HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)**: Markup language for structuring web pages.
- **[CSS](https://www.w3.org/Style/CSS/)**: Stylesheet language for styling web pages.
