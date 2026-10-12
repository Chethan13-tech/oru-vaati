import fs from 'fs';

const content = fs.readFileSync('lib/data.ts', 'utf8');
const urls = [...new Set(content.match(/https:\/\/images\.unsplash\.com\/[^\'\"]+/g) || [])];
console.log('Testing', urls.length, 'URLs...');

for (const url of urls) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    console.log(`${res.status} | ${url}`);
  } catch (err) {
    console.log(`ERR | ${url}`);
  }
}
