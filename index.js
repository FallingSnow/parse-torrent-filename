'use strict';

import core from "./core.js";
import "./parts/common.js";
import "./parts/title.js";
import "./parts/excess.js";

export default function ptn(name, customPatterns, customTypes) {
  return core.exec(name, customPatterns, customTypes);
}

ptn.configure = function(customPatterns, customTypes) {
  core.configure(customPatterns, customTypes);
};
