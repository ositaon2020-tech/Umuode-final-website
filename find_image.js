import fs from "fs";
import path from "path";

const allowedExt = [".png", ".jpg", ".jpeg", ".webp", ".svg"];

function scanRoot(currentDir, depth = 0) {
  if (depth > 6) return;
  try {
    const list = fs.readdirSync(currentDir);
    for (const item of list) {
      if (item === "proc" || item === "sys" || item === "dev" || item === "lib" || item === "lib64" || item === "sbin" || item === "node_modules" || item === "dist" || item === ".git" || item === "boot" || item === "run") {
        continue;
      }
      const full = path.join(currentDir, item);
      let stat;
      try {
        stat = fs.statSync(full);
      } catch (e) {
        continue;
      }
      if (stat.isDirectory()) {
        scanRoot(full, depth + 1);
      } else {
        const ext = path.extname(item).toLowerCase();
        if (allowedExt.includes(ext)) {
          // Log any image found
          console.log(`FOUND: ${full} (Size: ${stat.size}, Mtime: ${stat.mtime})`);
        }
      }
    }
  } catch (err) {}
}

console.log("Scanning container filesystem for image files...");
scanRoot("/");
console.log("Scan complete.");
