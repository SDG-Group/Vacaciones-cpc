// Valida festivos/*.csv|xlsx, genera public/festivos.json y copia la app a public/.
import fs from 'fs'; import path from 'path';
import readXlsxFile from 'read-excel-file/node';

const LOCS = { barcelona: 'barcelona', madrid: 'madrid', valencia: 'valencia', todas: 'all', all: 'all', nacional: 'all' };
const flat = s => String(s ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
const errors = [];
const out = {};

function toKey(v) {
  let y, m, d;
  if (v instanceof Date) { const u = new Date(v.getTime() + 43200000); y = u.getUTCFullYear(); m = u.getUTCMonth() + 1; d = u.getUTCDate(); }
  else {
    const s = String(v ?? '').trim(); let r;
    if ((r = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/))) { y = +r[1]; m = +r[2]; d = +r[3]; }
    else if ((r = s.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})/))) { y = +r[3]; m = +r[2]; d = +r[1]; }
    else return null;
  }
  const t = new Date(y, m - 1, d);
  return t.getFullYear() === y && t.getMonth() === m - 1 && t.getDate() === d ? { y, key: `${y}-${m}-${d}` } : null;
}
function parseCsv(txt) {
  return txt.split(/\r?\n/).filter(l => l.trim()).map(l => {
    const sep = l.includes(';') ? ';' : l.includes('\t') ? '\t' : ',';
    return l.split(sep).map(c => c.trim().replace(/^"|"$/g, ''));
  });
}
async function main() {
  const dir = 'festivos';
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => /\.(csv|xlsx)$/i.test(f) && !f.startsWith('~$')).sort() : [];
  for (const f of files) {
    const p = path.join(dir, f);
    const rows = /\.xlsx$/i.test(f) ? await readXlsxFile(p) : parseCsv(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
    let n = 0;
    rows.forEach((r, i) => {
      const k = toKey(r[0]);
      if (!k) { if (i > 0) errors.push(`${f}, fila ${i + 1}: la fecha «${r[0]}» no es válida (usa 14/04/2028 o 2028-04-14).`); return; }
      const name = String(r[1] ?? '').trim();
      if (!name) { errors.push(`${f}, fila ${i + 1}: falta el nombre del festivo.`); return; }
      const raw = flat(r[2]); const loc = raw ? LOCS[raw] : 'all';
      if (!loc) { errors.push(`${f}, fila ${i + 1}: la ubicación «${r[2]}» no existe (usa Todas, Barcelona, Madrid o Valencia).`); return; }
      ((out[k.y] ??= {})[loc] ??= {})[k.key] = name.slice(0, 60); n++;
    });
    if (!n) errors.push(`${f}: no he encontrado ningún festivo. Columnas: fecha, nombre, ubicación.`);
    console.log(`${f}: ${n} festivos`);
  }
  if (errors.length) { console.error('\nERRORES EN LOS FESTIVOS:\n' + errors.map(e => ' - ' + e).join('\n')); process.exit(1); }
  fs.rmSync('public', { recursive: true, force: true }); fs.mkdirSync('public');
  for (const f of fs.readdirSync('src')) fs.copyFileSync(path.join('src', f), path.join('public', f));
  fs.writeFileSync('public/festivos.json', JSON.stringify(out));
  console.log('Listo: public/ generado.');
}
main().catch(e => { console.error(e); process.exit(1); });
