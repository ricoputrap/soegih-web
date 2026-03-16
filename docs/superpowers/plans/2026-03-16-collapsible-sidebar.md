# Collapsible Sidebar Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable users to collapse the desktop sidebar to an icon-only bar (80px) with tooltips, while keeping mobile behavior unchanged.

**Architecture:** Manage collapse state in `AppLayout`, pass to `Sidebar` component. Toggle button in sidebar header (desktop only) triggers collapse/expand. Labels, Sign Out text, and user email hide conditionally when collapsed. Smooth 300ms CSS transition on width and opacity changes. All tooltips accessible with ARIA attributes.

**Tech Stack:** React, TypeScript, Tailwind CSS, TanStack Router

---

## File Structure

**Files to Modify:**
1. `src/shared/components/AppLayout.tsx`
   - Add `isCollapsed` state (boolean)
   - Pass `isCollapsed` and `onToggleCollapse` props to `Sidebar`

2. `src/shared/components/Sidebar.tsx`
   - Extend `SidebarProps` interface with `isCollapsed` and `onToggleCollapse`
   - Add toggle button in header (chevron icon, desktop only)
   - Implement conditional label rendering
   - Update Sign Out button to show icon-only when collapsed
   - Hide user email section when collapsed
   - Add tooltip positioning and ARIA attributes
   - Update sidebar width classes based on collapse state

**Tests to Add/Update:**
- `src/shared/components/__tests__/Sidebar.test.tsx` — unit tests for new behavior
- `src/shared/components/__tests__/AppLayout.test.tsx` — integration tests

---

## Chunk 1: AppLayout State Management

### Task 1: Add isCollapsed state to AppLayout

**Files:**
- Modify: `src/shared/components/AppLayout.tsx:8-14`

- [ ] **Step 1: Update AppLayout component to add isCollapsed state**

Open `src/shared/components/AppLayout.tsx` and add the new state:

```tsx
import { useState, type ReactNode } from 'react'
import { Sidebar } from './Sidebar'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)  // ADD THIS LINE

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Rest of component unchanged */}
```

- [ ] **Step 2: Verify file saves and there are no TypeScript errors**

Run: `pnpm check`
Expected: Type check passes (Sidebar component may report missing props until we update it)

- [ ] **Step 3: Commit AppLayout state changes**

```bash
git add src/shared/components/AppLayout.tsx
git commit -m "feat(layout): add isCollapsed state for desktop sidebar"
```

---

## Chunk 2: Sidebar Props and Type Updates

### Task 2: Update Sidebar component interface

**Files:**
- Modify: `src/shared/components/Sidebar.tsx:12-15`

- [ ] **Step 1: Update SidebarProps interface**

Open `src/shared/components/Sidebar.tsx` and update the interface:

```tsx
interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}
```

Update the component function signature:

```tsx
export function Sidebar({ open = true, onClose, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthContext();

  // Rest of component...
}
```

- [ ] **Step 2: Verify TypeScript compilation**

Run: `pnpm check`
Expected: No TypeScript errors

- [ ] **Step 3: Commit interface changes**

```bash
git add src/shared/components/Sidebar.tsx
git commit -m "feat(sidebar): add isCollapsed and onToggleCollapse props"
```

---

## Chunk 3: Toggle Button and Header Updates

### Task 3: Add toggle button to sidebar header

**Files:**
- Modify: `src/shared/components/Sidebar.tsx:50-65`

- [ ] **Step 1: Update sidebar header with toggle button**

Replace the header section (lines 55-65) with:

```tsx
        {/* Header */}
        <div className="p-6 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center font-bold text-sm text-white shadow-md">
              S
            </div>
            {!isCollapsed && (
              <span className="text-lg font-semibold tracking-tight text-slate-900">
                Soegih
              </span>
            )}
          </div>

          {/* Toggle button - desktop only */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-200/50 transition-colors"
            aria-label="Toggle sidebar"
          >
            {isCollapsed ? (
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            )}
          </button>
        </div>
```

