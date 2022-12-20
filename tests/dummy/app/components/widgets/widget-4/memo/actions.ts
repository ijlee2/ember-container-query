import templateOnlyComponent from '@ember/component/template-only';

export interface WidgetsWidget4MemoActionsComponentSignature {
  Args: {
    cqFeatures?: Record<'small' | 'large' | 'short', boolean>;
  };
}

const WidgetsWidget4MemoActionsComponent =
  templateOnlyComponent<WidgetsWidget4MemoActionsComponentSignature>();

export default WidgetsWidget4MemoActionsComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Actions': typeof WidgetsWidget4MemoActionsComponent;
  }
}
