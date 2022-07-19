import Modifier from 'ember-modifier';

export type Metadata = {
  dimension: 'aspectRatio' | 'height' | 'width';
  max: number;
  min: number;
};

export type Features = {
  [featureName: string]: Metadata;
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
    const { dataAttributePrefix, debounce, features } = this;

    console.log(element);
    console.table({ dataAttributePrefix, debounce, features });
  }
}
