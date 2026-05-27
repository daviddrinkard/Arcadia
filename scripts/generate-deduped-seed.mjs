// Regenerate supabase/seed_deduped.sql from Arcadia-Formatted-GameList-seed.csv.
//
// Strips trailing region/revision/version suffixes from game_name
// (anything starting with '(' or '['), then dedupes by the cleaned name.
// First row wins for the remaining fields (genre/year/region/...).
//
// Run: node scripts/generate-deduped-seed.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = resolve(
  __dirname,
  "..",
  "Arcadia-Formatted-GameList-seed.csv",
);
const outPath = resolve(__dirname, "..", "supabase", "seed_deduped.sql");

function parseRow(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
    } else {
      if (ch === ",") {
        out.push(cur);
        cur = "";
      } else if (ch === '"') {
        inQuotes = true;
      } else {
        cur += ch;
      }
    }
  }
  out.push(cur);
  return out;
}

const cleanName = (name) => name.replace(/\s*[([].*$/, "").trim();
const sqlEscape = (s) =>
  s == null || s === "" ? "NULL" : `'${s.replace(/'/g, "''")}'`;

const text = readFileSync(csvPath, "utf8");
const lines = text.split(/\r?\n/).filter((l) => l.length > 0);
lines.shift(); // drop header

const seen = new Set();
const kept = [];
let totalRows = 0;

for (const line of lines) {
  totalRows++;
  const row = parseRow(line);
  const [
    gameName,
    gameGenre,
    gameYear,
    gameDescription,
    gameRegion,
    gamePlatform,
    gameSeries,
    gameManufacturer,
    gamePlayers,
  ] = row;
  const cleaned = cleanName(gameName);
  if (!cleaned) continue;
  const key = cleaned.toLowerCase();
  if (seen.has(key)) continue;
  seen.add(key);
  kept.push({
    game_name: cleaned,
    game_genre: gameGenre,
    game_year: gameYear,
    game_description: gameDescription,
    game_region: gameRegion,
    game_platform: gamePlatform,
    game_series: gameSeries,
    game_manufacturer: gameManufacturer,
    game_players: gamePlayers,
  });
}

const headerSql = `-- =============================================================================
-- Arcadia — DEDUPED games seed
--
-- Generated from Arcadia-Formatted-GameList-seed.csv by
-- scripts/generate-deduped-seed.mjs. Source CSV has ${totalRows} rows;
-- this file has ${kept.length} rows after collapsing region/revision/version
-- variants down to a single canonical entry per base game name.
--
-- Canonicalization: trailing "(...)" / "[...]" suffixes are stripped from
-- game_name. First-seen row wins for the remaining fields, so genre/year are
-- preserved but the kept region/platform/etc. is arbitrary.
--
-- Paste into the Supabase SQL Editor and run after 0002_games_columns.sql.
--
-- TRUNCATE ... RESTART IDENTITY CASCADE wipes any existing games (and any
-- gamelist / user_liked_games rows that reference them). Safe on a fresh DB;
-- if you've added real data, comment the TRUNCATE out before re-running.
-- =============================================================================

TRUNCATE TABLE public.games RESTART IDENTITY CASCADE;

INSERT INTO public.games (game_name, game_genre, game_year, game_description, game_region, game_platform, game_series, game_manufacturer, game_players) VALUES
`;

const valuesSql = kept
  .map((g, i) => {
    const fields = [
      sqlEscape(g.game_name),
      sqlEscape(g.game_genre),
      sqlEscape(g.game_year),
      sqlEscape(g.game_description),
      sqlEscape(g.game_region),
      sqlEscape(g.game_platform),
      sqlEscape(g.game_series),
      sqlEscape(g.game_manufacturer),
      sqlEscape(g.game_players),
    ].join(", ");
    const sep = i === kept.length - 1 ? ";" : ",";
    return `  (${fields})${sep}`;
  })
  .join("\n");

writeFileSync(outPath, headerSql + valuesSql + "\n");
console.log(`Source rows:   ${totalRows}`);
console.log(`Deduped rows:  ${kept.length}`);
console.log(`Wrote:         ${outPath}`);
