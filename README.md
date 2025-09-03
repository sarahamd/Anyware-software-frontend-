# Anyware Dashboard (Frontend)

A responsive React + Vite + TypeScript dashboard built with **Material UI**, Redux Toolkit, and React Router.  
This project demonstrates authentication handling with a Higher Order Component (HOC), localization setup, reusable components, and testing.

---

## ✨ Features

- 🔑 **Authentication Simulation**  
  - Login/Logout button available on the Home page.  
  - No username/password required (mock login).  
  - Dashboard is only accessible to logged-in users via a `requireAuth` Higher Order Component (HOC).  
  - Unauthenticated users are redirected back to the Home page.  

- 🎨 **Material UI Integration**  
  - Fully responsive design with Material UI components.  
  - Sidebar links change background/foreground color on hover.  

- ♻️ **Reusable Components**  
  - Components are modular and reusable across the application.  

- 🌍 **Internationalization Ready (i18n)**  
  - App prepared for translation with `react-intl`.  
  - Easy to add support for multiple languages in the future.  

- 🧪 **Testing**  
  - Unit and integration tests written using **Vitest** + **React Testing Library**.  
  - Ensures authentication logic and component rendering are verified.  

- 📱 **Responsive Layout**  
  - Works seamlessly on desktop, tablet, and mobile screens.  

---

## 🛠️ Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)  
- [Vite](https://vitejs.dev/) – Lightning-fast dev server and build tool  
- [Material UI](https://mui.com/) – UI components and responsive grid system  
- [Redux Toolkit](https://redux-toolkit.js.org/) – State management  
- [React Router v6](https://reactrouter.com/) – Navigation and routing  
- [react-intl](https://formatjs.io/docs/react-intl) – Internationalization support  
- [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) – Testing utilities  

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-org/anyware-dashboard.git
cd anyware-dashboard
npm install
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# Anyware-software-frontend-
