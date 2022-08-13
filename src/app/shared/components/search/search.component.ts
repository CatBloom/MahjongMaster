import { OnInit, Component, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { of, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() auto!: MatAutocomplete;
  @Output() sendValue = new EventEmitter<string>();

  search: UntypedFormControl = new UntypedFormControl('');
  private onDestroy$ = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        takeUntil(this.onDestroy$),
        debounceTime(500),
        distinctUntilChanged((pre, cur) => {
          //空白をトリミングして判定 同値はoutputしない
          return String(pre).trim() === String(cur).trim();
        }),
        switchMap((value) => {
          return of(value);
        })
      )
      .subscribe((value: string) => {
        this.sendValue.emit(value);
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
