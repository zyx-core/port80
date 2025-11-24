#!/bin/bash

# Script to update all frontend API URLs to use the new config

echo "Updating frontend API URLs..."

# Files to update
files=(
  "src/pages/Register.jsx"
  "src/pages/StudentDashboard.jsx"
  "src/pages/student/UpdateProgress.jsx"
  "src/pages/admin/AdminLogin.jsx"
  "src/pages/admin/AdminDashboard.jsx"
  "src/pages/admin/EditStudentProgress.jsx"
  "src/pages/admin/ViewStudentReport.jsx"
  "src/pages/admin/ReportsDashboard.jsx"
  "src/pages/admin/AdminReports.jsx"
  "src/pages/admin/Reports.jsx"
)

cd /home/zyx/Downloads/port80/frontend-new

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    
    # Add import if not already present
    if ! grep -q "getApiUrl" "$file"; then
      # Find the last import line and add our import after it
      sed -i '/^import/a import { getApiUrl } from "../config/api";' "$file" 2>/dev/null || \
      sed -i '/^import/a import { getApiUrl } from "../../config/api";' "$file" 2>/dev/null
    fi
    
    # Replace all localhost:5000/api URLs
    sed -i 's|"http://localhost:5000/api/\([^"]*\)"|getApiUrl("\1")|g' "$file"
    sed -i "s|'http://localhost:5000/api/\([^']*\)'|getApiUrl('\1')|g" "$file"
    sed -i 's|`http://localhost:5000/api/\([^`]*\)`|getApiUrl(`\1`)|g' "$file"
    
    echo "✓ Updated $file"
  else
    echo "✗ File not found: $file"
  fi
done

echo "Done!"
