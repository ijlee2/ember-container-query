import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget4MemoHeaderSignature {
  Args: {
    cqFeatures?: Record<'small' | 'large' | 'short', boolean>;
  };
}

const WidgetsWidget4MemoHeaderComponent =
  templateOnlyComponent<WidgetsWidget4MemoHeaderSignature>();

export default WidgetsWidget4MemoHeaderComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Header': typeof WidgetsWidget4MemoHeaderComponent;
  }
}
