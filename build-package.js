// Erzeugt das Teams-App-Paket (lernkartei-a1-teams.zip).
// Aufruf: node build-package.js https://<github-name>.github.io/lernkartei-a1/
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const url = (process.argv[2] || "").trim();
if (!/^https:\/\/[^/]+\/.*\/$/.test(url)) {
  console.error("Bitte die HTTPS-Adresse der Seite angeben, mit / am Ende.\nBeispiel: node build-package.js https://name.github.io/lernkartei-a1/");
  process.exit(1);
}
const host = new URL(url).host;
const idFile = path.join(__dirname, "package", "app-id.txt");
let appId = fs.existsSync(idFile) ? fs.readFileSync(idFile, "utf8").trim() : "";
if (!appId) { appId = require("crypto").randomUUID(); fs.writeFileSync(idFile, appId); }

const version = JSON.parse(fs.readFileSync(path.join(__dirname, "package", "version.json"), "utf8")).version;

const manifest = {
  $schema: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.17/MicrosoftTeams.schema.json",
  manifestVersion: "1.17",
  version,
  id: appId,
  developer: {
    name: "Lernkartei A1",
    websiteUrl: url,
    privacyUrl: url + "datenschutz.html",
    termsOfUseUrl: url + "datenschutz.html"
  },
  name: { short: "Lernkartei A1", full: "Lernkartei A1 – Wortschatz und Redemittel" },
  description: {
    short: "Deutsch A1 lernen: Karteikarten, Quiz und 30 Minuten pro Tag.",
    full: "Lernkartei für Deutsch A1 mit zwei Ordnern: aktiver Wortschatz (über 700 Wörter mit Artikel und Plural) und Satzbausteine und Redemittel (über 160 Wendungen). Karteikarten mit Lernkästen, Quiz, Tagesziel von 30 Minuten, Serien, Level und Abzeichen."
  },
  icons: { color: "color.png", outline: "outline.png" },
  accentColor: "#2F55D4",
  staticTabs: [
    { entityId: "lernen", name: "Lernen", contentUrl: url, websiteUrl: url, scopes: ["personal"] },
    { entityId: "about", scopes: ["personal"] }
  ],
  permissions: ["identity"],
  validDomains: [host]
};

const pkgDir = path.join(__dirname, "package");
fs.writeFileSync(path.join(pkgDir, "manifest.json"), JSON.stringify(manifest, null, 2));
const zip = path.join(__dirname, "lernkartei-a1-teams.zip");
if (fs.existsSync(zip)) fs.unlinkSync(zip);
execFileSync("powershell", ["-NoProfile", "-Command",
  `Compress-Archive -Path '${path.join(pkgDir, "manifest.json")}','${path.join(pkgDir, "color.png")}','${path.join(pkgDir, "outline.png")}' -DestinationPath '${zip}'`], { stdio: "inherit" });
console.log("Fertig:", zip, "\nApp-ID:", appId, "\nVersion:", version, "\nAdresse:", url);