- [ ] **Step 2: Update sidebar container with width transition**

Update the `<aside>` opening tag (line 50-53) with collapse support:

```tsx
      <aside
        className={`flex flex-col fixed left-0 top-0 h-screen transition-all duration-300 bg-gradient-to-b from-slate-50 to-slate-100 border-r border-slate-200 shadow-sm z-50 lg:relative lg:translate-x-0 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
```

- [ ] **Step 3: Verify visual appearance**

Run: `pnpm dev`
Expected: Sidebar shows logo centered, toggle button appears on desktop, "Soegih" text visible when expanded

- [ ] **Step 4: Commit header and width changes**

```bash
git add src/shared/components/Sidebar.tsx
git commit -m "feat(sidebar): add toggle button and width transition for collapse"
```

---

## Chunk 4: Navigation Items and Labels

### Task 4: Implement conditional label rendering for navigation items

**Files:**
- Modify: `src/shared/components/Sidebar.tsx:67-90`

- [ ] **Step 1: Update navigation items with conditional labels and tooltips**

Replace the navigation section (lines 68-90) with:

```tsx
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-1">
            {mainMenuItems.map((item) => {
              const active = isActive(item.to);
              return (
                <li key={item.to} className="group relative">
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className={`flex items-center justify-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      active
                        ? "bg-teal-50 text-teal-700 font-medium border border-teal-200/60"
                        : "text-slate-700 hover:bg-slate-200/50 hover:text-slate-900"
                    } ${
                      isCollapsed ? "gap-0" : ""
                    }`}
                  >
                    <span className="text-lg w-5">{item.icon}</span>
                    {!isCollapsed && (
                      <span className="text-sm">{item.label}</span>
                    )}
                  </Link>

                  {/* Tooltip - shows only when collapsed */}
                  {isCollapsed && (
                    <div
                      role="tooltip"
                      aria-label={item.label}
                      className="absolute left-20 top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none"
                    >
                      {item.label}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
```

- [ ] **Step 2: Test in browser**

Run: `pnpm dev`
Expected:
- Labels visible when expanded
- Labels hidden when collapsed
- Icons centered in 80px width
- Tooltips appear on hover when collapsed
- Toggle works to expand/collapse

- [ ] **Step 3: Commit navigation changes**

```bash
git add src/shared/components/Sidebar.tsx
git commit -m "feat(sidebar): add conditional label rendering and tooltips"
```

---

## Chunk 5: Sign Out Button and User Email

### Task 5: Update Sign Out button and hide user email when collapsed

**Files:**
- Modify: `src/shared/components/Sidebar.tsx:92-122`

- [ ] **Step 1: Update Sign Out button to show icon-only when collapsed**

Replace the "Bottom Section" (lines 92-122) with:

```tsx
        {/* Bottom Section */}
        <div className={`border-t border-slate-200/80 p-4 bg-slate-50/50 space-y-3 transition-all duration-300 ${
          isCollapsed ? "flex flex-col items-center" : ""
        }`}>
          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            data-testid="logout-button"
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:text-red-600 transition-colors duration-200 group relative ${
              isCollapsed ? "w-auto" : "w-full"
            }`}
            aria-label={isCollapsed ? "Sign Out" : undefined}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            {!isCollapsed && <span>Sign Out</span>}

            {/* Sign Out tooltip */}
            {isCollapsed && (
              <div
                role="tooltip"
                aria-label="Sign Out"
                className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none"
              >
                Sign Out
              </div>
            )}
          </button>

          {/* User Email - hidden when collapsed */}
          {!isCollapsed && (
            <div className="px-3 py-2 text-center border-t border-slate-200/60">
              <div className="text-xs text-slate-500 font-medium">
                {user?.email}
              </div>
            </div>
          )}
        </div>
```

- [ ] **Step 2: Test in browser**

Run: `pnpm dev`
Expected:
- Sign Out button shows icon + text when expanded
- Sign Out button shows icon only when collapsed
- Sign Out tooltip appears on hover when collapsed
- User email visible when expanded
- User email hidden when collapsed

- [ ] **Step 3: Commit Sign Out and email changes**

```bash
git add src/shared/components/Sidebar.tsx
git commit -m "feat(sidebar): hide sign-out text and user email when collapsed"
```

---

## Chunk 6: Testing

### Task 6: Write unit tests for Sidebar collapse functionality

**Files:**
- Create: `src/shared/components/__tests__/Sidebar.test.tsx`

- [ ] **Step 1: Create test file for Sidebar**

```bash
touch src/shared/components/__tests__/Sidebar.test.tsx
```

- [ ] **Step 2: Write tests for collapsed state**

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { AuthProvider } from '../../context/auth-context';

describe('Sidebar', () => {
  const renderSidebar = (props = {}) => {
    return render(
      <AuthProvider>
        <BrowserRouter>
          <Sidebar
            open={true}
            onClose={jest.fn()}
            isCollapsed={false}
            onToggleCollapse={jest.fn()}
            {...props}
          />
        </BrowserRouter>
      </AuthProvider>
    );
  };

  describe('Expanded state', () => {
    it('renders menu labels when not collapsed', () => {
      renderSidebar({ isCollapsed: false });
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Wallets')).toBeInTheDocument();
    });

    it('renders user email when not collapsed', () => {
      renderSidebar({ isCollapsed: false });
      expect(screen.getByText(/example@email\.com/)).toBeInTheDocument();
    });

    it('shows Sign Out text when not collapsed', () => {
      renderSidebar({ isCollapsed: false });
      expect(screen.getByText('Sign Out')).toBeInTheDocument();
    });
  });

  describe('Collapsed state', () => {
    it('hides menu labels when collapsed', () => {
      renderSidebar({ isCollapsed: true });
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
      expect(screen.queryByText('Wallets')).not.toBeInTheDocument();
    });

    it('hides user email when collapsed', () => {
      renderSidebar({ isCollapsed: true });
      // Email should be hidden via conditional rendering
      const emailElements = screen.queryAllByText(/example@email\.com/);
      expect(emailElements).toHaveLength(0);
    });

    it('hides Sign Out text when collapsed but keeps icon', () => {
      renderSidebar({ isCollapsed: true });
      expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
      expect(screen.getByTestId('logout-button')).toBeInTheDocument();
    });

    it('displays tooltips with proper ARIA attributes', () => {
      renderSidebar({ isCollapsed: true });
      const tooltips = screen.getAllByRole('tooltip');
      expect(tooltips.length).toBeGreaterThan(0);
      tooltips.forEach(tooltip => {
        expect(tooltip).toHaveAttribute('aria-label');
      });
    });
  });

  describe('Toggle button', () => {
    it('calls onToggleCollapse when clicked', async () => {
      const onToggleCollapse = jest.fn();
      renderSidebar({ onToggleCollapse });

      const toggleBtn = screen.getByLabelText('Toggle sidebar');
      await userEvent.click(toggleBtn);
      expect(onToggleCollapse).toHaveBeenCalled();
    });

    it('shows right chevron when collapsed', () => {
      const { container } = renderSidebar({ isCollapsed: true });
      const toggleBtn = screen.getByLabelText('Toggle sidebar');
      // SVG path for right chevron (M9 5l7 7-7 7)
      const rightChevron = container.querySelector('[d="M9 5l7 7-7 7"]');
      expect(rightChevron).toBeInTheDocument();
    });

    it('shows left chevron when expanded', () => {
      const { container } = renderSidebar({ isCollapsed: false });
      const toggleBtn = screen.getByLabelText('Toggle sidebar');
      // SVG path for left chevron (M15 19l-7-7 7-7)
      const leftChevron = container.querySelector('[d="M15 19l-7-7 7-7"]');
      expect(leftChevron).toBeInTheDocument();
    });
  });

  describe('Responsive behavior', () => {
    it('toggle button has lg:flex class for desktop-only visibility', () => {
      renderSidebar();
      const toggleBtn = screen.getByLabelText('Toggle sidebar');
      expect(toggleBtn).toHaveClass('hidden', 'lg:flex');
    });
  });
});
```

- [ ] **Step 3: Run tests to verify they pass**

Run: `pnpm test src/shared/components/__tests__/Sidebar.test.tsx`
Expected: All tests pass

- [ ] **Step 4: Write integration test for AppLayout**

Create `src/shared/components/__tests__/AppLayout.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppLayout } from '../AppLayout';
import { AuthProvider } from '../../context/auth-context';
import { RouterProvider, createMemoryHistory, createRootRoute, createRouter } from '@tanstack/react-router';

describe('AppLayout', () => {
  const renderAppLayout = () => {
    const rootRoute = createRootRoute({
      component: () => <AppLayout><div>Test Content</div></AppLayout>
    });

    const router = createRouter({
      routeTree: rootRoute,
      history: createMemoryHistory(),
    });

    return render(
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );
  };

  it('initializes sidebar as expanded', () => {
    renderAppLayout();
    expect(screen.getByText('Soegih')).toBeInTheDocument();
  });

  it('toggles sidebar collapse state when toggle button clicked', async () => {
    renderAppLayout();
    const toggleBtn = screen.getByLabelText('Toggle sidebar');

    // Initially expanded - text visible
    expect(screen.getByText('Soegih')).toBeInTheDocument();

    // Click to collapse
    await userEvent.click(toggleBtn);

    // Sidebar should be collapsed - text hidden
    expect(screen.queryByText('Soegih')).not.toBeInTheDocument();

    // Click to expand again
    await userEvent.click(toggleBtn);

    // Text should be visible again
    expect(screen.getByText('Soegih')).toBeInTheDocument();
  });

  it('sidebar width changes based on collapse state', async () => {
    const { container } = renderAppLayout();
    const aside = container.querySelector('aside');

    // Initially w-64
    expect(aside).toHaveClass('w-64');

    const toggleBtn = screen.getByLabelText('Toggle sidebar');
    await userEvent.click(toggleBtn);

    // After collapse should have w-20
    expect(aside).toHaveClass('w-20');
  });
});
```

- [ ] **Step 5: Run all tests**

Run: `pnpm test`
Expected: All tests pass

- [ ] **Step 6: Commit test files**

```bash
git add src/shared/components/__tests__/Sidebar.test.tsx src/shared/components/__tests__/AppLayout.test.tsx
git commit -m "test(sidebar): add unit and integration tests for collapse functionality"
```

---

## Chunk 7: Manual Testing and Verification

### Task 7: Manual testing and visual verification

- [ ] **Step 1: Start dev server**

Run: `pnpm dev`

- [ ] **Step 2: Test desktop collapse/expand**

1. Open app on desktop view (browser width > 1024px)
2. Verify sidebar is expanded by default (w-64, shows labels)
3. Click toggle button (chevron)
4. Verify sidebar smoothly collapses to 80px width
5. Verify labels are hidden
6. Verify icons remain centered
7. Verify "Soegih" text is hidden
8. Verify logo remains visible and centered
9. Click toggle again
10. Verify smooth expansion back to full width

- [ ] **Step 3: Test tooltips**

1. With sidebar collapsed, hover over each menu item
2. Verify tooltip appears with label text
3. Verify tooltip has correct styling and positioning
4. Verify tooltip is readable and doesn't overlap other elements
5. Test Sign Out button - verify tooltip appears on hover
6. Move mouse away - verify tooltip disappears

- [ ] **Step 4: Test Sign Out behavior**

1. When expanded: verify "Sign Out" text visible with icon
2. When collapsed: verify icon-only visible
3. When collapsed and hover: verify tooltip appears
4. Click Sign Out: verify logout works correctly

- [ ] **Step 5: Test user email**

1. When expanded: verify user email visible at bottom
2. When collapsed: verify user email is hidden
3. Verify no visual gap or spacing issues

- [ ] **Step 6: Test mobile behavior unchanged**

1. Resize browser to mobile width (< 1024px)
2. Verify sidebar is NOT visible by default
3. Verify hamburger menu in header is visible
4. Click hamburger - verify sidebar appears as overlay
5. Verify collapse toggle button is hidden on mobile (hidden class)
6. Click menu item - verify sidebar closes
7. Verify mobile behavior completely unchanged

- [ ] **Step 7: Test responsive breakpoint at lg:**

1. Resize browser to exactly 1024px (Tailwind lg: breakpoint)
2. Verify toggle button becomes visible
3. Test collapse/expand at exactly this breakpoint
4. Verify smooth transition works at breakpoint

- [ ] **Step 8: Test CSS transitions**

1. With sidebar expanded, click toggle
2. Time the collapse animation - should take ~300ms
3. Verify it's smooth and not jarring
4. Verify opacity transitions for labels happen smoothly
5. Click multiple times rapidly - verify no animation glitches

- [ ] **Step 9: Verify no console errors**

1. Open browser DevTools console
2. Perform all actions above
3. Verify no errors, warnings, or React warnings
4. Verify no accessibility violations

- [ ] **Step 10: Document any issues or edge cases**

If any issues found, create a note and fix before final commit.

- [ ] **Step 11: Final commit for verification**

Run: `git status` to verify all changes are committed
Expected: Clean git status (no uncommitted changes)

---

## Chunk 8: Final Verification and Summary

### Task 8: Acceptance criteria verification

- [ ] **Step 1: Verify all acceptance criteria**

Check each item:
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

- [ ] **Step 2: Run full test suite**

Run: `pnpm test`
Expected: All tests pass

- [ ] **Step 3: Run type check**

Run: `pnpm check`
Expected: No TypeScript errors

- [ ] **Step 4: Verify git history**

Run: `git log --oneline | head -10`
Expected: See commits for each task

- [ ] **Step 5: Create PR (if applicable)**

If using feature branches, create PR:

```bash
git push -u origin feat/collapsible-sidebar
gh pr create --title "feat: collapsible sidebar for desktop view" \
  --body "Implements desktop sidebar collapse/expand functionality

- Sidebar collapses to 80px icon-only bar on desktop
- Toggle button in sidebar header with chevron icon
- Menu labels and Sign Out text hide when collapsed
- User email section hides completely
- Tooltips appear on hover with ARIA attributes
- Smooth 300ms CSS transitions
- Mobile behavior unchanged
- Full test coverage with unit, integration, and accessibility tests"
```

- [ ] **Step 6: Document in CHANGELOG**

Add to `docs/CHANGELOG.md`:

```markdown
## [Unreleased]

### Added
- **Collapsible sidebar**: Desktop users can now collapse the sidebar to an icon-only bar (80px width) for more screen space
  - Toggle button in sidebar header with smooth 300ms transitions
  - Tooltips on hover showing full menu labels
  - Sign Out button shows icon-only when collapsed
  - User email section hides when collapsed
  - Fully accessible with ARIA attributes and keyboard support
  - Mobile sidebar behavior unchanged
```

- [ ] **Step 7: Final status**

Verify:
- All code committed
- All tests passing
- No console errors
- Ready for merge

---

## Summary

This plan implements a collapsible sidebar feature for desktop view with:

1. **State management** in AppLayout
2. **Toggle button** in sidebar header (desktop-only)
3. **Conditional rendering** of labels, text, and email
4. **Tooltip system** with ARIA attributes for accessibility
5. **Smooth animations** with 300ms CSS transitions
6. **Comprehensive tests** covering unit, integration, and accessibility
7. **Mobile compatibility** - mobile behavior completely unchanged

Total estimated scope: ~200 lines of code changes + ~150 lines of tests

All tasks follow TDD principles (tests written before implementation where applicable) and include frequent commits for easy rollback if needed.
