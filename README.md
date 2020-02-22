# Eine Webseite modular in einer Pattern Library aufbauen

Dieses Projekt ist ein Grundlage, um mittels der Pattern Library [Fractal](https://fractal.build) eine Website zu konstruieren. 

## Templatesystem

Um sich die Arbeit zu erleichtern und unterschiedliche Varianten mit unterschiedlichen Inhalten schnell erstellen zu können, bietet sich die Verwendung eines Templatesystems an. In dieser Demo ist [Handlebars](https://handlebarsjs.com/) installiert. 

## Sass

Um die Arbeit mit CSS zu erleichtern nutze ich **Sass** und **Autoprefixer**, ein PostCSS-Plugin. Autoprefixer sorgt dafür, dass Vendor-Prefixes geschrieben werden, wenn sie benötigt werden.

## Bootstrap

Nur zur Vorsicht und um "Spielcode" zu haben, habe ich auch Bootstrap in das Projekt integriert. Es handelt sich hierbei nur um eine Option, keinesfalls einen integralen Bestandteil des Projektes.

## Gulp

Um Sass auszugeben, einen virtuellen Server mit Fractal zu bekommen und einen Watch-Prozess während der Arbeit zu haben, nutzen wir Gulp. Wenn die aktuelle Gulp-Version noch nicht lokal installiert ist, gib bitte auf der Kommandozeile folgendes ein:

````
npm i -g gulp-cli
````

## Installation des Projektes

Um das Projekt als solches zu installieren, den Quellcode bitte per ``git clone`` herunterladen oder direkt als **ZIP**-File. Danach auf der obersten Ebene des Projektes bitte folgendes eingeben:

````
npm i
````

Nachdem alle Abhängigkeiten installiert sind, bitte einmal folgendes auf der Kommandozeile  eingeben:

````
npm run installbs
````

Dadurch werden alle SCSS-Dateien von Bootstrap in den lokalen SCSS-Ordner kopiert. Dadurch können wir später mit Bootstrap arbeiten, wenn wir wünschen.

## Arbeit mit Sass

Auf die Bootstrap-Dateien kann selbstverständlich auch aus der anderen SCSS-Datei referenziert werden. Das Basis-CSS "Reboot" ist sicherlich auch ausserhalb von Bootstrap interessant, ebenso das Grid-System.

Der Watcher ist so konfiguriert, dass er jede Änderung in einer SCSS-Datei innerhalb des gesamten Projektes erkennt (also innerhalb von "src"). Somit ist es Sache des Entwicklers zu entscheiden, ob die SCSS-Dateien an einem zentralen Ort oder immer zusammen mit der HTML/Handlebars-Datei abgelegt werden sollen. 

## Die wichtigsten Befehle auf der Kommandozeile

Das gesamte Projekt installieren/initialisieren.

````
npm i 
```` 
Die SCSS-Dateien von Bootstrap ins lokale Verzeichnis kopieren. Muss nur einmal (am Anfang) ausgeführt werden. 
````
npm run installbs
```` 
Sollte Bootstrap eine Aktualisierung erfahren, bietet sich diese Kombination aus zwei Befehlen an:

````
npm update bootstrap && npm run installbs
```` 
Diese Codezeile sollte die Basis der normalen Arbeit sein:
````
npm run sync
```` 
Damit wird Fractal mit einem Server gestartet. Fracatal achtet auf Änderungen an den HTML-, Handlebars- und Data-Files. Und ein zusätzlicher Watcher achtet auf SCSS-Änderungen. Beides gibt es auch als separate Tasks, die dann in zwei separaten Terminalfenstern ausgeführt werden müssen:

````
npm run start
```` 
````
npm run watch
```` 
Sollen ohne einen Watcher einfach die ``styles.css`` oder die Bootstrap-CSS ausgegeben werden, gibt es folgende Befehle:
````
npm run build:css
```` 
````
npm run build:bs4
```` 
Wenn das Ausgabeverzeichnis ``dist`` gelöscht werden soll, kann dies auch mittels eines kleinen Befehls geschehen:
````
npm run clear
```` 

## Alternativen?

Das ist alles nur der Anfang eines hoffentlich größeren Abenteuers/Projektes.
Ich habe im Jahr 2019 zwei weitere Pattern-Libraries getestet und meine ersten, recht schnell gewonnenen Eindrücke zusammen mit meinem Test dokumentiert und zu Github hochgeladen. Es gab auch jeweils später Antworten auf meine Kommentare von den Maintainern. Diese sind im aktuellen Stand der Repos sichtbar:

- [Malvid-Experiment](https://github.com/jensgro/malvid-experiment)
- [UIEngine-Test](https://github.com/jensgro/uiengine-test)
