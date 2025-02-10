import { setApplication } from '@ember/test-helpers';
import Application from 'docs-app/app';
import config from 'docs-app/config/environment';
import { setRunOptions } from 'ember-a11y-testing/test-support';
import { setupEmberOnerrorValidation, start } from 'ember-qunit';
import { loadTests } from 'ember-qunit/test-loader';
import QUnit from 'qunit';
import { setup } from 'qunit-dom';

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
loadTests();
start();
