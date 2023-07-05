import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../_rollupPluginBabelHelpers-e795903d.js';
import { setComponentTemplate } from '@ember/component';
import { T as TEMPLATE } from '../container-query.hbs-1b00a8f0.js';
import './container-query.css';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

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
