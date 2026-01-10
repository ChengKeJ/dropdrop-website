#!/bin/bash

# DropDrop Screenshot Setup Helper
# This script helps you add your app screenshots to the website

echo "🎨 DropDrop Screenshot Setup"
echo "=============================="
echo ""

# Check if we're in the right directory
if [ ! -d "client/public/images" ]; then
    echo "❌ Error: client/public/images directory not found"
    echo "Please run this script from the project root directory"
    exit 1
fi

echo "📸 About the Screenshots"
echo "------------------------"
echo "You provided 4 beautiful app screenshots:"
echo ""
echo "1. 📊 Plan Screen (健康计划)"
echo "   - Shows: Health condition, steps, sleep, body recovery"
echo "   - Filename needed: app-screenshot-1.png"
echo ""
echo "2. ➕ Add Habit Screen (习惯选择)"
echo "   - Shows: Habit categories and options"
echo "   - Filename needed: app-screenshot-2.png"
echo ""
echo "3. ✅ Today Screen (每日打卡)"
echo "   - Shows: Daily check-ins, completion status"
echo "   - Filename needed: app-screenshot-3.png"
echo ""
echo "4. 📈 Statistics Screen (数据统计)"
echo "   - Shows: Weekly stats and charts"
echo "   - Filename needed: app-screenshot-4.png"
echo ""
echo "════════════════════════════════════════════════════════════"
echo ""

# Method 1: Copy from Desktop/Downloads
echo "📁 METHOD 1: Copy from a folder"
echo "--------------------------------"
echo "If your screenshots are in a folder, enter the path below."
echo "Example: ~/Desktop/screenshots or ~/Downloads"
echo ""
read -p "Enter the folder path (or press Enter to skip): " source_folder

if [ -n "$source_folder" ]; then
    if [ -d "$source_folder" ]; then
        echo ""
        echo "Looking for images in: $source_folder"
        echo ""

        # List image files
        image_files=($(find "$source_folder" -maxdepth 1 -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) | sort))

        if [ ${#image_files[@]} -eq 0 ]; then
            echo "❌ No image files found in that folder"
        else
            echo "Found ${#image_files[@]} image file(s):"
            for i in "${!image_files[@]}"; do
                echo "$((i+1)). $(basename "${image_files[$i]}")"
            done
            echo ""

            if [ ${#image_files[@]} -ge 4 ]; then
                read -p "Copy the first 4 images to the project? (y/n): " confirm
                if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
                    cp "${image_files[0]}" "client/public/images/app-screenshot-1.png"
                    cp "${image_files[1]}" "client/public/images/app-screenshot-2.png"
                    cp "${image_files[2]}" "client/public/images/app-screenshot-3.png"
                    cp "${image_files[3]}" "client/public/images/app-screenshot-4.png"
                    echo "✅ Screenshots copied successfully!"
                fi
            else
                echo "⚠️  Need at least 4 images. Please add more screenshots."
            fi
        fi
    else
        echo "❌ Folder not found: $source_folder"
    fi
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo ""

# Method 2: Manual instructions
echo "📋 METHOD 2: Manual Copy Instructions"
echo "--------------------------------------"
echo ""
echo "1. Locate your 4 app screenshots"
echo ""
echo "2. Rename them to:"
echo "   - app-screenshot-1.png (Plan screen)"
echo "   - app-screenshot-2.png (Add Habit screen)"
echo "   - app-screenshot-3.png (Today screen)"
echo "   - app-screenshot-4.png (Statistics screen)"
echo ""
echo "3. Copy them to:"
echo "   $(pwd)/client/public/images/"
echo ""
echo "4. Run: npm run dev"
echo "   Then visit: http://localhost:5173"
echo ""

# Check current status
echo "════════════════════════════════════════════════════════════"
echo ""
echo "📊 Current Status"
echo "-----------------"

screenshots=("app-screenshot-1.png" "app-screenshot-2.png" "app-screenshot-3.png" "app-screenshot-4.png")
missing_count=0

for screenshot in "${screenshots[@]}"; do
    if [ -f "client/public/images/$screenshot" ]; then
        size=$(du -h "client/public/images/$screenshot" | cut -f1)
        echo "✅ $screenshot ($size)"
    else
        echo "❌ $screenshot (missing)"
        ((missing_count++))
    fi
done

echo ""

if [ $missing_count -eq 0 ]; then
    echo "🎉 All screenshots are ready!"
    echo ""
    echo "Run: npm run dev"
    echo "Visit: http://localhost:5173"
else
    echo "⚠️  Missing $missing_count screenshot(s)"
    echo ""
    echo "💡 TIP: For best results, optimize your images:"
    echo "   - Size: 750px width (iPhone size)"
    echo "   - Format: PNG or WebP"
    echo "   - File size: < 200KB per image"
    echo ""
    echo "Use online tools like:"
    echo "   - https://tinypng.com/"
    echo "   - https://squoosh.app/"
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo ""
echo "📚 Need Help?"
echo "-------------"
echo "See: SCREENSHOTS_GUIDE.md for detailed instructions"
echo ""
echo "✨ Once screenshots are added, the website will display"
echo "   them with beautiful animations and hover effects!"
echo ""
