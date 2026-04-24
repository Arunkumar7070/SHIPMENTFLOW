# CourierTrack Frontend

React + TypeScript + Vite + TailwindCSS frontend for the CourierTrack courier management system.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/       # Layout components (Navbar, Layout)
│   └── ui/           # Reusable UI components
├── pages/            # Page components
├── lib/              # API client and utilities
├── store/            # Zustand state management
├── App.tsx           # Main app component
└── main.tsx          # Entry point
```

## 🔑 Default Login Credentials

**Admin:**
- Email: admin@courier.local
- Password: admin123

**Driver:**
- Email: driver@courier.local
- Password: driver123

**Customer:**
- Email: customer@courier.local
- Password: customer123

## 🛠️ Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Routing
- **Zustand** - State management
- **TanStack Query** - Server state
- **Axios** - HTTP client
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## 📡 API Integration

The frontend proxies API requests to the backend:
- Development: `http://localhost:8000`
- Docker: `http://backend:8000`

Configure in `vite.config.ts`

## 🎨 Styling

Using TailwindCSS utility classes. Configuration in:
- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles and Tailwind imports

## 🔄 State Management

- **Auth State**: Zustand store in `src/store/authStore.ts`
- **Server State**: TanStack Query for API data
- **Local Storage**: JWT token persistence
