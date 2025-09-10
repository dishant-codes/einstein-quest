# KBE 2025 Registration Demo

A beautiful, interactive frontend demo of the Kaun Banega Einstein (KBE) competition registration system.

## 🌟 Features

- **Three-Step Registration Flow**:
  1. **School Registration** - Register educational institutions
  2. **Mentor Registration** - Teachers/mentors register with school codes
  3. **Candidate Registration** - Students register with mentor codes

- **Modern UI/UX**:
  - Clean, responsive design with Tailwind CSS
  - Smooth animations and transitions
  - Form validation and error handling
  - Toast notifications for user feedback

- **Demo Mode**:
  - Generates realistic sample codes (SCH####, MEN####, KBE2025######)
  - Simulates form processing with loading states
  - No backend required - perfect for demonstrations

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` (or the port shown in terminal)

## 📋 Registration Flow

### 1. School Registration
- Register your school/institution
- Receive a **School Code** (e.g., SCH1234)
- Required for mentor registrations

### 2. Mentor Registration
- Teachers register using the School Code
- Receive a **Mentor Code** (e.g., MEN5678)
- Required for candidate registrations

### 3. Candidate Registration
- Students register using the Mentor Code
- Receive a **Seat Number** (e.g., KBE2025123456)
- Generates hall ticket information

## 🎯 Demo Features

- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Simulated processing time with spinner indicators
- **Success Notifications**: Toast messages with generated codes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Clean Interface**: Modern design with clear step-by-step flow

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast development server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - High-quality, accessible component library
- **React Hook Form** - Efficient form handling
- **Lucide React** - Beautiful icons

## 📁 Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/ui/     # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom React hooks
│   │   └── lib/               # Utility functions
│   └── public/                # Static assets
├── package.json
└── README.md
```

## 🎨 UI Components

The project uses a comprehensive set of modern UI components:

- **Forms**: Input, Textarea, Select, Checkbox, Radio buttons
- **Layout**: Cards, Tabs, Separators, Badges
- **Feedback**: Toast notifications, Loading spinners
- **Navigation**: Responsive tabs for registration steps

## 📱 Responsive Design

- **Desktop**: Full layout with side-by-side forms
- **Tablet**: Optimized spacing and component sizing
- **Mobile**: Stacked layout with touch-friendly controls

## 🌈 Demo Data

The system generates realistic demo data:

- **School Codes**: SCH0001, SCH0002, etc.
- **Mentor Codes**: MEN0001, MEN0002, etc.
- **Seat Numbers**: KBE2025000001, KBE2025000002, etc.

## 🚀 Deployment

### GitHub Pages
```bash
npm run deploy
```

### Netlify/Vercel
Simply connect your repository and deploy automatically.

## 🎓 Educational Use

Perfect for:
- **UI/UX Demonstrations**: Showcase modern web development practices
- **Form Design Examples**: Learn advanced form handling techniques
- **React Learning**: Study modern React patterns and component design
- **Design System**: Example of consistent, accessible component library

## 📝 Customization

Easy to customize:
- Update colors in `tailwind.config.ts`
- Modify form fields in registration components
- Add new steps or validation rules
- Integrate with real backend when ready

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for educational or commercial purposes.

---

**Note**: This is a demonstration version. For production use, you would need to integrate with a real backend database and authentication system.
