import { _ as _applyDecoratedDescriptor, a as _initializerDefineProperty, b as _defineProperty } from '../applyDecoratedDescriptor-fa858ac4.js';
import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';
import { inject } from '@ember/service';
import Modifier from 'ember-modifier';

var _class, _descriptor;
let ContainerQueryModifier = (_class = class ContainerQueryModifier extends Modifier {
  get dataAttributePrefix() {
    return this._named.dataAttributePrefix ?? 'container-query';
  }
  get debounce() {
    return this._named.debounce ?? 0;
  }
  get features() {
    return this._named.features ?? {};
  }
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "resizeObserver", _descriptor, this);
    _defineProperty(this, "dimensions", void 0);
    _defineProperty(this, "queryResults", void 0);
    _defineProperty(this, "_dataAttributes", []);
    _defineProperty(this, "_element", void 0);
    _defineProperty(this, "_named", void 0);
    registerDestructor(this, () => {
      this.resizeObserver.unobserve(this._element, this.onResize);
    });
  }
  modify(element, _positional, named) {
    this._named = named;
    this.registerResizeObserver(element);
    this.queryContainer(element);
  }
  onResize(resizeObserverEntry) {
    const element = resizeObserverEntry.target;
    if (this.debounce > 0) {
      debounce(this, this.queryContainer, element, this.debounce);
      return;
    }
    this.queryContainer(element);
  }
  registerResizeObserver(element) {
    this.resizeObserver.unobserve(this._element, this.onResize);
    this._element = element;
    this.resizeObserver.observe(this._element, this.onResize);
  }
  queryContainer(element) {
    this.measureDimensions(element);
    this.evaluateQueries();
    this.resetDataAttributes(element);
    this.setDataAttributes(element);
    this._named.onQuery?.({
      dimensions: this.dimensions,
      queryResults: this.queryResults
    });
  }
  measureDimensions(element) {
    const height = element.clientHeight;
    const width = element.clientWidth;
    this.dimensions = {
      aspectRatio: width / height,
      height,
      width
    };
  }
  evaluateQueries() {
    const queryResults = {};
    for (const [featureName, metadata] of Object.entries(this.features)) {
      const {
        dimension,
        min,
        max
      } = metadata;
      const value = this.dimensions[dimension];
      queryResults[featureName] = min <= value && value < max;
    }
    this.queryResults = queryResults;
  }
  resetDataAttributes(element) {
    this._dataAttributes.forEach(dataAttribute => {
      element.removeAttribute(dataAttribute);
    });
    this._dataAttributes = [];
  }
  setDataAttributes(element) {
    const prefix = this.dataAttributePrefix;
    for (const [featureName, meetsFeature] of Object.entries(this.queryResults)) {
      if (!meetsFeature) {
        continue;
      }
      const dataAttribute = prefix ? `data-${prefix}-${String(featureName)}` : `data-${String(featureName)}`;
      element.setAttribute(dataAttribute, '');
      this._dataAttributes.push(dataAttribute);
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "resizeObserver", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "onResize", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onResize"), _class.prototype)), _class);

export { ContainerQueryModifier as default };
//# sourceMappingURL=container-query.js.map
