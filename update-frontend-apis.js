// Script to update remaining frontend files with API config
// Run with: node update-frontend-apis.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
    'frontend-new/src/pages/StudentDashboard.jsx',
    'frontend-new/src/pages/student/UpdateProgress.jsx',
    'frontend-new/src/pages/admin/AdminLogin.jsx',
    'frontend-new/src/pages/admin/AdminDashboard.jsx',
    'frontend-new/src/pages/admin/EditStudentProgress.jsx',
    'frontend-new/src/pages/admin/ViewStudentReport.jsx',
    'frontend-new/src/pages/admin/ReportsDashboard.jsx',
    'frontend-new/src/pages/admin/AdminReports.jsx',
    'frontend-new/src/pages/admin/Reports.jsx'
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);

    if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Check if import already exists
    if (!content.includes('getApiUrl')) {
        // Find the last import statement
        const importRegex = /^import .+ from .+;$/gm;
        const imports = content.match(importRegex);

        if (imports && imports.length > 0) {
            const lastImport = imports[imports.length - 1];
            const depth = file.includes('/admin/') ? '../../' : '../';
            const newImport = `import { getApiUrl } from "${depth}config/api";`;

            content = content.replace(lastImport, `${lastImport}\n${newImport}`);
        }
    }

    // Replace all localhost:5000/api URLs
    content = content.replace(
        /"http:\/\/localhost:5000\/api\/([^"]+)"/g,
        'getApiUrl("$1")'
    );

    content = content.replace(
        /'http:\/\/localhost:5000\/api\/([^']+)'/g,
        "getApiUrl('$1')"
    );

    content = content.replace(
        /`http:\/\/localhost:5000\/api\/([^`]+)`/g,
        'getApiUrl(`$1`)'
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${file}`);
});

console.log('\n✨ All files updated!');
