import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logoPath = join(root, "public/images/vyrapath-logo.png");

// Use sharp via npx if not installed
async function getSharp() {
  try {
    return (await import("sharp")).default;
  } catch {
    execSync("npm install sharp --no-save", { cwd: root, stdio: "inherit" });
    return (await import("sharp")).default;
  }
}

async function main() {
  const sharp = await getSharp();
  const meta = await sharp(logoPath).metadata();
  const w = meta.width ?? 1024;
  const h = meta.height ?? 1024;

  // Crop to VR icon area (top ~52% of logo, centered square)
  const cropH = Math.round(h * 0.52);
  const size = Math.min(w, cropH);

  const icon = await sharp(logoPath)
    .extract({
      left: Math.round((w - size) / 2),
      top: 0,
      width: size,
      height: cropH,
    })
    .resize(512, 512, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toBuffer();

  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((s) => sharp(icon).resize(s, s).png().toBuffer()),
  );

  writeFileSync(join(root, "public/favicon.png"), await sharp(icon).resize(32, 32).png().toBuffer());

  // Build ICO via png-to-ico
  try {
    const toIco = (await import("to-ico")).default;
    writeFileSync(join(root, "public/favicon.ico"), await toIco(pngBuffers));
  } catch {
    execSync("npm install to-ico --no-save", { cwd: root, stdio: "inherit" });
    const toIco = (await import("to-ico")).default;
    writeFileSync(join(root, "public/favicon.ico"), await toIco(pngBuffers));
  }

  console.log("Created public/favicon.ico and public/favicon.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
