import Component from '@glimmer/component';
import { Dimensions, Features, IndexSignatureParameter, QueryResults } from "../modifiers/container-query.js";
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
    Element: HTMLElement;
}
declare class ContainerQueryComponent<T extends IndexSignatureParameter> extends Component<ContainerQuerySignature<T>> {
    dimensions?: Dimensions;
    queryResults?: QueryResults<T>;
    tagName: string;
    updateState({ dimensions, queryResults, }: {
        dimensions: Dimensions;
        queryResults: QueryResults<T>;
    }): void;
}
export { ContainerQueryComponent as default };
//# sourceMappingURL=components/container-query.d.ts.map