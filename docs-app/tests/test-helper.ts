import { setApplication } from '@ember/test-helpers';
import Application from 'docs-app/app';
import config from 'docs-app/config/environment';
import { setRunOptions } from 'ember-a11y-testing/test-support';
import { setupEmberOnerrorValidation, start as qunitStart } from 'ember-qunit';
import QUnit from 'qunit';
import { setup } from 'qunit-dom';

export function start(): void {
  setApplication(Application.create(config.APP));
  setRunOptions({
    rules: {
      'scrollable-region-focusable': {
        enabled: false,
      },
    },
  });
  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  qunitStart();
}
