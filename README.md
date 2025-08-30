# Solar Energy Portal

A modern React application for tracking and monitoring solar energy consumption with a focus on clean, sustainable energy solutions.

## Features

- **Theme Toggle**: Switch between light (solar-inspired) and dark (blockchain-inspired) themes
- **Responsive Design**: Optimized for all device sizes
- **Scroll-to-Top**: Smooth scroll functionality that appears when needed
- **TypeScript Support**: Full type safety throughout the application
- **Modern UI**: Clean, professional design with smooth animations

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **CSS Custom Properties** for theming
- **React Context** for state management
- **Google Fonts**: Orbitron (headings), Inter (body), Exo 2 (accent)

## Theme System

### Light Theme (Solar-inspired)
- Primary Solar Yellow: #FFD54F
- Accent Green (Eco): #66BB6A
- Background: #FAFAFA
- Text Primary: #212121

### Dark Theme (Blockchain-inspired)
- Primary Solar Yellow: #FFEB3B
- Accent Teal (Techy): #26C6DA
- Background: #121212
- Surface: #1E1E1E
- Text Primary: #E0E0E0

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── Header/          # Main header component
│   ├── ThemeToggle/     # Theme switching button
│   └── ScrollToTop/     # Scroll-to-top functionality
├── contexts/            # React context providers
├── hooks/              # Custom React hooks
├── styles/             # Global CSS styles and themes
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

## Components

- **Header**: Displays the portal title with Orbitron font and glowing animation
- **ThemeToggle**: Interactive button to switch between light and dark themes
- **ScrollToTop**: Appears when scrolling down, smoothly returns to top when clicked

## Accessibility

The application includes:
- Proper ARIA labels for all interactive elements
- Focus indicators for keyboard navigation
- Screen reader support
- Semantic HTML structure
