# Einstein Quest - KBE Competition Platform

A modern web application for the "Kaun Banega Einstein" (KBE) young scientist competition, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern React Frontend**: Built with React 18, TypeScript, and Vite
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Interactive Components**: Hero slider, exam registration forms, and contact forms
- **Award System**: Display of competition awards and scholarships
- **Contact System**: Contact form with validation

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Routing**: Wouter
- **State Management**: TanStack React Query
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/einstein-quest.git
cd einstein-quest
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5000](http://localhost:5000) in your browser.

## 🏗️ Build

Build the project for production:

```bash
npm run build
```

Build only the client (for GitHub Pages):

```bash
npm run build:client
```

## 🚀 Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

1. Push your code to the `main` branch
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Your site will be available at `https://yourusername.github.io/einstein-quest`

### Manual Deployment to GitHub Pages

```bash
npm run deploy
```

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions and constants
├── server/                 # Backend Express server
├── shared/                 # Shared schemas and types
└── .github/workflows/      # GitHub Actions workflows
```

## 🎯 Pages

- **Home**: Hero section, about, exam preview, awards, and quotes
- **About**: Detailed information about the competition
- **Exams**: Exam registration and information
- **Contact**: Contact form and information

## 🏆 Competition Details

The KBE (Kaun Banega Einstein) competition is designed for young scientists across different grade levels:

- **Grade I**: Classes V, VI & VII
- **Grade II**: Classes VIII, IX & X  
- **Grade III**: Classes XI & XII+

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

For questions about the competition, please visit our contact page or reach out through the provided contact information.
