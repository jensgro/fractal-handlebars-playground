"use strict";

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = (module.exports = require("@frctl/fractal").create());
const mandelbrot = require("@frctl/mandelbrot");

/* Set the title of the project */
fractal.set("project.title", "Test Component Library");

/* Tell Fractal where the components will live */
fractal.components.set("path", __dirname + "/src/components");
fractal.components.set("default.preview", "@preview--default");
fractal.components.set("ext", ".hbs");
/* Tell Fractal where the documentation pages will live */
fractal.docs.set("path", __dirname + "/src/docs");

/* Specify a directory of static assets */
fractal.web.set("static.path", __dirname + "/dist");

/* Set the static HTML build destination */
fractal.web.set("builder.dest", __dirname + "/build");

const hbs = require("@frctl/handlebars")({
  helpers: {
    times: function(n, block) {
      var accum = "";
      for (var i = 0; i < n; ++i) accum += block.fn(i);
      return accum;
    }
  }
  /* other configuration options here */
});

/* set as the default template engine for components */
const instance = fractal.components.engine(hbs);

/*
 * Define potential Statuses for components.
 */
fractal.components.set("statuses", {
  prototype: {
    label: "Prototype",
    description: "Do not implement",
    color: "#FF4136"
  },
  wip: {
    label: "WIP",
    description: "Work in progress. Implement with caution",
    color: "#FFDC00"
  },
  ready: {
    label: "Ready",
    description: "Ready to implement",
    color: "#2ECC40"
  },
  exported: {
    label: "Exported",
    description: "Exported to the working project",
    color: "#01FF70"
  },
  tbd: {
    label: "TBD",
    description: "To Be Done",
    color: "#a20000"
  },
  note: {
    label: "Read Note",
    description: "Wichtige Hinweise in den Notes",
    color: "#ff3292",
    oldcolor: "#B95F89"
  }
});

fractal.components.set("default.status", "tbd");

// create a new instance with custom config options
const myCustomisedTheme = mandelbrot({
  "skin": "maroon",
  "nav": ["docs", "components"], // show docs above components in the sidebar
  "panels": ["html", "view", "context", "info", "notes", "resources"]
});

fractal.web.theme(myCustomisedTheme); // tell Fractal to use the configured theme by default
