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
