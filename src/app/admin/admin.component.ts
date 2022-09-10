import { Component, OnInit } from '@angular/core';

interface Links {
  label: string;
  path: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  links: Links[] = [
    { label: '大会一覧', path: '/admin/league/list' },
    { label: '大会登録', path: '/admin/league/add' },
    { label: 'プレイヤー管理', path: '/admin/player/edit' },
    { label: '成績管理', path: '/admin/game/edit' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
