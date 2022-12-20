import { ModifierLike } from '@glint/template';
import type { Data } from 'dummy/utils/components/widgets/widget-2';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'draw-stacked-chart': ModifierLike<{
      Args: {
        Named: {
          data?: Array<Data>;
        };
      };
      Element: Element;
    }>;
  }
}
