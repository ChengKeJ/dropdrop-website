# SSR Deployment Error Fix Summary

## 🐛 Problem

After deploying to production, the website showed:
**"An unexpected error occurred"**

Error occurred when refreshing the page, indicating a Server-Side Rendering (SSR) or hydration issue.

---

## 🔍 Root Causes Identified

### 1. **Direct `window.innerWidth` Access** (Fixed in commit `d45c8c9`)

**Location**: `client/src/pages/Home.tsx`

```typescript
// ❌ Problem
<feature.IconComponent size={window.innerWidth < 768 ? 80 : 96} />
```

**Issue**: `window` object doesn't exist during server-side rendering

**Fix**:

```typescript
// ✅ Solution
<feature.IconComponent size={isMobile ? 80 : 96} />
```

---

### 2. **localStorage and navigator in useState Initializer** (Fixed in commit `f6a88c9`)

**Location**: `client/src/contexts/LanguageContext.tsx`

```typescript
// ❌ Problem
const [language, setLanguageState] = useState<Language>(() => {
  const saved = localStorage.getItem("dropdrop-language");
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith("zh") ? "zh" : "en";
});
```

**Issue**: `localStorage` and `navigator` are accessed during state initialization on server

**Fix**:

```typescript
// ✅ Solution
const [language, setLanguageState] = useState<Language>("zh"); // Default

useEffect(() => {
  if (typeof window === "undefined") return;

  const saved = localStorage.getItem("dropdrop-language");
  if (saved && (saved === "zh" || saved === "en")) {
    setLanguageState(saved);
    return;
  }

  const browserLang = navigator.language.toLowerCase();
  const detectedLang = browserLang.startsWith("zh") ? "zh" : "en";
  setLanguageState(detectedLang);
}, []);
```

---

### 3. **Unprotected window and document Access** (Fixed in commit `3dceaf5`)

**Location**: `client/src/pages/Home.tsx`

#### Issue A: Scroll Handler

```typescript
// ❌ Problem
const handleScroll = useThrottle(() => {
  setIsScrolled(window.scrollY > 50);
}, 100);
```

**Fix**:

```typescript
// ✅ Solution
const handleScroll = useThrottle(() => {
  if (typeof window !== "undefined") {
    setIsScrolled(window.scrollY > 50);
  }
}, 100);
```

#### Issue B: Scroll Event Listener

```typescript
// ❌ Problem
useEffect(() => {
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [handleScroll]);
```

**Fix**:

```typescript
// ✅ Solution
useEffect(() => {
  if (typeof window === "undefined") return;

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, [handleScroll]);
```

#### Issue C: Document Body Manipulation

```typescript
// ❌ Problem
useEffect(() => {
  if (isMobileMenuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }
}, [isMobileMenuOpen]);
```

**Fix**:

```typescript
// ✅ Solution
useEffect(() => {
  if (typeof document === "undefined") return;

  if (isMobileMenuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }
  return () => {
    document.body.style.overflow = "unset";
  };
}, [isMobileMenuOpen]);
```

#### Issue D: Scroll to Section

```typescript
// ❌ Problem
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
```

**Fix**:

```typescript
// ✅ Solution
const scrollToSection = (id: string) => {
  if (typeof document === "undefined") return;

  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  }
};
```

---

## 📋 Complete Fix Checklist

### ✅ Fixed Issues

1. **window.innerWidth** → Use `useIsMobile` hook
2. **localStorage in useState** → Move to `useEffect` with type check
3. **navigator in useState** → Move to `useEffect` with type check
4. **window.scrollY** → Add `typeof window !== 'undefined'` check
5. **window.addEventListener** → Add `typeof window === 'undefined'` guard
6. **document.body** → Add `typeof document === 'undefined'` guard
7. **document.getElementById** → Add `typeof document === 'undefined'` guard
8. **document.documentElement** → Add `typeof window !== 'undefined'` check in setLanguage

### ✅ Safe Components (Already Protected)

