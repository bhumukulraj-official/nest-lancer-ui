# 🧪 Testing Infrastructure Documentation

This document outlines the complete testing infrastructure setup for the NestLancer frontend application.

## 📋 **Testing Tools Overview**

### **1. Playwright - End-to-End Testing**

- **Purpose:** Automated browser testing for user flows
- **Coverage:** Authentication, navigation, responsive design
- **Browsers:** Chromium, Firefox, Safari, Mobile Chrome, Mobile Safari

### **2. Storybook - Component Testing**

- **Purpose:** Isolated component development and testing
- **Coverage:** All shared components with interactive stories
- **Features:** Visual testing, component documentation

### **3. Bundle Analyzer - Performance Analysis**

- **Purpose:** Bundle size analysis and optimization
- **Coverage:** Dependency analysis, size optimization
- **Output:** Interactive HTML reports

### **4. Sentry - Error Monitoring**

- **Purpose:** Production error tracking and performance monitoring
- **Coverage:** Error capture, performance tracking, session replay
- **Features:** Real-time alerts, error grouping, user context

---

## 🚀 **Quick Start Commands**

### **Development Testing**

```bash
# Start development server
npm run dev

# Run unit tests
npm run test

# Run unit tests with UI
npm run test:ui

# Run unit tests with coverage
npm run test:coverage
```

### **End-to-End Testing**

```bash
# Run E2E tests (headless)
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode
npm run test:e2e:headed

# Debug E2E tests
npm run test:e2e:debug
```

### **Component Testing**

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

### **Performance Analysis**

```bash
# Analyze bundle size
npm run analyze

# Analyze and serve results
npm run analyze:serve
```

---

## 📁 **Test Structure**

```
tests/
├── e2e/                    # End-to-end tests
│   ├── homepage.spec.ts    # Homepage tests
│   ├── auth.spec.ts       # Authentication tests
│   └── dashboard.spec.ts  # Dashboard tests (future)
│
src/
├── components/
│   └── shared/
│       └── Button/
│           └── stories/    # Storybook stories
│               └── Button.stories.tsx
│
.storybook/                 # Storybook configuration
├── main.ts
└── preview.tsx
│
playwright.config.ts        # Playwright configuration
```

---

## 🔧 **Configuration Files**

### **Playwright Configuration**

- **File:** `playwright.config.ts`
- **Features:** Multi-browser testing, mobile testing, CI integration
- **Reporters:** HTML, JSON, JUnit

### **Storybook Configuration**

- **File:** `.storybook/main.ts`
- **Features:** Vite integration, TypeScript support, addons
- **Addons:** Essentials, Interactions, Links, Onboarding

### **Bundle Analyzer**

- **Integration:** Vite plugin with conditional loading
- **Trigger:** `ANALYZE=true npm run build`
- **Output:** `dist/bundle-analysis.html`

### **Sentry Configuration**

- **File:** `src/lib/sentry.ts`
- **Features:** Error tracking, performance monitoring, session replay
- **Environment:** Development/Production configuration

---

## 📊 **Testing Strategy**

### **Unit Testing (Vitest)**

- **Target:** Hooks, utilities, pure functions
- **Coverage:** Business logic, data transformations
- **Frequency:** On every commit

### **Component Testing (Storybook)**

- **Target:** UI components in isolation
- **Coverage:** All shared components
- **Frequency:** During development

### **Integration Testing (Playwright)**

- **Target:** User workflows, API integration
- **Coverage:** Critical user paths
- **Frequency:** Before releases

### **Visual Testing (Storybook + Chromatic)**

- **Target:** UI consistency, responsive design
- **Coverage:** Component visual states
- **Frequency:** On component changes

---

## 🎯 **Test Scenarios**

### **Authentication Flow**

- [ ] User registration
- [ ] User login
- [ ] Password reset
- [ ] Email verification
- [ ] Logout functionality

### **Dashboard Functionality**

- [ ] User dashboard loading
- [ ] Admin dashboard access
- [ ] Navigation between pages
- [ ] Responsive design

### **Error Handling**

- [ ] Network errors
- [ ] Form validation
- [ ] API error responses
- [ ] Page not found

### **Performance**

- [ ] Page load times
- [ ] Bundle size limits
- [ ] Core Web Vitals
- [ ] Mobile performance

---

## 🔍 **Monitoring & Analytics**

### **Error Monitoring (Sentry)**

- **Real-time error tracking**
- **Performance monitoring**
- **User session replay**
- **Release tracking**

### **Performance Monitoring**

- **Bundle size analysis**
- **Core Web Vitals**
- **Lighthouse scores**
- **User experience metrics**

---

## 🚨 **CI/CD Integration**

### **GitHub Actions (Future)**

```yaml
# Example workflow
- name: Run Tests
  run: |
    npm run test
    npm run test:e2e
    npm run build-storybook
```

### **Quality Gates**

- [ ] All tests pass
- [ ] Coverage threshold met
- [ ] Bundle size within limits
- [ ] No critical errors

---

## 📈 **Best Practices**

### **Writing Tests**

1. **Test user behavior, not implementation**
2. **Use descriptive test names**
3. **Keep tests independent**
4. **Mock external dependencies**
5. **Test edge cases and error states**

### **Component Stories**

1. **Cover all component variants**
2. **Include interactive controls**
3. **Document component props**
4. **Test responsive behavior**
5. **Include accessibility testing**

### **E2E Tests**

1. **Test critical user journeys**
2. **Use page object pattern**
3. **Wait for elements properly**
4. **Clean up test data**
5. **Run tests in multiple browsers**

---

## 🛠️ **Troubleshooting**

### **Common Issues**

#### **Playwright Tests Failing**

- Check if dev server is running
- Verify element selectors
- Check for timing issues

#### **Storybook Not Loading**

- Clear Storybook cache
- Check component imports
- Verify TypeScript configuration

#### **Bundle Analysis Not Working**

- Ensure `ANALYZE=true` is set
- Check Vite configuration
- Verify plugin installation

#### **Sentry Not Capturing Errors**

- Check DSN configuration
- Verify environment variables
- Check network connectivity

---

## 📚 **Resources**

- [Playwright Documentation](https://playwright.dev/)
- [Storybook Documentation](https://storybook.js.org/)
- [Sentry Documentation](https://docs.sentry.io/)
- [Vite Bundle Analysis](https://vitejs.dev/guide/build.html#bundle-analyzer)

---

_Last updated: December 19, 2024_
