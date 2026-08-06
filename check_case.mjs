import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');
const importRegex = /import\s+.*?from\s+['"]([^'"]+)['"]/g;

for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        if (importPath.startsWith('.')) {
            const resolvedDir = path.dirname(file);
            let resolvedPath = path.resolve(resolvedDir, importPath);
            
            // Try to find the exact file
            const dir = path.dirname(resolvedPath);
            const base = path.basename(resolvedPath);
            
            if (fs.existsSync(dir)) {
                const dirFiles = fs.readdirSync(dir);
                let found = false;
                for (const df of dirFiles) {
                    if (df === base || df.startsWith(base + '.') || (base === '' && df === 'index')) {
                        found = true;
                        break;
                    }
                }
                
                // if it's a directory, maybe it has an index file
                if (!found && fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
                     const idxFiles = fs.readdirSync(resolvedPath);
                     for (const df of idxFiles) {
                         if (df.startsWith('index.')) {
                             found = true;
                             break;
                         }
                     }
                }
                
                // Let's just do a simpler check: check if the path exists case-sensitively on macOS.
                // macOS is case-insensitive by default. The best way to check real casing is via fs.realpathSync
                try {
                    const realPath = fs.realpathSync(resolvedPath);
                    // but wait, realpathSync might just return the correct case, or it might not.
                    // Instead, let's just use readdirSync on the parent directory.
                } catch(e) {}
            }
        }
    }
}
console.log('Done');
