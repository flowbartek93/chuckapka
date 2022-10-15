import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ChuckFactComponent } from './chuck-fact/chuck-fact.component';
import { UserPanelComponent } from './user-panel/user-panel.component';

@NgModule({
  declarations: [AppComponent, ChuckFactComponent, UserPanelComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
