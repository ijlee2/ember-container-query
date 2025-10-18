import type { TOC } from '@ember/component/template-only';

import styles from './page.module.css';

interface UiPageSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [];
  };
}

const UiPage: TOC<UiPageSignature> = <template>
  <div class={{styles.container}}>
    <h1 class={{styles.title}} data-test-page-title>
      {{@title}}
    </h1>

    <div
      class={{styles.content}}
      data-test-page-content
      id="main-content"
      tabindex="-1"
    >
      {{yield}}
    </div>
  </div>
</template>;

export default UiPage;
