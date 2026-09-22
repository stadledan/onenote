# Blattschnitt

**OneNote-Seiten auf A4 schneiden – direkt im Browser, ohne Upload.**

OneNote (besonders am iPad) exportiert Notizen oft als *eine* endlos lange PDF-Seite.
Blattschnitt zerlegt diese Seite intelligent in echte A4-Seiten – geschnitten wird nur in
Leerzeilen und Absatzlücken, nie mitten durch Schrift oder Skizzen – und liefert ein
sauberes PDF, eine Word-Datei oder Einzelbilder, fertig zum Abgeben.

Die Seite ist eine statische Web-App: eine einzige `index.html`, läuft auf GitHub Pages,
alles passiert lokal im Browser. Es wird nichts hochgeladen.

## Funktionen

- **Intelligente Schnittsuche** – Zeilen- und Absatzlücken werden gemessen; bevorzugt wird
  die letzte Absatzlücke vor dem Seitenende, sonst die größte Zeilenlücke, notfalls die Zeile
  mit der wenigsten Tinte.
- **Schnitte von Hand nachziehen** – rote Schnittlinien mit Griff: ziehen, entfernen, per
  Tipp neue hinzufügen. Jede Seite zeigt ihre Höhe in mm.
- **Große Leerräume schließen** – lange leere Strecken (z. B. Platz für Hausübungen) werden
  auf ein einstellbares Maß zusammengeschoben.
- **Nie abgeschnitten** – Abschnitte, die nicht auf eine Seite passen, werden proportional
  verkleinert und sichtbar markiert.
- **Mehrspaltige Seiten** – optional erkennt Blattschnitt nebeneinanderliegende Spalten und
  legt sie nacheinander auf Seiten.
- **Formate** – A4, A5, A3, Letter; hoch oder quer; Rand einstellbar; Inhaltsgröße an
  Seitenbreite, Originalgröße oder Prozent.
- **Bildaufbereitung** – 100–300 dpi, PNG oder JPEG, Hintergrund weißen (Lineaturen
  verschwinden), Tinte kräftiger, Graustufen, dunkle OneNote-Themen automatisch invertieren.
- **Kopfzeile & Seitenzahlen** – Name, Klasse, Fach, Titel und Datum; „Seite x von y“.
- **Unsichtbare Textebene** – vorhandener Text aus dem OneNote-Export bleibt im PDF
  durchsuchbar und markierbar (für die Lehrerin praktisch).
- **Word-Export (.docx)** – eine Seite je Abschnitt, mit Kopf- und Fußzeile; optional der
  erkannte Text als Anhang zum Weiterbearbeiten.
- **Bilder als ZIP** – jede fertige Seite als PNG/JPEG.
- **Mehrere Dateien** – mehrere Exporte gleichzeitig laden, zusammenführen oder getrennt
  ausgeben; auch PNG/JPG-Screenshots werden akzeptiert.
- **Voreinstellungen** – „Für die Lehrerin“, „Kleinste Datei“, „Beste Qualität“;
  Einstellungen werden im Browser gemerkt.
- **Teilen** – am Handy direkt in Mail, WhatsApp, AirDrop …
- **PWA** – auf dem Homescreen installierbar, funktioniert nach dem ersten Aufruf auch
  offline. Hell/Dunkel-Modus.

## So kommt die Seite auf GitHub Pages

1. Neues Repository anlegen (z. B. `blattschnitt`), alle Dateien aus diesem Ordner hochladen
   (`index.html`, `manifest.webmanifest`, `sw.js`, `icons/`, `README.md`).
2. Im Repository auf **Settings → Pages**.
3. Unter *Build and deployment* **Source: Deploy from a branch** wählen,
   Branch **main**, Ordner **/ (root)**, dann **Save**.
4. Nach ein bis zwei Minuten ist die Seite unter
   `https://<benutzername>.github.io/blattschnitt/` erreichbar.

Es wird kein Build-Schritt gebraucht – die Bibliotheken (pdf.js, pdf-lib, docx, JSZip)
kommen von cdnjs/jsDelivr und werden vom Service Worker für die Offline-Nutzung zwischengespeichert.

## So exportierst du aus OneNote

**iPad:** Seite öffnen → Teilen-Symbol → **PDF exportieren** (oder „Seite als PDF senden“) →
Datei sichern → in Blattschnitt laden.
Alternativ funktioniert auch ein langer Screenshot (PNG/JPG).

## Datenschutz

Alles läuft im Browser (Canvas + JavaScript). Es gibt keinen Server, keine Analyse-Skripte,
keine Cookies. Die Einstellungen liegen ausschließlich im `localStorage` deines Browsers.

## Technik

- Rendering: [pdf.js](https://mozilla.github.io/pdf.js/) 3.11
- PDF-Erzeugung: [pdf-lib](https://pdf-lib.js.org/) 1.17
- Word: [docx](https://docx.js.org/) 9.7
- ZIP: [JSZip](https://stuk.github.io/jszip/) 3.10
- Schriften: Space Grotesk, Inter (Google Fonts, mit System-Fallback)

Getestet mit Safari (iOS/iPadOS), Chrome und Firefox. Sehr lange Seiten werden in Kacheln
gerendert, damit auch iPad-Canvas-Limits eingehalten werden.
