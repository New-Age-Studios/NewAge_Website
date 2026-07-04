import fs from 'fs';
import path from 'path';
import { docsNav as staticNav } from './nav.js';

function extractMetadataFromMdx(filePath, fallbackTitle, fallbackIcon) {
  let title = fallbackTitle;
  let icon = fallbackIcon;
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Look for a title (e.g. # My Title)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) title = titleMatch[1].trim();

    // Look for an icon definition (e.g. <!-- icon: Wrench --> or icon: Wrench in frontmatter)
    const iconMatch = content.match(/icon:\s*([A-Za-z]+)/);
    if (iconMatch) icon = iconMatch[1].trim();

  } catch (e) {}
  
  return { title, icon };
}

export function getDocsNav() {
  const nav = JSON.parse(JSON.stringify(staticNav)); // deep copy
  const basePath = path.join(process.cwd(), 'src/app/[lang]/docs');

  for (const section of nav) {
    if (section.items) {
      for (const item of section.items) {
        if (item.slug) {
          const itemPath = path.join(basePath, item.slug);
          try {
            if (fs.existsSync(itemPath) && fs.statSync(itemPath).isDirectory()) {
              const subFolders = fs.readdirSync(itemPath).filter(f => {
                const subPath = path.join(itemPath, f);
                return fs.statSync(subPath).isDirectory() && fs.existsSync(path.join(subPath, 'page.mdx'));
              });

              if (subFolders.length > 0) {
                item.items = [];
                for (const folder of subFolders) {
                  const subPagePath = path.join(itemPath, folder, 'page.mdx');
                  const fallback = folder.charAt(0).toUpperCase() + folder.slice(1).replace(/-/g, ' ');
                  
                  // Default fallback icon
                  const fallbackIcon = folder.toLowerCase() === 'installation' ? 'Wrench' : 'FileText';

                  const { title, icon } = extractMetadataFromMdx(subPagePath, fallback, fallbackIcon);

                  item.items.push({
                    title,
                    slug: `${item.slug}/${folder}`,
                    icon
                  });
                }
              }
            }
          } catch (e) {
            console.error(`Error reading subdirectories for ${item.slug}:`, e);
          }
        }
      }
    }
  }

  return nav;
}
