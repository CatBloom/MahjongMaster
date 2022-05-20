/* class     matcher = new MyErrorStateMatcher();*/
/* directive [errorStateMatcher]='matcher';*/

import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
