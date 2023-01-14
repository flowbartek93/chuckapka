import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { AppRoutingModule } from './app.routing.module';
import { JokeEditorComponent } from './joke-editor/joke-editor.component';
import { StoreModule } from '@ngrx/store';
import { jokeFeatureKey, reducer } from './store/jokes.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { JokeEffects } from './store/jokes.effects';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    UserPanelComponent,
    TableComponent,
    JokeEditorComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(jokeFeatureKey, reducer),
    EffectsModule.forRoot([JokeEffects]),
    StoreDevtoolsModule.instrument(),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
