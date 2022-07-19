import Modifier from 'ember-modifier';

export type Metadata = {
  dimension: 'aspectRatio' | 'height' | 'width';
  max: number;
  min: number;
};

export type Features = {
  [featureName: string]: Metadata;
};

export type Dimensions = {
  aspectRatio: number;
  height: number;
  width: number;
};

export type QueryResults = {
  [featureName: string]: boolean;
};

interface ContainerQueryModifierSignature {
  Args: {
    Named: {
      dataAttributePrefix?: string;
      debounce?: number;
      features?: Features;
    };
    Positional: [];
  };
  Element: Element;
}

export default class ContainerQueryModifier extends Modifier<ContainerQueryModifierSignature> {
  dimensions!: Dimensions;
  queryResults!: QueryResults;

  get dataAttributePrefix(): string {
    return this.args.named.dataAttributePrefix ?? 'container-query';
  }

  get debounce(): number {
    return this.args.named.debounce ?? 0;
  }

  get features(): Features {
    return this.args.named.features ?? {};
  }

  modify(element: Element): void {
    this.queryContainer(element);
  }

  private queryContainer(element: Element): void {
    this.measureDimensions(element);
    this.evaluateQueries();
    this.setDataAttributes(element);
  }

  private measureDimensions(element: Element): void {
    const height = element.clientHeight;
    const width = element.clientWidth;

    this.dimensions = {
      aspectRatio: width / height,
      height,
      width,
    };
  }

  private evaluateQueries(): void {
    const queryResults = {} as QueryResults;

    for (const [featureName, metadata] of Object.entries(this.features)) {
      const { dimension, min, max } = metadata;
      const value = this.dimensions[dimension];

      queryResults[featureName] = min <= value && value < max;
    }

    this.queryResults = queryResults;
  }

  private setDataAttributes(element: Element): void {
    const prefix = this.dataAttributePrefix;

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
      } else {
        element.removeAttribute(attributeName);
      }
    }
  }
}
