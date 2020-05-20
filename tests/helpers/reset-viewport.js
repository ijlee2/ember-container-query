/*
  Do not allow ember-qunit to resize the viewport! Resizing the viewport causes
  issues with tests and Percy snapshots for this addon.

  https://github.com/emberjs/ember-qunit/blob/master/vendor/ember-qunit/test-container-styles.css
*/
export default function resetViewport(hooks) {
  hooks.beforeEach(function() {
    let testingContainer = document.getElementById('ember-testing-container');
    testingContainer.classList.add('full-screen');
  });
}