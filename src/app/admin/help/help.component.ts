import { Component, OnInit } from '@angular/core';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  iconTwitter = faTwitter;
  iconGithub = faGithub;
  constructor() {}

  ngOnInit(): void {}
}
