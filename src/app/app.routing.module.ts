import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JokeEditorComponent } from './joke-editor/joke-editor.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: 'joke-editor', component: JokeEditorComponent },
  { path: 'table', component: TableComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
