import { Component, OnInit } from '@angular/core';
import { MapsService } from '../maps.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;


  currentLat: any;
  currentLong: any;
  weather: any;
  forecast: any;
  username: any;



  constructor(private map: MapsService, private router: Router, private auth: AuthService) {
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);

    this.getWeather();
    this.getUsername();
    if (sessionStorage.getItem('email') == null) {
      this.router.navigate(['']);
    }
  }

  changeSuccessMessage() {
    this._success.next(`Saved`);
  }

  getUsername(){
    this.auth.getUser().then(res => {
      this.username = res;
    });

  }
  getWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
        this.map.getOneDayWeather(this.currentLat, this.currentLong).then(res => {
          this.weather = res;
        });
        this.map.getFourDayWeather(this.currentLat, this.currentLong).then(res => {
          this.forecast = res;
        });
      });

    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
  saveWeather(temp, humi, wind){
  const todayTemp = temp;
  const todayHumi = humi;
  const todayWind = wind;
  const date = this.formatDate();
  this.map.saveWeather(date, todayTemp, todayHumi, todayWind, this.username);
  this.changeSuccessMessage();
  }

  formatDate() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = '' +d.getFullYear();
      let hour = '' +d.getHours();
      let minute = d.getMinutes();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day,].join('-')  + ' ' + [hour, minute].join(':');
  }
}

