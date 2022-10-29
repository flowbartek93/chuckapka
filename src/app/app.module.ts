import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ChuckFactComponent } from './chuck-fact/chuck-fact.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { AppRoutingModule } from './app.routing.module';
import { JokeEditorComponent } from './joke-editor/joke-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ChuckFactComponent,
    UserPanelComponent,
    TableComponent,
    JokeEditorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
