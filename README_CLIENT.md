# SafeHerHub - Client (Frontend)

This is the React-based frontend application for SafeHerHub, a comprehensive women's safety platform.

## 📋 Prerequisites

- Node.js v14 or higher
- npm v6 or higher

## 🚀 Installation

```bash
cd client
npm install
```

## 🏃 Running the Development Server

Start the React development server:

```bash
npm start
```

The application will open at `http://localhost:3000` automatically.

## 🔨 Build for Production

Create an optimized production build:

```bash
npm run build
```

## 📦 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── common/         # Common components (ErrorBoundary, Spinner)
│   ├── layout/         # Layout components (Navbar, Sidebar, Footer)
│   └── safety/         # Safety-specific components (Heatmap, Routes)
├── pages/              # Page components
│   ├── auth/           # Authentication pages (Login, Register)
│   └── [other pages]   # Dashboard, Profile, Reports, etc.
├── hooks/              # Custom React hooks (useSocket)
├── store/              # Redux store configuration
│   └── slices/         # Redux slices (auth, user, alerts, etc.)
├── App.js              # Main App component
├── index.js            # React entry point
└── index.css           # Global styles
```

## 🛠️ Available Scripts

- `npm start` - Run development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## 📚 Dependencies

- **React** - UI library
- **Redux Toolkit** - State management
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **React Google Maps API** - Map integration
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Hook Form** - Form handling

## 🔗 Backend Connection

The frontend communicates with the backend API at:
```
http://localhost:5000/api
```

## 🔧 Configuration

Environment variables can be set in a `.env` file in the client directory:

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_MAPS_KEY=your_key_here
```

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Kill process on port 3000
lsof -i:3000
kill -9 <PID>
```

### Modules not found error
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build fails
```bash
# Run with increased memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

## 📝 Development Notes

- The app uses Redux Toolkit for state management
- Real-time updates use Socket.io
- Maps functionality requires Google Maps API key
- Responsive design using Tailwind CSS

## 🚀 Deployment

For deployment, build the production version and serve the `build` folder:

```bash
npm run build
# Serve the build folder on your hosting platform
```

---

For more information about the full SafeHerHub project, see the main [README.md](../README.md)
