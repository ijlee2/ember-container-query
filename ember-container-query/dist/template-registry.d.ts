import ContainerQueryComponent from "./components/container-query.js";
import AspectRatioHelper from "./helpers/aspect-ratio.js";
import HeightHelper from "./helpers/height.js";
import WidthHelper from "./helpers/width.js";
import ContainerQueryModifier from "./modifiers/container-query.js";
interface EmberContainerQueryRegistry {
    ContainerQuery: typeof ContainerQueryComponent;
    'aspect-ratio': typeof AspectRatioHelper;
    'container-query': typeof ContainerQueryModifier;
    height: typeof HeightHelper;
    width: typeof WidthHelper;
}
export { EmberContainerQueryRegistry as default };
