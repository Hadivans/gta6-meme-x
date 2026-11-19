// GTA 6 meme on X (gta6-meme-x-01): the entry is the X post itself.
//
// This program has exactly one job: hand the post's address to the
// grader. It copies POST.json from this repository into the grader's
// output directory, where the sealed gate reads it. The house then
// reads the post from X itself -- its first picture and its text --
// and the AI judge ranks the posts two at a time. Nothing this
// program writes is judged, so it does no image work, makes no
// network calls and calls no model: one deterministic file copy.
//
// The meme the post carries is a GTA "WANTED" poster: the make.fun
// ghost is the prime suspect, wanted for stealing 13 years of our
// lives waiting for GTA 6, last seen playing it in Leonida, with a
// reward of real money on make.fun. It was composed in the build
// session (Vice City sunset street + the real make.fun ghost mark +
// crisp vector text) and lives in the work directory as meme.png;
// the picture the judge sees is the one attached to the X post.
//
// Run it locally the way the kit documents:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const SOURCE = join(BOT_DIR, "POST.json");
const TARGET = join(OUTPUT_DIR, "POST.json");

if (!existsSync(SOURCE)) {
  console.error(`POST.json not found in ${BOT_DIR} -- nothing to hand in.`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(SOURCE, TARGET);
console.log(`POST.json copied to ${TARGET}`);
