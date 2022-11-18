import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxGoogleAnalyticsModule.forRoot('G-HSY7L2VKEE')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
