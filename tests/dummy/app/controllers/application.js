import Controller from '@ember/controller';
import { action } from '@ember/object';
import styles from 'dummy/styles/application';

export default class ApplicationController extends Controller {
  @action allowFocusOutlineOnTab(element) {
    const className = styles['no-focus-outline'];

    element.addEventListener('click', () => {
      element.classList.add(className);
    });

    element.addEventListener('keyup', (event) => {
      if (event.key === 'Tab') {
        element.classList.remove(className);
      }
    });
  }
}
