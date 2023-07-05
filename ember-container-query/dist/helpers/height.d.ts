/// <reference types="ents" />
import { Metadata } from "../modifiers/container-query.js";
declare const HeightHelper: import("@ember/component/helper").FunctionBasedHelper<{
    Args: {
        Positional: [];
        Named: {
            max?: number | undefined;
            min?: number | undefined;
        };
    };
    Return: Metadata;
}>;
export { HeightHelper as default };
