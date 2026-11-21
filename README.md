# Lernkartei A1

Lernkartei für Deutsch A1 als Microsoft-Teams-App (persönlicher Tab).

- **Ordner 1 – Wortschatz A1:** aktiver Grundwortschatz mit Artikel und Plural
- **Ordner 2 – Satzbausteine & Redemittel A1:** feste Wendungen für den Alltag
- Karteikarten mit Lernkästen, Quiz, Tagesziel 30 Minuten, Serien, Level, Abzeichen
- Fortschritt wird nur im Browser bzw. in Teams auf dem Gerät gespeichert

## Aufbau

| Pfad | Inhalt |
|---|---|
| `docs/` | Die Web-App (wird über GitHub Pages ausgeliefert) |
| `package/` | Icons, App-ID und Version für das Teams-Paket |
| `build-package.js` | Erzeugt `lernkartei-a1-teams.zip` |
| `serve.js` | Lokaler Testserver auf http://localhost:5173 |

## Teams-Paket bauen

```
node build-package.js https://kaffeechino.github.io/lernkartei-a1/
```

Bei Änderungen am Manifest die Version in `package/version.json` erhöhen und das ZIP in Teams neu hochladen.
Änderungen an `docs/` sind nach dem Push automatisch in Teams sichtbar.
