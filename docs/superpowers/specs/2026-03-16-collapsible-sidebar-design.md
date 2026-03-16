# Design: Collapsible Sidebar for Desktop

**Date:** 2026-03-16
**Status:** Draft
**Scope:** Desktop sidebar collapse/expand feature
**Task Number:** [To be determined from docs/implementation_plan_mvp.md]

---

## Overview

Enable users to collapse the sidebar to an icon-only bar on desktop view. The sidebar starts expanded and can be toggled via a button in the sidebar header. State does not persist across sessions.

---

## Requirements

### Functional Requirements

1. **Desktop collapse behavior**
   - Sidebar collapses to narrow icon-only bar (80px width)
   - Toggle button in sidebar header collapses/expands sidebar
   - Toggle button visible on desktop only (`lg:` breakpoint)

2. **Icon-only bar display**
   - Menu icons remain visible and centered
   - Menu labels hidden in collapsed state (conditionally rendered, not CSS hidden)
   - Tooltips appear on hover to show label text
   - Sign Out button becomes icon-only with tooltip
   - User email section hides completely

3. **State management**
   - Collapse state starts as `false` (expanded)
   - State does not persist (no localStorage)
   - Mobile behavior unchanged

4. **Animation & transitions**
   - Smooth CSS transition when collapsing/expanding (300ms)
   - Icons remain properly aligned throughout

### Non-Functional Requirements

- No performance degradation
- Accessibility: tooltips must be screen-reader friendly
- Mobile sidebar toggle behavior remains unchanged

---

## Architecture

### Components Affected

#### 1. `AppLayout.tsx`
- Add `isCollapsed` state for desktop collapse
- Pass `isCollapsed` and `onToggleCollapse` to `Sidebar`
- State initialized to `false`

#### 2. `Sidebar.tsx`
- Accept new props: `isCollapsed`, `onToggleCollapse`
- Render toggle button in header (desktop only)
- **Header**: Logo remains visible centered, "Soegih" text hides when collapsed
- **Navigation items**: Conditional rendering of labels based on `isCollapsed`
- **Sign Out button**: Becomes icon-only when collapsed, shows tooltip
- **User email**: Hides completely when collapsed
- Add tooltip positioning and styling with z-index management
- Update sidebar width CSS based on collapse state
- All transitions use consistent 300ms timing

### Data Flow

```
AppLayout (manages isCollapsed state)
    ↓
Sidebar (receives isCollapsed, onToggleCollapse)
    ↓
User clicks toggle button
    ↓
onToggleCollapse() → AppLayout updates state
    ↓
Sidebar re-renders with new width/layout
    ↓
CSS transition animates the change
```

---

## Component Specifications

### AppLayout.tsx

**New state:**
```tsx
const [isCollapsed, setIsCollapsed] = useState(false);
```

**Sidebar prop updates:**
```tsx
<Sidebar
  open={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
  isCollapsed={isCollapsed}
  onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
/>
```

### Sidebar.tsx

**New interface:**
```tsx
interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}
```

**Key changes:**

1. **Toggle button** (in sidebar header, desktop only)
   - Chevron icon (left/right based on collapsed state)
   - Visible only on `lg:` breakpoint
   - Click handler calls `onToggleCollapse()`

2. **Sidebar width**
   - Expanded: 256px (w-64)
   - Collapsed: 80px (w-20)
   - Smooth transition: `transition-all duration-300`

3. **Navigation items**
   - Labels wrapped in conditional: hidden when `isCollapsed`
   - Icons always visible
   - Flex layout with `justify-center` when collapsed

4. **Tooltip styling**
   - Positioned absolutely, appears on hover
   - Shows only when sidebar is collapsed
   - Tailwind `group` and `peer` utilities

---

## Layout & Styling

### Sidebar width transitions

| State | Width | Content |
|-------|-------|---------|
| Expanded | 256px | Icon + Label |
| Collapsed | 80px | Icon only (centered) |

### CSS Classes

