# Responsive Implementation Guide

## Overview
This guide documents the responsive design patterns and best practices implemented in the NestLancer application.

## Design System

### Breakpoints
```typescript
// From theme.config.ts
breakpoints: {
  values: {
    xs: 0,      // Mobile
    sm: 600,    // Tablet Portrait
    md: 900,    // Tablet Landscape / Small Desktop
    lg: 1200,   // Desktop
    xl: 1536,   // Large Desktop
  },
}
```

### Layout Constants
```typescript
// From layout.constants.ts
export const DRAWER_WIDTH = 240;
```

## Responsive Patterns

### 1. Spacing Patterns

#### Container Padding
```typescript
sx={{ 
  px: { xs: 2, md: 0 },  // Mobile padding, no padding on desktop
  py: { xs: 4, md: 6 }   // Responsive vertical padding
}}
```

#### Grid Spacing
```typescript
sx={{ 
  spacing: { xs: 2, md: 4 }  // Tighter spacing on mobile
}}
```

#### Margin Patterns
```typescript
sx={{ 
  mb: { xs: 3, md: 4 },      // Responsive bottom margin
  mt: { xs: 2, md: 0 }       // Mobile top margin, none on desktop
}}
```

### 2. Typography Scaling

#### Responsive Font Sizes
```typescript
sx={{ 
  fontSize: { xs: '1.75rem', md: '2.125rem' }  // Scale down on mobile
}}
```

#### Heading Patterns
```typescript
// H1 - Hero titles
sx={{ fontSize: { xs: '2rem', md: '3rem' } }}

// H2 - Section titles  
sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}

// H3 - Subsection titles
sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' } }}
```

### 3. Layout Patterns

#### Grid Responsiveness
```typescript
// Stats cards: 1 column (xs), 2 columns (sm), 4 columns (md+)
<Grid item xs={12} sm={6} md={3}>

// Features: 1 column (xs), 2 columns (sm), 3 columns (md+)
<Grid item xs={12} sm={6} md={4}>

// Content: Full width (xs-sm), 2/3 width (md+)
<Grid item xs={12} md={8}>
```

#### Flexbox Patterns
```typescript
// Button groups with wrapping
sx={{ 
  display: 'flex', 
  gap: 2, 
  justifyContent: 'center', 
  flexWrap: 'wrap',
  rowGap: 2  // Ensure proper spacing when wrapping
}}
```

### 4. Component Patterns

#### Drawer Responsiveness
```typescript
// Layout component
const isMobile = useMediaQuery(theme.breakpoints.down('md'));
const [mobileOpen, setMobileOpen] = useState(false);

// Drawer variant
variant={isMobile ? 'temporary' : 'permanent'}

// Content margin
sx={{ ml: { md: DRAWER_WIDTH } }}

// AppBar width
sx={{ 
  width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
  ml: { md: DRAWER_WIDTH }
}}
```

#### Navigation Patterns
```typescript
// Mobile hamburger menu
{isMobile ? (
  <>
    <ThemeToggle />
    <IconButton onClick={handleMenuOpen}>
      <MenuIcon />
    </IconButton>
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
      {navItems.map(item => (
        <MenuItem component={RouterLink} to={item.path}>
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  </>
) : (
  // Desktop navigation
  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
    {navItems.map(item => (
      <Button component={RouterLink} to={item.path}>
        {item.label}
      </Button>
    ))}
    <ThemeToggle />
  </Box>
)}
```

### 5. Data Table Patterns

#### Horizontal Scroll
```typescript
<Box sx={{ overflowX: 'auto' }}>
  <TableContainer>
    <Table stickyHeader>
      {/* Table content */}
    </Table>
  </TableContainer>
</Box>
```

#### Responsive Columns
```typescript
interface Column<T> {
  id: keyof T;
  label: string;
  hiddenBreakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

// Filter columns based on breakpoint
const visibleColumns = columns.filter(column => {
  if (!column.hiddenBreakpoint) return true;
  const breakpointIndex = ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(column.hiddenBreakpoint);
  const currentBreakpointIndex = isMobile ? 0 : 1;
  return currentBreakpointIndex >= breakpointIndex;
});
```

## Implementation Guidelines

### 1. Mobile-First Approach
- Start with mobile styles as the base
- Use `min-width` media queries for larger screens
- Progressive enhancement for desktop features

### 2. Touch-Friendly Design
- Minimum 44px touch targets
- Adequate spacing between interactive elements
- Consider thumb reach zones on mobile

### 3. Performance Considerations
- Use `useMediaQuery` efficiently
- Avoid unnecessary re-renders on window resize
- Optimize images for different screen densities

### 4. Accessibility
- Ensure keyboard navigation works on all breakpoints
- Maintain focus management in responsive components
- Test with screen readers on different devices

## Common Anti-Patterns to Avoid

### 1. Fixed Dimensions
```typescript
// ❌ Bad - Fixed width breaks on mobile
sx={{ width: 300 }}

// ✅ Good - Responsive width
sx={{ width: { xs: '100%', md: 300 } }}
```

### 2. Hard-coded Breakpoints
```typescript
// ❌ Bad - Hard-coded pixel values
sx={{ '@media (max-width: 768px)': { display: 'none' } }}

// ✅ Good - Theme breakpoints
sx={{ display: { xs: 'none', md: 'block' } }}
```

### 3. Non-responsive Typography
```typescript
// ❌ Bad - Fixed font size
sx={{ fontSize: '2rem' }}

// ✅ Good - Responsive font size
sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
```

### 4. Overflow Issues
```typescript
// ❌ Bad - Content can overflow
sx={{ width: '100%' }}

// ✅ Good - Prevent overflow
sx={{ width: '100%', overflow: 'hidden' }}
```

## Testing Strategy

### 1. Manual Testing
- Test on actual devices when possible
- Use browser dev tools for quick checks
- Verify touch interactions on mobile

### 2. Automated Testing
- Use Playwright for responsive E2E tests
- Test critical user flows on different viewports
- Verify component behavior across breakpoints

### 3. Performance Testing
- Monitor Core Web Vitals on mobile
- Test on slow 3G connections
- Verify smooth animations and transitions

## Maintenance

### 1. Regular Updates
- Review responsive patterns quarterly
- Update breakpoints if needed
- Test new components for responsiveness

### 2. Documentation
- Keep this guide updated
- Document new patterns as they emerge
- Share learnings with the team

### 3. User Feedback
- Monitor user experience metrics
- Gather feedback on mobile usability
- Iterate based on real-world usage

## Resources

- [Material-UI Responsive Design](https://mui.com/material-ui/customization/breakpoints/)
- [Web.dev Responsive Design](https://web.dev/responsive-web-design-basics/)
- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [A List Apart - Responsive Web Design](https://alistapart.com/article/responsive-web-design/)
