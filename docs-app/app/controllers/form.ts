import Controller from '@ember/controller';
import { action } from '@ember/object';

import styles from './form.css';

export default class FormController extends Controller {
  styles = styles;

  // eslint-disable-next-line @typescript-eslint/require-await
  @action async submitForm(data: Record<string, any>): Promise<void> {
    console.table(data);
  }
}
