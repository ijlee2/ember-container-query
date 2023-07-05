import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../_rollupPluginBabelHelpers-e795903d.js';
import { setComponentTemplate } from '@ember/component';
import { precompileTemplate } from '@ember/template-compilation';
import './container-query.css';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

var TEMPLATE = precompileTemplate("{{! @glint-ignore: ember-element-helper needs to provide Glint signature }}\n{{#let (element this.tagName) as |Tag|}}\n  <Tag\n    class=\"container-query\"\n    {{container-query\n      dataAttributePrefix=@dataAttributePrefix\n      debounce=@debounce\n      features=@features\n      onQuery=this.updateState\n    }}\n    ...attributes\n  >\n    {{yield\n      (hash\n        dimensions=this.dimensions\n        features=this.queryResults\n      )\n    }}\n  </Tag>\n{{/let}}");

var _class, _descriptor, _descriptor2;
let ContainerQueryComponent = (_class = class ContainerQueryComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "dimensions", _descriptor, this);
    _initializerDefineProperty(this, "queryResults", _descriptor2, this);
    // The dynamic tag is restricted to be immutable
    _defineProperty(this, "tagName", this.args.tagName ?? 'div');
  }
  updateState({
    dimensions,
    queryResults
  }) {
    this.dimensions = dimensions;
    this.queryResults = queryResults;
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "dimensions", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "queryResults", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "updateState", [action], Object.getOwnPropertyDescriptor(_class.prototype, "updateState"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, ContainerQueryComponent);

export { ContainerQueryComponent as default };
//# sourceMappingURL=container-query.js.map
