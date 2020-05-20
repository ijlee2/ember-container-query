import { assert } from '@ember/debug';
import percySnapshot from '@percy/ember';

const DEVICES = {
  '400,300': 'w1-h1',
  '900,300': 'w2-h1',
  '1400,300': 'w3-h1',

  '400,600': 'w1-h2',
  '900,600': 'w2-h2',
  '1400,600': 'w3-h2',

  '400,900': 'w1-h3',
  '900,900': 'w2-h3',
  '1400,900': 'w3-h3'
};

const supportedDevices = Object.values(DEVICES);
const supportedFilters = /(@w1\s+|@w2\s+|@w3\s+|@h1\s+|@h2\s+|@h3\s+)/g;


/*
  `takeSnapshot` is designed to ensure that,

  - Percy snapshot respects the test window width.
  - Percy snapshots have unique names when a test can be run on multiple devices.


  Examples:

  // Pass `assert` to capture a user's workflow.
  test('A user can visit the homepage', async function(assert) {
    await visit('/');
    await takeSnapshot(assert);
  });

  // Pass `description` to capture many steps of a user's workflow.
  // Pass `only` to allow snapshots on some devices.
  test('A user can create an account', async function(assert) {
    ...

    await takeSnapshot(assert, {
      description: 'Fills out form'
    });

    await click('[data-test-button="Submit"]');

    await takeSnapshot(assert, {
      description: 'Sees success toast',
      only: ['w3-h3']
    });

    ...
  });
*/
export default async function takeSnapshot(qunitAssert, options = {}) {
  checkInput(qunitAssert, options);

  const { description, only } = options;
  const skipSnapshot = only && !only.includes(getDevice());

  if (skipSnapshot) {
    return;
  }

  const name = getName(qunitAssert, description);
  const { height, width } = getWindowSize();

  await percySnapshot(name, {
    widths: [width],
    minHeight: height
  });
}


function checkInput(qunitAssert, options) {
  const { description, only } = options;

  assert(
    '`qunitAssert` must be QUnit\'s assert object.',
    typeof qunitAssert === 'object' && !!qunitAssert.test
  );

  if (description !== undefined) {
    assert(
      '`options.description` must be a string.',
      typeof description === 'string'
    );

    assert(
      '`options.description` cannot be empty.',
      description !== ''
    );
  }

  if (only !== undefined) {
    assert(
      '`options.only` must be an array of strings.',
      Array.isArray(only)
    );

    assert(
      '`options.only` cannot be empty.',
      only.length >= 1
    );

    const listOfSupportedDevices = supportedDevices
      .map(device => `'${device}'`)
      .join(', ');

    assert(
      `\`options.only\` cannot include strings other than ${listOfSupportedDevices}.`,
      only.every(device => supportedDevices.includes(device))
    );
  }
}


function getDevice() {
  const { height, width } = getWindowSize();

  const windowSize = `${width},${height}`;
  const device = DEVICES[windowSize];

  assert(
    `The window size is incorrect. Found ${windowSize}.`,
    !!device
  );

  return device;
}


/*
  `getName` creates the snapshot name in the following format:

    @<device> ◆ <testName> - <description> ◆ <moduleName>

  Snapshot names are guaranteed to be unique if a test takes a snapshot
  and the test can be run on multiple devices.
*/
function getName(qunitAssert, description) {
  const moduleName = qunitAssert.test?.module?.name;
  const testName = qunitAssert.test?.testName;

  let name = testName;

  if (description) {
    name += ` - ${description}`;
  }

  name += ` ◆ ${moduleName}`;

  const appliedFilters = name.match(supportedFilters)
    .map(appliedFilter => appliedFilter.trim())
    .join(' ');

  return `${appliedFilters} ◆ ${name.replace(supportedFilters, '')}`;
}


function getWindowSize() {
  const queryParams = new URLSearchParams(window.location.search);

  return {
    height: Number(queryParams.get('height')),
    width: Number(queryParams.get('width'))
  };
}