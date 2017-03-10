import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Person} from "./person";
import {Observable} from "rxjs";
import {Project} from "./project";
import {Team} from "./team";

@Injectable()
export class DataService {


  private urlBase = "http://localhost:4200/assets/"

  constructor(private http: Http) { }


  getHoursByTeam() : Observable<any[]> { 

    return Observable.interval(3000).timeInterval().switchMap(() => {
      return this.http.get(this.urlBase + "data/hoursByTeam.json").map( (resp : Response) => {
          var hoursByTeam = resp.json();
          var randomised = hoursByTeam.map( (team) => {
            var monthNames = Object.keys(team.monthlyHours);
            monthNames.forEach( (monthName) => {
              team.monthlyHours[monthName] =  team.monthlyHours[monthName] * Math.random(); 
            });
          });

          return hoursByTeam;
    })
    
    })
  }

  getPeople() : Observable<Person[]> {

    return this.http.get(this.urlBase + "data/people.json").map( (resp : Response) => {
        return resp.json() as Array<Person>;
    })
  }


  getProjects() : Observable<Project[]> {

    return this.http.get(this.urlBase + "data/projects.json").map( (resp : Response) => {
      return resp.json() as Array<Project>;
    })
  }


  getTeams() : Observable<Team[]> {

    return this.http.get(this.urlBase + "data/teams.json").map( (resp : Response) => {
      return resp.json() as Array<Team>;
    })
  }



}
