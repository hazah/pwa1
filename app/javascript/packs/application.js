/* jshint esversion: 7 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start();
require("turbolinks").start();
require("@rails/activestorage").start();
require("channels");


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import { application as controllers} from "controllers";

import { Controller } from "stimulus";
import ComponentController from "controllers/component_controller";
import Rails from "@rails/ujs";

document.addEventListener("turbolinks:load", () => {
  console.info("[Registering Component System]");

  customElements.define("component-template", class extends HTMLElement {
    constructor() {
      super();
      let template = document.createElement("template");
      let stylesheet = document.querySelector("link[rel='stylesheet']").cloneNode(true);
      stylesheet.removeAttribute("data-turbolinks-track");
      template.content.appendChild(stylesheet);
      while (this.firstChild) {
        template.content.appendChild(this.firstChild);
      }
      this.appendChild(template);
    }

    connectedCallback() {
      let template = this.firstChild;
      let name = this.getAttribute("name");
      let element = null;

      customElements.define(name, class extends HTMLElement {
        constructor() {
          super();
          element = this;
          this.attachShadow({ mode: "open" })
            .appendChild(template.content.cloneNode(true));
          console.info("[Component Generated]", this);
        }

        connectedCallback() {
          console.info("[Attaching Controller]", this);
          this.setAttribute("data-controller", name);
        }
      });

      controllers.register(name, class extends ComponentController {
        // TODO: boilerplate
      });

      document.body.setAttribute("data-controller", "component-template");
    }
  });

  controllers.register("component-template", class extends Controller {
    connect() {
      Rails.ajax({
        type: "GET",
        url: "/",
        dataType: 'json',
        success: (result) => {
          console.info("[Generating Application Components]");
          function generateComponents(result) {
            if (typeof result === "string") {
              return [document.createElement(result)];
            } else if (Array.isArray(result)) {
              return result.map(item => document.createElement(item));
            } else {
              let elements = [];
              for (let key in result) {
                let current = document.createElement(key);
                for (let child of generateComponents(result[key])) {
                  current.appendChild(child);
                }
                elements.push(current);
              }
              return elements;
            }
          }

          for (let component of generateComponents(result)) {
            this.element.appendChild(component);
          }
          console.info("[Application Components Generated]");
        }
      });
    }
  });
  console.info("[Component System Registered]");
});
