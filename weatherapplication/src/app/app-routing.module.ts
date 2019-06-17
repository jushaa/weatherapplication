import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { SignupScreenComponent } from './signup-screen/signup-screen.component';
import { HomeScreenComponent } from "./home-screen/home-screen.component";
import { CompareWeatherComponent } from "./compare-weather/compare-weather.component";

const routes: Routes = [
  {path: '' , component : LoginScreenComponent},
  {path: 'home' , component : HomeScreenComponent},
  {path: 'compare-weather' , component : CompareWeatherComponent},
  {path: 'signup' , component : SignupScreenComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
