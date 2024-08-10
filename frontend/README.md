```bash
npx create-react-app .
npm install -D tailwindcss
npx tailwindcss init
```

```bash
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```bash
npm install react-router-dom
npm install axios
```

## Exchange Rate API : https://app.exchangerate-api.com/dashboard  