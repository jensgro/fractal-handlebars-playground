---
title: Handlebars
---

## Verlinkung von Modulen und Modulteilen

Fractal hat die normale Referenzierung von [Handlebars](https://handlebarsjs.com/guide/) modifiziert. Jede Komponente hat einen eindeutigen Handle, der sich aus dem Varianten- oder Dateinamen ergibt und dem ein `@` vorangestellt wird. Sollten also mehrere Dateien gleichen Namens existieren, muss man in fractal im Info-Reiter nach dem Handle schauen. 

Prinzipiell stehen zwei Möglichkeiten zur Einbettung von Templates zur Verfügung.

### Nur das Template nutzen

Durch folgende Notation wird nur das View-Template inkludiert, nicht aber die Daten, die in der lokalen Konfiguration abgelegt sind:

``
\{{> @headlines--h3 }}
``

Da nur das Template genutzt wird, muss nun in der Konfigurationsdatei des importierenden Moduls Inhalt zur Verfügung gestellt werden. Das funktioniert solange einfach, wie nicht ein Modul mehrfach importiert wird.  Um dieses Problem zu beherrschen, weisen wir einem konkreten Import einen konkreten Konfigurationsteil zu:

``
\{{> @headlines--h3 h3v1 }}
``

`h3v1` ist nun ein Teil des Kontextes benannt, der nur für dieses Template zuständig ist. In der config.yaml sieht dies dann folgendermassen aus:


    context:
        h3v1:
            headline:
                level: "h3"
                text: "Vollkommen neue h3 heading"


### Das Template mit dessen Dummy-Inhalt nutzen

Durch die render-Funktion kann ein Template **mit zugehörigem Inhalt** in ein weiteres Template importiert werden:

``
\{{ render '@headlines--h3' }}
``

Auch in diesem Fall kann lokaler Code abweichend hinzugegeben werden. Die Notation sieht dann folgendermassen aus:

``
\{{ render '@headlines--h3' h3v2 merge=true }}
``

Durch die Option `merge=true` muss nicht das gesamte Template neu konfiguriert werden. Es genügt, einzelne Variablen neu zu definieren. Diese werden dann mit dem Standard zu einer neuen Einheit "gemerged". 

Beispiele hierzu finden sich [in einer Codesandbox](https://codesandbox.io/s/fractal-handlebars-templatetest-ypc8u) unter "**examples/headline-test**".

### Inhalte über mehrere Ebenen nach unten reichen

Es wird immer wieder Module geben, die andere Module mehrfach importieren. Das beste Beispiel sind hier Überschriften. Wenn man nun mit Modulen arbeitet, die andere mit der render-Funktion einbinden, dann wird es schwer, Module "der zweiten Ebene" zu überschreiben.

Bsp.:  Ein Teaser wird importiert. In dem Teasertemplate sind Absätze, Bilder und eine Überschrift. Sind all diese Elemente mit der render-Funktion eingebunden und bringen ihren eigenen Default-Inhalt mit, dann können die Überschriften nicht überschrieben werden. Einen Umweg gibt es durch die Einfügung eines neuen Datenkontextes, wie oben gesehen. Dieser kann dann angesprochen und überschrieben werden. Es ist aber wichtig, eine durchdachte und konsistente Namensrichtlinie zu haben, damit es keine Doppelungen gibt.

``
\{{ render '@info-box-test' supertest merge=true  }}
``

Innerhalb der eingebundenen Infobox sind mehrere Headlines und Absätze. Eine Headline wurde folgendermassen eingebunden:

``
\{{> '@headline--h2' h2v1 }}
``

Optional wäre:

``
\{{ render '@headline--h2' h2v2 merge=true }}
``

In der Konfigurationsdatei der alles aufrufenden Komponente steht folgender context:

````
  context: 
    supertest:
      h2v2:
        headline:
          text: "Geiler Scheiss! Es klappt!"
```` 

### Variablen in einem Loop reichen

Es kann vorkommen, dass man eine Variable in einen Loop reichen möchte. Handlebars bietet hierfür eine simple - und wenn ich recht informiert bin undokumentierte - Methode:

````
<ul class="test test-\{{list.modificator}}">
  \{{#items}}
    <li class="test-\{{../list.modificator}}__item">\{{text}}</li>
  \{{/items}}
</ul>
````

Innerhalb des Loop wird der gewünschten Variablen einfach ein ``../`` vorangestellt. 

## Keine allzu tiefen Verschachtelungen

Wir erstellen unsere Templates nicht aus Selbstzweck, sie müssen von den Kollegen noch in CMS-Templates überführt werden. Deshalb sollte unser Code für sie möglichst einfach nutzbar sein. Es verbietet sich aus diesem Grund in meinen Augen, zu kleinteilig zu arbeiten, also wie bei Atomic Design. Das folgende einfache Beispiel soll das Problenm verdeutlichen:

````
<article class="card">
  <img src="\{{ card_image }}" alt="" class="card__image">
  <div class="card__content">
    \{{> @headline card1 merge=true}}
    <p class="card__text">
      \{{ card_text }}
    </p>
  </div>
</article>
````  
In diesem Beispiel ist die Headline wunderbar ausgelagert. Aber anhand des Templates ist jetzt nicht mehr klar, wie der Code genau aussieht. Es fehlt auf dieser Ebene bspw. die Information über die Klasse der Headline. Für die Erstellung eines Templates würde sich der Aufwand also vergrößern, weil alle Einzelteile zusammengesucht werden müssen. Dies gilt es zu vermeiden.

Deshalb habe ich zwar Überschriften, Listen und Absätze als Templates abgelegt. Diese sind aber nur Füllmaterial für die späteren Seiten, niemals für die Module.

Arbeit bei der Erstellung der Module kann (und sollte) man sich hingegen erleichtern, indem ein zentraler Datensatz für Beispielinhalte genutzt wird. Diese Methode habe ich auf der Seite [Datenhaltung](datenhaltung) im Abschnitt "**Zentrale Daten**" beschrieben.

## Maskierung von HTML

Sollten in einer Variable auch HTML stehen, bspw. ein Link innerhalb eines Absatztextes, dann muss diese Variable anders als sonst innerhalb des Templates referenziert werden. Anstatt zwei geschweifter Klammern umfassen den Variablennamen dann **drei** geschweifte Klammern:

```hbs
    \{{{ variable }}}
```
## Links zu Handlebars

- [Dokumentation](https://handlebarsjs.com/guide/)
- [The hidden power of Handlebars partials](https://cloudfour.com/thinks/the-hidden-power-of-handlebars-partials/)
- [mehrteiliges Tutorial](https://code-maven.com/handlebars)
- [Write Templates Like A Node.js Pro: Handlebars Tutorial](https://webapplog.com/handlebars/)
- [Learn Handlebars in 10 Minutes or Less](https://tutorialzine.com/2015/01/learn-handlebars-in-10-minutes)
- [HANDLEBARS.JS TUTORIAL: TEMPLATING WITH HANDLEBARS](http://www.korenlc.com/handlebars-js-tutorial-templating-with-handlebars/)
- [Handlebars Custom Helpers and Chaining](https://jonathanmh.com/handlebars-custom-helpers-chaining/)
- [handlebar-layouts](https://github.com/shannonmoeller/handlebars-layouts) - Handlebars helpers which implement layout blocks similar to Jinja, Nunjucks (Swig), Pug (Jade), and Twig.
- [Getting started with handlebars (Teil 1)](https://blog.teamtreehouse.com/getting-started-with-handlebars-js)
- [Getting started with handlebars (Teil 2)](https://blog.teamtreehouse.com/handlebars-js-part-2-partials-and-helpers) - mit helpers
- [Handlebars Cookbook](https://zordius.github.io/HandlebarsCookbook/)
