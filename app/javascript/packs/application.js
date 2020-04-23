/* jshint esversion: 7 */

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

import Rails from "@rails/ujs";

function findComponent(name) {
  return new Promise((resolve, reject) => {
    console.log("in promise", name);
    import(`components/${name}`).then((module) => {
      resolve(module.default);
    }).catch(() => {
      console.log("returning default");
      resolve(HTMLElement);
    });
  });
}

// import("components/test3").then((module) => {
//   const f = module.default;
//   f();
// }).catch(() => console.log("import fail"));

document.addEventListener("turbolinks:load", () => {
  console.info("[Registering Component System]");

  // functional components for browser actions
  customElements.define("push-notifications", class extends HTMLElement {
    constructor() {
      super();
      
      if (Notification.permission === "granted") {
        this.attachShadow({ mode: "open" });
      } else {
        let action = this.getAttribute("action");
        if (action === "request") {
          this.addEventListener("click", (event) => {
            event.preventDefault();
            Notification.requestPermission().then((permission) => {
              if (!('permission' in Notification)) {
                Notification.permission = permission;
              }

              // hide the element by displaying a blank shadow tree.
              if (permission === "granted") {
                this.attachShadow({ mode: "open" });
              }
            });
          });
        }
      }
    }
  });

  document.querySelectorAll("template[data-component]").forEach((template) => {
    console.log(template);
    findComponent(template.id).then((component) => {
      console.log(component);
      customElements.define(template.id, class extends component {
        constructor() {
          super();
          this.attachShadow({ mode: "open" })
            .appendChild(template.content.cloneNode(true));
          console.info("[Component Generated]", this);
        }
      });
    });
  });
});
