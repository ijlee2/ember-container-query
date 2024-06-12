/*
  Do not allow ember-qunit to resize the viewport! Resizing the viewport causes
  issues with tests and Percy snapshots for this addon.

  https://github.com/emberjs/ember-qunit/blob/v8.1.0/addon/src/test-container-styles.css#L33
*/
export function resetViewport(hooks: NestedHooks): void {
  hooks.beforeEach(function () {
    const testingContainer = document.getElementById(
      'ember-testing-container',
    )!;

    testingContainer.classList.add('ember-testing-container-full-screen');
  });
}
