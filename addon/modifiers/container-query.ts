import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import { debounce as _debounce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Modifier, { ArgsFor, NamedArgs, PositionalArgs } from 'ember-modifier';

type IndexSignatureParameter = string | number | symbol;
type ObjectEntry<T> = [keyof T, T[keyof T]];
type ObjectEntries<T> = Array<ObjectEntry<T>>;

type Dimensions = {
  aspectRatio: number;
  height: number;
  width: number;
};

type Metadata = {
  dimension: keyof Dimensions;
  max: number;
  min: number;
};

type Features<T extends IndexSignatureParameter> = Record<T, Metadata>;

type QueryResults<T extends IndexSignatureParameter> = Record<T, boolean>;

interface ContainerQueryModifierSignature<T extends IndexSignatureParameter> {
  Args: {
    Named: {
      dataAttributePrefix?: string;
      debounce?: number;
      features?: Features<T>;
      onQuery?: ({
        dimensions,
        queryResults,
      }: {
        dimensions: Dimensions;
        queryResults: QueryResults<T>;
      }) => void;
    };
    Positional: [];
  };
  Element: Element;
}

export default class ContainerQueryModifier<
  T extends IndexSignatureParameter
> extends Modifier<ContainerQueryModifierSignature<T>> {
  @service private declare readonly resizeObserver;

  dimensions!: Dimensions;
  queryResults!: QueryResults<T>;

  private _dataAttributes: Array<string> = [];
  private _element?: Element;
  private _named!: NamedArgs<ContainerQueryModifierSignature<T>>;

  get dataAttributePrefix(): string {
    return this._named.dataAttributePrefix ?? 'container-query';
  }

  get debounce(): number {
    return this._named.debounce ?? 0;
  }

  get features(): Features<T> {
    return this._named.features ?? ({} as Features<T>);
  }

  constructor(
    owner: unknown,
    args: ArgsFor<ContainerQueryModifierSignature<T>>
  ) {
    super(owner, args);

    registerDestructor(this, () => {
      this.resizeObserver.unobserve(this._element, this.onResize);
    });
  }

  modify(
    element: Element,
    _positional: PositionalArgs<ContainerQueryModifierSignature<T>>,
    named: NamedArgs<ContainerQueryModifierSignature<T>>
  ): void {
    this._named = named;

    this.registerResizeObserver(element);
    this.queryContainer(element);
  }

  @action private onResize(resizeObserverEntry: ResizeObserverEntry): void {
    const element = resizeObserverEntry.target;

    if (this.debounce > 0) {
      _debounce(this, this.queryContainer, element, this.debounce);
      return;
    }

    this.queryContainer(element);
  }

  private registerResizeObserver(element: Element): void {
    this.resizeObserver.unobserve(this._element, this.onResize);

    this._element = element;
    this.resizeObserver.observe(this._element, this.onResize);
  }

  private queryContainer(element: Element): void {
    this.measureDimensions(element);
    this.evaluateQueries();
    this.resetDataAttributes(element);
    this.setDataAttributes(element);

    this._named.onQuery?.({
      dimensions: this.dimensions,
      queryResults: this.queryResults,
    });
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
    const queryResults = {} as QueryResults<T>;

    for (const [featureName, metadata] of Object.entries(
      this.features
    ) as ObjectEntries<Features<T>>) {
      const { dimension, min, max } = metadata;
      const value = this.dimensions[dimension];

      queryResults[featureName] = min <= value && value < max;
    }

    this.queryResults = queryResults;
  }

  private resetDataAttributes(element: Element): void {
    this._dataAttributes.forEach((dataAttribute) => {
      element.removeAttribute(dataAttribute);
    });

    this._dataAttributes = [];
  }

  private setDataAttributes(element: Element): void {
    const prefix = this.dataAttributePrefix;

    for (const [featureName, meetsFeature] of Object.entries(
      this.queryResults
    ) as ObjectEntries<QueryResults<T>>) {
      if (!meetsFeature) {
        continue;
      }

      const dataAttribute = prefix
        ? `data-${prefix}-${String(featureName)}`
        : `data-${String(featureName)}`;

      element.setAttribute(dataAttribute, '');

      this._dataAttributes.push(dataAttribute);
    }
  }
}

export {
  Dimensions,
  Features,
  IndexSignatureParameter,
  Metadata,
  QueryResults,
};
