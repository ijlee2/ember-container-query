/// <reference types="ents" />
import Owner from '@ember/owner';
import Modifier from 'ember-modifier';
import { ArgsFor, NamedArgs, PositionalArgs } from "ember-modifier";
type IndexSignatureParameter = string | number | symbol;
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
            onQuery?: ({ dimensions, queryResults, }: {
                dimensions: Dimensions;
                queryResults: QueryResults<T>;
            }) => void;
        };
        Positional: [];
    };
    Element: Element;
}
declare class ContainerQueryModifier<T extends IndexSignatureParameter> extends Modifier<ContainerQueryModifierSignature<T>> {
    private readonly resizeObserver;
    dimensions: Dimensions;
    queryResults: QueryResults<T>;
    private _dataAttributes;
    private _element?;
    private _named;
    get dataAttributePrefix(): string;
    get debounce(): number;
    get features(): Features<T>;
    constructor(owner: Owner, args: ArgsFor<ContainerQueryModifierSignature<T>>);
    modify(element: Element, _positional: PositionalArgs<ContainerQueryModifierSignature<T>>, named: NamedArgs<ContainerQueryModifierSignature<T>>): void;
    private onResize;
    private registerResizeObserver;
    private queryContainer;
    private measureDimensions;
    private evaluateQueries;
    private resetDataAttributes;
    private setDataAttributes;
}
export { ContainerQueryModifier as default, Dimensions, Features, IndexSignatureParameter, Metadata, QueryResults };
