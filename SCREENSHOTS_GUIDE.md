# App Screenshots Setup Guide

## Quick Start

The website is now configured to display your 4 app screenshots. Please add them to the project following these instructions:

## Screenshot Files Required

Add the following 4 screenshots to: `client/public/images/`

### 1. Health Plan Screen (健康计划)
**Filename:** `app-screenshot-1.png`
- **Source:** Your first screenshot showing the "Plan" screen
- **Shows:** Health condition card, steps (1947), sleep data, body recovery status
- **Recommended size:** 750px × 1624px (iPhone 14 Pro aspect ratio)
- **Max file size:** 200KB (compressed)

### 2. Add Habit Screen (习惯选择)
**Filename:** `app-screenshot-2.png`
- **Source:** Your second screenshot showing "Create New Plan / Add Habit"
- **Shows:** Habit categories (All, Health, Sport, Study) and habit options
- **Recommended size:** 750px × 1624px
- **Max file size:** 200KB (compressed)

### 3. Today Screen (每日打卡)
**Filename:** `app-screenshot-3.png`
- **Source:** Your third screenshot showing the "Today" view
- **Shows:** Saturday calendar, 2/2 completed, Morning Water and Plank habits
- **Recommended size:** 750px × 1624px
- **Max file size:** 200KB (compressed)

### 4. Statistics Screen (数据统计)
**Filename:** `app-screenshot-4.png`
- **Source:** Your fourth screenshot showing "Statistics"
- **Shows:** Weekly view, completion rates with bar charts for habits
- **Recommended size:** 750px × 1624px
- **Max file size:** 200KB (compressed)

## How to Add Screenshots

### Option 1: Manual Copy
```bash
# Navigate to the images directory
cd client/public/images/

# Copy your screenshots here with the exact filenames:
# app-screenshot-1.png
# app-screenshot-2.png
# app-screenshot-3.png
# app-screenshot-4.png
```

### Option 2: Using Command Line
```bash
# From the project root
cp /path/to/your/screenshot1.png client/public/images/app-screenshot-1.png
cp /path/to/your/screenshot2.png client/public/images/app-screenshot-2.png
cp /path/to/your/screenshot3.png client/public/images/app-screenshot-3.png
cp /path/to/your/screenshot4.png client/public/images/app-screenshot-4.png
```

## Image Optimization

To optimize your screenshots for web, use one of these tools:

### Online Tools
1. **TinyPNG**: https://tinypng.com/
   - Upload your PNG files
   - Download the compressed versions
   - Can reduce file size by 50-70%

2. **Squoosh**: https://squoosh.app/
   - Advanced compression options
   - Compare before/after
   - Supports WebP format

### Command Line (ImageMagick)
```bash
# Install ImageMagick first
# macOS: brew install imagemagick
# Linux: apt-get install imagemagick

# Resize and compress
convert input.png -resize 750x1624 -quality 85 app-screenshot-1.png
```

### Command Line (sharp-cli)
```bash
# Install sharp-cli
npm install -g sharp-cli

# Optimize images
sharp -i input.png -o app-screenshot-1.png -f png --compressionLevel 9
```

## Verification

After adding the screenshots, verify they appear correctly:

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Check the showcase section:**
   - Navigate to http://localhost:5173
   - Scroll to the "简洁优雅的设计" / "Clean & Elegant Design" section
   - Verify all 4 screenshots are displayed

3. **Test mobile view:**
   - Open browser DevTools (F12)
   - Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
   - Test scrolling the horizontal carousel

## Fallback Behavior

If screenshots are missing, the website will automatically fall back to existing feature images. This ensures the website always looks good even without the app screenshots.

## Technical Details

### Image Specifications
- **Format:** PNG (recommended) or JPG
- **Aspect Ratio:** 9:19.5 (iPhone modern aspect ratio)
- **Color Space:** sRGB
- **Resolution:** 72-144 DPI (web standard)
- **Transparency:** Optional (PNG only)

### File Naming Convention
The filenames MUST match exactly:
- `app-screenshot-1.png` ✅
- `App-Screenshot-1.png` ❌ (wrong capitalization)
- `app-screenshot-1.jpg` ❌ (wrong extension, unless you modify the code)
- `app_screenshot_1.png` ❌ (wrong separator)

### Supported in Code
The Home.tsx component references these images:
```tsx
// Lines 353-356 (Desktop) and 393-396 (Mobile)
{ img: 'app-screenshot-1.png', ... },
{ img: 'app-screenshot-2.png', ... },
{ img: 'app-screenshot-3.png', ... },
{ img: 'app-screenshot-4.png', ... },
```

## Troubleshooting

### Issue: Screenshots not showing
**Solution 1:** Check file path and naming
```bash
# Run from project root
ls -la client/public/images/app-screenshot-*.png
```

**Solution 2:** Clear browser cache
- Press Ctrl+Shift+R (Windows/Linux)
- Press Cmd+Shift+R (macOS)

**Solution 3:** Check file permissions
```bash
chmod 644 client/public/images/app-screenshot-*.png
```

### Issue: Images loading slowly
**Solution:** Compress images more
- Target: < 200KB per image
- Use WebP format for better compression
- Enable lazy loading (already implemented)

### Issue: Blurry on high-DPI screens
**Solution:** Use 2x resolution
- Use 1500px width instead of 750px
- Ensure compression quality is high (85-90%)

## Converting to WebP (Optional, Advanced)

For even better performance, convert to WebP:

```bash
# Using cwebp (from webp package)
cwebp -q 85 app-screenshot-1.png -o app-screenshot-1.webp

# Then update Home.tsx to use .webp extension
```

## Additional Resources

- [Web.dev Image Optimization Guide](https://web.dev/fast/#optimize-your-images)
- [MDN: Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Can I Use WebP](https://caniuse.com/webp)

## Questions?

If you encounter any issues or need help, check:
1. Console errors in browser DevTools (F12)
2. Network tab to see if images are loading
3. File paths are correct and accessible

---

**Note:** The screenshots you provided in your message are perfect! Just save them with the correct filenames and the website will automatically display them beautifully with all the premium animations and effects.
