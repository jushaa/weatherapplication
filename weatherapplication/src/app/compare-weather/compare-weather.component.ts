import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../auth-service';
import {MapsService} from '../maps.service';
import {Chart} from 'chart.js'

@Component({
  selector: 'app-compare-weather',
  templateUrl: './compare-weather.component.html',
  styleUrls: ['./compare-weather.component.css']
})
export class CompareWeatherComponent implements OnInit {

  weatherData = {
    "date": [],
    "humidity": [],
    "temperature": [],
    "windspeed": []
  };

  username : any;
  weather : any[];
  chart = [];

  constructor(private router: Router, private auth: AuthService, private map: MapsService) { }

  ngOnInit() {
    this.getWeather();

    if (sessionStorage.getItem('email') == null) {
      this.router.navigate(['']);
    }
  }

  getWeather() {
    this.auth.getUser().then(res => {
      this.username = res;
      this.map.getDatabaseWeather(this.username).then(res => {
        this.weather = JSON.parse(res);
        for (let items of this.weather) {
          Object.entries(items).forEach(([key, value]) => {
            this.weatherData[key].push(value);
          });

          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: this.weatherData.date,
              datasets: [
                {
                  data: this.weatherData.temperature,
                  label: 'Temperature in °C: ',
                  borderColor: '#3cba9f',
                  fill: false
                },
                {
                  data: this.weatherData.humidity,
                  label: 'Humidity in %: ',
                  borderColor: '#ffcc00',
                  fill: false
                },
                {
                  data: this.weatherData.windspeed,
                  label: 'Windspeed in meter/sec: ',
                  borderColor: '#434343',
                  fill: false
                },
              ]
            },
            options: {
              legend: {
                display: false
              },
              scales: {
                xAxes: [{
                  display: true
                }],
                yAxes: [{
                  display: true
                }]
              }
            }
          });
        }
      });
    })
  }
}
