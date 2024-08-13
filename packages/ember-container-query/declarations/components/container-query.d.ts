import './container-query.css';
import Component from '@glimmer/component';
import type { Dimensions, Features, IndexSignatureParameter, QueryResults } from '../modifiers/container-query.ts';
interface ContainerQuerySignature<T extends IndexSignatureParameter> {
    Args: {
        dataAttributePrefix?: string;
        debounce?: number;
        features?: Features<T>;
        tagName?: string;
    };
    Blocks: {
        default: [
            {
                dimensions?: Dimensions;
                features?: QueryResults<T>;
            }
        ];
    };
    Element: Element;
}
export default class ContainerQueryComponent<T extends IndexSignatureParameter> extends Component<ContainerQuerySignature<T>> {
    dimensions?: Dimensions;
    queryResults?: QueryResults<T>;
    tagName: string;
    updateState({ dimensions, queryResults, }: {
        dimensions: Dimensions;
        queryResults: QueryResults<T>;
    }): void;
}
export {};
//# sourceMappingURL=container-query.d.ts.map