**Sidebar container:**
- Base: `w-64 transition-all duration-300`
- Collapsed: `w-20`

**Navigation items:**
- Base: `flex items-center justify-center gap-3 px-3 py-2.5`
- Collapsed: `justify-center gap-0`

**Labels:**
- Rendered conditionally: `{!isCollapsed && <span>{label}</span>}`
- Ensures screen readers skip labels when collapsed

**Tooltips:**
- Position: `absolute left-20 top-1/2 -translate-y-1/2 z-10`
- Visibility: Rendered conditionally when `isCollapsed`
- Transition: `opacity-0 group-hover:opacity-100 transition-opacity duration-200`
- ARIA attributes: `role="tooltip"` and `aria-label` for accessibility

**Sign Out Button:**
- Base: `w-full flex items-center justify-center gap-2`
- Collapsed: `w-full flex items-center justify-center` (icon-only)
- Label hides when collapsed: `{!isCollapsed && <span>Sign Out</span>}`

**User Email Section:**
- Base: visible
- Collapsed: `hidden` (display: none)

---

## User Experience Flow

```
1. User loads page
   → Sidebar is expanded (default state)

2. Desktop user clicks chevron in sidebar header
   → Sidebar smoothly collapses to icon-only bar (300ms)

3. User hovers over icon
   → Tooltip label appears

4. User clicks chevron again
   → Sidebar smoothly expands back to full width

5. Mobile experience unaffected
   → Hamburger toggle still shows/hides sidebar overlay
```

---

## Mobile Behavior (Unchanged)

- Mobile header: hamburger toggle shows/hides sidebar overlay
- Sidebar overlay: full width, appears above content
- No collapse functionality on mobile

---

## Testing Strategy

### Unit Tests
- Sidebar component renders with `isCollapsed` prop
- Toggle button calls `onToggleCollapse` on click
- Labels hidden/shown based on `isCollapsed` (conditional render, not CSS)
- Toggle button visible on desktop (`lg:` breakpoint)
- Sign Out button text hides when collapsed
- User email section hides when collapsed
- Tooltips have `role="tooltip"` and `aria-label` attributes
- Toggle button has `aria-label="Toggle sidebar"`

### Integration Tests
- AppLayout state updates when toggle clicked
- Sidebar width changes from 256px to 80px on state change
- Mobile and desktop behavior independent
- Responsive breakpoint behavior at exactly `lg:` boundary

### Accessibility Tests
- Screen readers skip labels when collapsed (conditional rendering)
- Tooltips are screen-reader accessible (ARIA attributes)
- Toggle button is keyboard accessible

### Manual Testing
- Visual: width transition smooth (300ms)
- Hover: tooltips appear/disappear correctly and are readable
- Responsive: behavior correct at `lg:` breakpoint
- Mobile: sidebar toggle behavior unchanged
- Icon alignment: icons centered in 80px collapsed state
- Logo: remains centered, text hides when collapsed

---

## Files to Modify

1. `src/shared/components/AppLayout.tsx` — add isCollapsed state
2. `src/shared/components/Sidebar.tsx` — add toggle button, collapse logic, tooltips

---

## Acceptance Criteria

- ✅ Sidebar collapses to 80px icon-only bar on desktop
- ✅ Toggle button in sidebar header (desktop only) with chevron icon
- ✅ Smooth CSS transition (300ms) for all width/opacity changes
- ✅ Tooltips show on hover when collapsed with proper z-index
- ✅ Menu labels conditionally rendered (hidden when collapsed)
- ✅ Sign Out button becomes icon-only with tooltip when collapsed
- ✅ User email section hides completely when collapsed
- ✅ Logo remains visible and centered when collapsed
- ✅ "Soegih" text hides when collapsed
- ✅ State starts expanded, no persistence (no localStorage)
- ✅ Mobile behavior unchanged (hamburger toggle unaffected)
- ✅ Accessibility: tooltips have ARIA attributes, screen reader friendly
- ✅ All unit, integration, and accessibility tests pass
- ✅ No console errors/warnings

---
