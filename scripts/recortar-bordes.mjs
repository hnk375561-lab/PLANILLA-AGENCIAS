import sharp from 'sharp'; import fs from 'node:fs';
const dir = process.argv[2]; const nums = process.argv[3].split(',');
for (const n of nums) for (const suf of ['', '-sm']) {
  const f = `${dir}/foto-${n}${suf}.webp`; if (!fs.existsSync(f)) continue;
  const buf = fs.readFileSync(f);
  const out = await sharp(buf).trim({ background: '#ffffff', threshold: 25 }).webp({ quality: 92 }).toBuffer();
  fs.writeFileSync(f, out);
  if (!suf) { const m = await sharp(out).metadata(); console.log(n, m.width + 'x' + m.height); }
}
