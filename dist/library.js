'use strict';

var vue = require('vue');

const _hoisted_1 = { type: "text" };

function render(_ctx, _cache) {
  return (vue.openBlock(), vue.createElementBlock("input", _hoisted_1))
}

const script = {};


script.render = render;
script.__file = "src/KsInput.vue";

var components = { KsInput: script };

const plugin = {
  install(Vue) {
    for (const prop in components) {
      if (components.hasOwnProperty(prop)) {
        const component = components[prop];
        Vue.component(component.name, component);
      }
    }
  }
};

module.exports = plugin;
