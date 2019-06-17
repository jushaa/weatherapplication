import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { SignupScreenComponent } from './signup-screen/signup-screen.component';
import {FormsModule} from "@angular/forms";
import {AuthService} from "./auth-service";
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from '@agm/core';
import { MapsService } from "./maps.service";
import { CompareWeatherComponent } from './compare-weather/compare-weather.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    SignupScreenComponent,
    HomeScreenComponent,
    CompareWeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA2MsMcUzwaG03GdKR07UdHnk_6aH6E6cs'
    })
  ],
  providers: [AuthService, MapsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
