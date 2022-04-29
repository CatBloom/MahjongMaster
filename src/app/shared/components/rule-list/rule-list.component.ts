import { Component, Input, OnInit } from '@angular/core';
import { Rules } from '../../interfaces/rules';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss'],
})
export class RuleListComponent implements OnInit {
  @Input() rules!: Rules;
  constructor() {}

  ngOnInit(): void {}
}
