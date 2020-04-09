/* jshint esversion: 7 */

import { Controller } from "stimulus";

export default class ComponentController extends Controller {
  connect() {
    console.info("[Controller Attached]", this);
  }
}
