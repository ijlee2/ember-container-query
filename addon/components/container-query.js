import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { debounce } from '@ember/runloop';

export default class ContainerQueryComponent extends Component {
  @tracked queryResults = {};
  @tracked aspectRatio;
  @tracked height;
  @tracked width;

  get features() {
    return this.args.features ?? {};
  }

  get dataAttributePrefix() {
    return this.args.dataAttributePrefix ?? 'container-query';
  }

  get debounce() {
    return this.args.debounce ?? 0;
  }

  dataAttributes = [];

  // The dynamic tag is restricted to be immutable
  tagName = this.args.tagName ?? 'div';

  @action onResize(resizeObserverEntry) {
    const element = resizeObserverEntry.target;

    if (this.debounce > 0) {
      debounce(this, this.queryContainer, element, this.debounce);
      return;
    }

    this.queryContainer(element);
  }

  @action queryContainer(element) {
    this.resetDataAttributes(element);
    this.measureDimensions(element);
    this.evaluateQueries();
    this.setDataAttributes(element);
  }

  resetDataAttributes(element) {
    for (const dataAttribute of this.dataAttributes) {
      element.removeAttribute(dataAttribute);
    }
  }

  measureDimensions(element) {
    this.height = element.clientHeight;
    this.width = element.clientWidth;
    this.aspectRatio = this.width / this.height;
  }

  evaluateQueries() {
    const queryResults = {};

    for (const [featureName, metadata] of Object.entries(this.features)) {
      const { dimension, min, max } = metadata;
      const value = this[dimension];

      queryResults[featureName] = min <= value && value < max;
    }

    this.queryResults = queryResults;
  }

  setDataAttributes(element) {
    const prefix = this.dataAttributePrefix;
    const dataAttributes = [];

    for (const [featureName, meetsFeature] of Object.entries(
      this.queryResults
    )) {
      let attributeName;

      if (prefix) {
        attributeName = `data-${prefix}-${featureName}`;
      } else {
        attributeName = `data-${featureName}`;
      }

      if (meetsFeature) {
        element.setAttribute(attributeName, '');
        dataAttributes.push(attributeName);
      } else {
        element.removeAttribute(attributeName);
      }
    }

    this.dataAttributes = dataAttributes;
  }
}
