# Technology Stack - NestLancer Frontend

## 🎯 Overview
This document outlines the complete technology stack for the NestLancer frontend application, designed to work seamlessly with the NestJS backend API.

## 🏗️ Core Framework & Runtime

### **React 19+**
- **Version**: 19.1.1
- **Purpose**: Core UI framework with concurrent features
- **Key Features**: 
  - Concurrent rendering
  - Suspense for data fetching
  - Automatic batching
  - Improved hydration
  - New hooks and APIs

### **TypeScript 5+**
- **Version**: 5.9.3
- **Purpose**: Type-safe JavaScript development
- **Configuration**: Strict mode enabled
- **Benefits**: Better IDE support, compile-time error checking

## 🎨 UI Framework & Styling

### **Material-UI (MUI) v7**
- **Version**: 7.3.4
- **Purpose**: Component library and design system
- **Key Components**:
  - Data Grid for admin tables
  - Charts for analytics
  - Form controls
  - Layout components
  - Theme system
  - Enhanced accessibility

### **Emotion**
- **Version**: 11.14.0
- **Purpose**: CSS-in-JS styling solution
- **Integration**: Used with MUI for custom styling

### **React Hook Form**
- **Version**: 7.64.0
- **Purpose**: Form management and validation
- **Features**: 
  - Performance optimized
  - Built-in validation
  - TypeScript support

## ⚙️ Environment Configuration

### **Environment Variables**
- **File**: `.env.example` (template), `.env.local` (local overrides)
- **Validation**: Zod schema validation for type safety
- **Security**: Only whitelisted variables exposed to client
- **Setup**: Copy `.env.example` to `.env.local` and configure values

### **Configuration Management**
- **File**: `src/config/env.config.ts`
- **Features**: 
  - Runtime validation with Zod
  - Type-safe environment access
  - Default values for development
  - Error handling for invalid config

## 🔄 State Management

### **Zustand**
- **Version**: 5.0.8
- **Purpose**: Lightweight state management
- **Stores**:
  - Auth Store
  - User Store
  - UI Store
  - Notifications Store
  - Cache Store
  - Admin Store
  - Project Store
  - Request Store
  - Quote Store
  - Payment Store
  - Messaging Store

### **React Query (TanStack Query)**
- **Version**: 5.90.2
- **Purpose**: Server state management and caching
- **Features**:
  - Background refetching
  - Optimistic updates
  - Cache invalidation
  - Offline support

## 🛣️ Routing & Navigation

### **React Router v7**
- **Version**: 7.9.4
- **Purpose**: Client-side routing
- **Features**:
  - Data loading and mutations
  - Error boundaries
  - Route-level code splitting
  - Nested routes
  - Route guards
  - Protected routes
  - Search params and URL state
  - Modular route organization (AuthRoutes, UserRoutes, AdminRoutes)

### **React Router DOM**
- **Version**: 7.9.4
- **Purpose**: DOM bindings for React Router

## 🌐 HTTP Client & API Management

### **Axios**
- **Version**: 1.12.2
- **Purpose**: HTTP client for API requests
- **Features**:
  - Request/response interceptors
  - Automatic JSON parsing
  - Request cancellation
  - Error handling
  - Retry logic with axios-retry

### **React Query Devtools**
- **Version**: 5.90.2
- **Purpose**: Development tools for React Query

## 🔐 Authentication & Security

### **JWT Decode**
- **Version**: 3.1.2+
- **Purpose**: JWT token decoding
- **Usage**: Client-side token validation

### **Crypto-js**
- **Version**: 4.1.1+
- **Purpose**: Cryptographic functions
- **Usage**: Password hashing, data encryption

## 💳 Payment Integration

### **Razorpay React**
- **Version**: 1.3.0+
- **Purpose**: Payment gateway integration
- **Features**:
  - Payment forms
  - Payment methods
  - Receipt generation

## 📁 File Upload & Media

### **Cloudinary React**
- **Version**: 1.3.0+
- **Purpose**: Cloud-based media management
- **Features**:
  - Image upload widget
  - Image transformations
  - Media gallery

### **React Dropzone**
- **Version**: 14.2.0+
- **Purpose**: Drag and drop file uploads
- **Features**:
  - Multiple file support
  - File validation
  - Progress tracking

## 📊 Data Visualization & Charts

### **Recharts**
- **Version**: 2.7.0+
- **Purpose**: Chart library for analytics
- **Chart Types**:
  - Line charts
  - Bar charts
  - Pie charts
  - Area charts

### **React Table (TanStack Table)**
- **Version**: 8.10.0+
- **Purpose**: Advanced table functionality
- **Features**:
  - Sorting
  - Filtering
  - Pagination
  - Column resizing

## 🔔 Real-time Communication

### **Socket.io Client**
- **Version**: 4.7.0+
- **Purpose**: WebSocket communication
- **Features**:
  - Real-time messaging
  - Typing indicators
  - Connection management

## 📱 Responsive Design & Mobile

### **React Responsive**
- **Version**: 9.0.0+
- **Purpose**: Responsive design utilities
- **Features**:
  - Breakpoint detection
  - Media queries
  - Device detection

## 🧪 Testing Framework

### **Jest**
- **Version**: 29.6.0+
- **Purpose**: JavaScript testing framework
- **Features**:
  - Unit testing
  - Snapshot testing
  - Mocking

### **React Testing Library**
- **Version**: 13.4.0+
- **Purpose**: React component testing
- **Features**:
  - Component testing
  - User interaction testing
  - Accessibility testing

