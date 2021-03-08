import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Teams} from '../classes/teams';
import {TeamDetails} from '../classes/team-details';

@Injectable({
  providedIn: 'root'
})
export class MatchDataService {
  private url = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
  private responseObject;

  public matchNumber = new Subject();
  public currentMatches = new Subject();
  public title;
  public teamDetails;

  constructor(private http: HttpClient) {
    http.get(this.url)
      .subscribe(response => {
        this.responseObject = response;
        this.title = this.responseObject.name;
        this.teamDetails = new Teams(response);
        this.teamDetails.processMatchHistory();
        console.log(this.teamDetails.details);
        this.matchNumber.next(this.responseObject.rounds.length * 10);
      });
  }

  getMatchByRoundId(id: number): void {
    this.currentMatches.next(this.responseObject.rounds[id].matches);
  }
  getTeamDetails(teamName: string): TeamDetails{
    return this.teamDetails.details[teamName];
  }
}
