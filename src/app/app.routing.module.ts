import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JokeEditorComponent } from './joke-editor/joke-editor.component';
import { TableComponent } from './table/table.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { ServiceComponent } from './service/service.component';

const routes: Routes = [
  { path: '', component: UserPanelComponent },
  { path: 'joke-editor', component: JokeEditorComponent },
  { path: 'table', component: TableComponent },
  { path: 'service', component: ServiceComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
