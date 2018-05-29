import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form-component/form-component.component';

import { GetService } from './services/get-service.service';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule
  ],
  providers: [ GetService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
