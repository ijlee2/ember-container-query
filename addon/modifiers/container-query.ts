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

    console.log(this.dimensions);
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
}