1. **useIsMobile hook** - Uses `useEffect` for window access
2. **LanguageSwitcher** - Uses `useEffect` for document event listeners
3. **useThrottle hook** - Pure JS, no browser APIs
4. **IllustratedIcons** - Pure SVG components, no browser APIs
5. **Framer Motion** - Built-in SSR support

---

## 🧪 Testing Checklist

### Local Development

```bash
npm run build
npm run preview
```

### Deployment Testing

After deploying, verify:

- [ ] Page loads without errors
- [ ] Refresh page works correctly
- [ ] Language switching works
- [ ] Scroll animations work
- [ ] Mobile menu works
- [ ] All icons display correctly
- [ ] No console errors in browser DevTools

### SSR-Specific Tests

- [ ] View page source - should show Chinese content (default language)
- [ ] JavaScript disabled - page should still render static content
- [ ] Slow 3G network - check for hydration errors

---

## 🚀 Deployment Instructions

1. **Pull Latest Code**

   ```bash
   git pull origin claude/mobile-design-optimization-70Rc9
   ```

2. **Install Dependencies** (if needed)

   ```bash
   npm install
   ```

3. **Build for Production**

   ```bash
   npm run build
   ```

4. **Deploy**
   - Deploy the `dist/public` folder to your hosting service
   - Ensure all routes redirect to `index.html` for client-side routing

5. **Verify Deployment**
   - Visit: https://www.dropdrophabit.com
   - Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
   - Open DevTools console - should see no errors
   - Test language switching
   - Test mobile menu
   - Test scrolling

---

## 📦 Commits Summary

| Commit    | Description                                           |
| --------- | ----------------------------------------------------- |
| `d45c8c9` | Replace window.innerWidth with useIsMobile hook       |
| `f6a88c9` | Move localStorage and navigator to useEffect          |
| `3dceaf5` | Add comprehensive SSR protection for all browser APIs |

---

## 🔄 Rollback Plan (If Needed)

If deployment still fails:

```bash
# Revert to previous working commit
git revert 3dceaf5 f6a88c9 d45c8c9

# Or reset to before icon redesign
git reset --hard a213cb2
git push --force origin claude/mobile-design-optimization-70Rc9
```

---

## 📝 Best Practices Applied

### ✅ SSR-Safe Patterns

1. **Browser API Access in useEffect**

   ```typescript
   useEffect(() => {
     if (typeof window === "undefined") return;
     // Safe to access window here
   }, []);
   ```

2. **Conditional Rendering for Client-Only Features**

   ```typescript
   const [isMounted, setIsMounted] = useState(false);
   useEffect(() => setIsMounted(true), []);

   return isMounted ? <ClientOnlyComponent /> : null;
   ```

3. **Default Values for Server**

   ```typescript
   const [value, setValue] = useState("default");

   useEffect(() => {
     if (typeof window !== "undefined") {
       setValue(window.localStorage.getItem("key") || "default");
     }
   }, []);
   ```

---

## 🎯 Expected Results

After these fixes:

✅ **No SSR errors** - All browser APIs accessed safely
✅ **Smooth hydration** - No hydration mismatches
✅ **Fast initial load** - Server renders default content
✅ **Client enhancement** - JavaScript adds interactivity
✅ **SEO friendly** - Search engines see full content
✅ **Accessibility** - Works without JavaScript

---

## 🔍 Debug Tips (For Future Issues)

If you encounter SSR errors in the future:

1. **Check Browser Console**
   - Look for "window is not defined"
   - Look for "document is not defined"
   - Look for "localStorage is not defined"

2. **Check Server Logs**
   - Look for hydration warnings
   - Look for "ReferenceError" messages

3. **Use React DevTools**
   - Check for component re-renders
   - Look for hydration mismatches

4. **Add Debugging**
   ```typescript
   console.log("IS_SERVER:", typeof window === "undefined");
   console.log("IS_CLIENT:", typeof window !== "undefined");
   ```

---

_Last Updated: 2026-01-11_
_Status: Ready for Production Deployment_
