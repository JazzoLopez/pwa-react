/**
 * Script para generar PNGs (192x192 y 512x512) a partir de `public/icons/icon.svg`.
 * Usa `sharp`. Instalar con `pnpm add -D sharp` y ejecutar `node scripts/generate-icons.js`.
 */
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'icons', 'icon.svg');
const outDir = path.join(__dirname, '..', 'public', 'icons');

async function run() {
    if (!fs.existsSync(svgPath)) {
        console.error('No se encontró', svgPath);
        process.exit(1);
    }
    let sharp;
    try {
        sharp = require('sharp');
    } catch (e) {
        console.error('Instala sharp primero: pnpm add -D sharp');
        process.exit(1);
    }

    const svg = fs.readFileSync(svgPath);
    const sizes = [192, 512];
    for (const s of sizes) {
        const out = path.join(outDir, `icon-${s}.png`);
        await sharp(svg)
            .resize(s, s, { fit: 'contain' })
            .png()
            .toFile(out);
        console.log('Generado', out);
    }
}

run().catch((e) => {
    console.error(e);
    process.exit(1);
});
