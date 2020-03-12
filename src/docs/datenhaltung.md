## YAML

Wir schreiben unsere Daten nicht mehr ins JSON-Format, sondern in YAML. Das hat den großen Vorteil, übersichtlicher zu sein und keine Klammern zu benötigen.
Es hat aber auch den Nachteil, auf Whitespace und Einrückungen angewiesen zu sein. Sollten also Daten nicht ankommen, schaut dringend als Erstes nach, ob die Einrückung stimmt. Zu weit nach links oder rechts wird die Daten unerreichbar machen.

Für den Transport zwischen YAML und JSON gibt es zwei nette Online-Tools:

1. [Von JSON nach YAML konvertieren](https://www.json2yaml.com/)
2. [Von YAML nach JSON konvertieren](https://www.json2yaml.com/convert-yaml-to-json)

## Lokale Daten

Grundsätzlich bekommt jedes Modul seine eigenen Daten. Kompliziert wird es, wenn man Daten in die Tiefe durchreichen möchte. Denn schliesslich sind manchmal Templates in Templates in Templates geschachtelt.

## Zentrale Daten

Es gibt eine einfache Möglichkeit, eine zentrale Datendatei zu erstellen. Ich habe das Verzeichnis **_data** erstellt, darin dann eine versteckte Handlebars-Datei. Diese hat keinen Inhalt, wird aber zwingend benötigt, damit die beigefügte Config-Datei innerhalb des Systems registriert wird.

In der sie begleitenden Config-Datei können global ansprechbare Inhalte abgelegt werden. Diese werden in den jeweiligen lokalen Config-Dateien folgendermassen angesprochen:

    context:
        autor-name: "@data.autor-name"

Es kann auch ein ganzer zusammenhängender Variablen-Komplex angesprochen werden. Im Beispiel hat die Variable `image` diverse Unterausprägungen, wie `image.alttext` oder `image.w320`:

    context:
        image: "@data.image-1-1"
