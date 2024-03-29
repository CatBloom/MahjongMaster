// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
// components
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { MenuListComponent } from '../shared/components/menu-list/menu-list.component';
import { SearchComponent } from '../shared/components/search/search.component';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { RuleListComponent } from '../shared/components/rule-list/rule-list.component';
import { TableComponent } from '../shared/components/table/table.component';
import { TableResultRowComponent } from '../shared/components/table-result-row/table-result-row.component';
import { SNSListComponent } from './components/sns-list/sns-list.component';
import { NewsListComponent } from './components/news-list/news-list.component';
//pipe
import { JapanesePipe } from '../shared/pipes/japanese.pipe';
import { CustomSlicePipe } from '../shared/pipes/custom-slice.pipe';
// directives
import { ReplaceDirective } from '../shared/directives/replace.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuListComponent,
    SearchComponent,
    DialogComponent,
    RuleListComponent,
    TableResultRowComponent,
    TableComponent,
    CustomSlicePipe,
    JapanesePipe,
    ReplaceDirective,
    SNSListComponent,
    NewsListComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, FontAwesomeModule, RouterModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MaterialModule,
    HeaderComponent,
    FooterComponent,
    MenuListComponent,
    SearchComponent,
    DialogComponent,
    RuleListComponent,
    TableResultRowComponent,
    TableComponent,
    CustomSlicePipe,
    JapanesePipe,
    ReplaceDirective,
    SNSListComponent,
    NewsListComponent,
  ],
})
export class SharedModule {}
