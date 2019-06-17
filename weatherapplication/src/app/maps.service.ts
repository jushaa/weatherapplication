import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }

  getOneDayWeather(lat,lon){
    var weatherapiOneDay = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat  +'&lon=' + lon + '&APPID=14e2a0638a8d082af00525a468775078&units=metric' ;
    return this.http.get(weatherapiOneDay).toPromise();
  };
  getFourDayWeather(lat,lon){
    var weatherapiFourDays = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&units=metric&cnt=5&APPID=14e2a0638a8d082af00525a468775078';
    return this.http.get(weatherapiFourDays).toPromise();
  }
  saveWeather(date,temp,humidty,wind,username){
    var apiCall = 'http://127.0.0.1:5000/saveWeather';
    return this.http.post(apiCall, {date:date, temperature:temp,humidity:humidty,windspeed:wind, username:username}, { responseType: 'text' }).subscribe(
      res =>  res );
  }
  getDatabaseWeather(username){
    var apiCall='http://127.0.0.1:5000/getWeather';
    return this.http.post(apiCall,{username:username}, { responseType: 'text' }).toPromise();
  }
}
