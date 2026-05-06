import fs from 'fs';
import path from 'path';

async function fetchDir(url: string, dirPath: string) {
  const response = await fetch(url);
  const contents = await response.json();
  for (const item of contents) {
    if (item.type === 'file') {
      console.log(`Fetching ${item.path}...`);
      const fileRes = await fetch(item.download_url);
      const buffer = await fileRes.arrayBuffer();
      const outPath = path.join(process.cwd(), item.path);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, Buffer.from(buffer));
    } else if (item.type === 'dir') {
      await fetchDir(item.url, item.path);
    }
  }
}

async function run() {
  await fetchDir('https://api.github.com/repos/zekepujols-hub/zekepujols/contents/css', 'css');
  await fetchDir('https://api.github.com/repos/zekepujols-hub/zekepujols/contents/js', 'js');
  await fetchDir('https://api.github.com/repos/zekepujols-hub/zekepujols/contents/assets', 'assets');
}

run().then(() => console.log('Done!'));