### **MSW (Mock Service Worker)**
- **Version**: 1.3.0+
- **Purpose**: API mocking for testing
- **Features**:
  - Request interception
  - Response mocking
  - Network simulation

## 🛠️ Development Tools

### **Vite**
- **Version**: 4.4.0+
- **Purpose**: Build tool and development server
- **Features**:
  - Fast HMR
  - Optimized builds
  - Plugin ecosystem

### **ESLint**
- **Version**: 8.47.0+
- **Purpose**: Code linting
- **Configuration**: 
  - React rules
  - TypeScript rules
  - Accessibility rules

### **Prettier**
- **Version**: 3.0.0+
- **Purpose**: Code formatting
- **Configuration**: Consistent code style

### **Husky**
- **Version**: 8.0.0+
- **Purpose**: Git hooks
- **Features**:
  - Pre-commit linting
  - Pre-push testing

## 📦 Package Management

### **npm**
- **Version**: 9.6.0+
- **Purpose**: Package management
- **Features**:
  - Dependency management
  - Script execution
  - Workspace support

## 🔍 Development & Debugging

### **React Developer Tools**
- **Purpose**: Browser extension for React debugging
- **Features**:
  - Component inspection
  - Props/state viewing
  - Performance profiling

### **Redux DevTools**
- **Purpose**: State management debugging
- **Features**:
  - State inspection
  - Action replay
  - Time travel debugging

## 📈 Analytics & Monitoring

### **Google Analytics 4**
- **Purpose**: Web analytics
- **Features**:
  - User tracking
  - Event tracking
  - Conversion tracking

### **Sentry**
- **Version**: 7.60.0+
- **Purpose**: Error monitoring and performance tracking
- **Features**:
  - Error reporting
  - Performance monitoring
  - Release tracking

## 🚀 Build & Deployment

### **Docker**
- **Purpose**: Containerization
- **Features**:
  - Consistent environments
  - Easy deployment
  - Scalability

### **Nginx**
- **Purpose**: Web server and reverse proxy
- **Features**:
  - Static file serving
  - Load balancing
  - SSL termination

## 🔧 Utility Libraries

### **Lodash**
- **Version**: 4.17.21+
- **Purpose**: Utility functions
- **Features**:
  - Array manipulation
  - Object utilities
  - String utilities

### **Date-fns**
- **Version**: 2.30.0+
- **Purpose**: Date manipulation
- **Features**:
  - Date formatting
  - Date calculations
  - Timezone handling

### **React Hot Toast**
- **Version**: 2.4.0+
- **Purpose**: Toast notifications
- **Features**:
  - Success/error messages
  - Customizable styling
  - Auto-dismiss

### **React Helmet**
- **Version**: 6.1.0+
- **Purpose**: Document head management
- **Features**:
  - SEO optimization
  - Meta tags
  - Title management

## 📋 Form Validation

### **Yup**
- **Version**: 1.2.0+
- **Purpose**: Schema validation
- **Features**:
  - Form validation
  - TypeScript support
  - Custom validators

## 🎭 Animation & Transitions

### **Framer Motion**
- **Version**: 10.16.0+
- **Purpose**: Animation library
- **Features**:
  - Page transitions
  - Component animations
  - Gesture support

## 🔒 Security & Privacy

### **DOMPurify**
- **Version**: 3.0.0+
- **Purpose**: XSS protection
- **Features**:
  - HTML sanitization
  - Safe content rendering

## 📱 PWA Support

### **Workbox**
- **Version**: 7.0.0+
- **Purpose**: Service worker management
- **Features**:
  - Offline support
  - Caching strategies
  - Background sync

## 🌍 Internationalization

### **React i18next**
- **Version**: 13.2.0+
- **Purpose**: Internationalization
- **Features**:
  - Multi-language support
  - Dynamic language switching
  - Namespace management

## 📊 Performance Monitoring

### **Web Vitals**
- **Version**: 3.4.0+
- **Purpose**: Performance metrics
- **Features**:
  - Core Web Vitals
  - Performance tracking
  - User experience metrics

## 🔄 Version Control & CI/CD

### **Git**
- **Purpose**: Version control
- **Features**:
  - Branch management
  - Commit history
  - Collaboration

### **GitHub Actions**
- **Purpose**: CI/CD pipeline
- **Features**:
  - Automated testing
  - Build automation
  - Deployment

## 📝 Documentation

### **Storybook**
- **Version**: 7.4.0+
- **Purpose**: Component documentation
- **Features**:
  - Component showcase
  - Interactive documentation
  - Design system

## 🎯 Development Environment

### **Node.js**
- **Version**: 18.17.0+
- **Purpose**: JavaScript runtime
- **Features**:
  - NPM ecosystem
  - ES modules support
  - Performance improvements

### **VS Code**
- **Purpose**: Code editor
- **Extensions**:
  - ES7+ React/Redux/React-Native snippets
  - TypeScript Importer
  - Prettier - Code formatter
  - ESLint
  - Auto Rename Tag
  - Bracket Pair Colorizer

## 📋 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API services
├── stores/             # Zustand stores
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── constants/          # Application constants
├── assets/             # Static assets
└── styles/             # Global styles
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Run Tests**
   ```bash
   npm run test
   ```

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration
- `prettier.config.js` - Prettier configuration
- `package.json` - Dependencies and scripts

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Material-UI Documentation](https://mui.com/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [React Query Documentation](https://tanstack.com/query/latest)

---

*This technology stack is designed to provide a modern, scalable, and maintainable frontend application that integrates seamlessly with the NestLancer backend API.*
