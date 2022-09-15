import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SettingComponent, PasswordDialogComponent],
  imports: [CommonModule, SettingRoutingModule, SharedModule],
})
export class SettingModule {}
