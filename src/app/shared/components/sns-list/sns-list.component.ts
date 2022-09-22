import { Component, OnInit } from '@angular/core';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-sns-list',
  templateUrl: './sns-list.component.html',
  styleUrls: ['./sns-list.component.scss'],
})
export class SNSListComponent implements OnInit {
  iconTwitter = faTwitter;
  iconGithub = faGithub;
  constructor() {}

  ngOnInit(): void {}
}
