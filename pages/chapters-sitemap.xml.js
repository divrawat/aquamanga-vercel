
/*
import { getChapterSitemap } from "@/actions/chapter";
import { DOMAIN } from "../config";
import slugify from 'slugify';
import fs from 'fs';
import path from 'path';

const CHAPTERS_PER_SITEMAP = 25000;


const generateXmlSitemap = (blogs) => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    blogs.forEach((blog) => {
        const slugifiedName = slugify(blog.manganame).toLowerCase();
        xml += `
    <url>
      <loc>${`${DOMAIN}/series/${slugifiedName}/chapter-${blog.chapterNumber}`}</loc>
    </url>`;
    });

    xml += '</urlset>';
    return xml;
};

export async function getServerSideProps() {
    const { chapters } = await getChapterSitemap();
    const totalSitemaps = Math.ceil(chapters.length / CHAPTERS_PER_SITEMAP);

    // Ensure the public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    for (let i = 0; i < totalSitemaps; i++) {
        const start = i * CHAPTERS_PER_SITEMAP;
        const end = start + CHAPTERS_PER_SITEMAP;
        const chunk = chapters.slice(start, end);

        const sitemapContent = generateXmlSitemap(chunk);
        const sitemapPath = path.join(publicDir, `chapter-sitemapsss${i + 1}.xml`);

        // Write the sitemap to the public directory
        fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
    }

    return { props: {} };
}
*/



export default function Sitemap() { return null; }


{/* <lastmod>${blog.createdAt}</lastmod> */ }