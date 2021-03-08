import {Component} from '@angular/core';
import {MatchDataService} from './services/match-data.service';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {TeamDetailsComponent} from './components/team-details/team-details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title;
  public matchNumber = 0;
  private pageNumber = 0;
  public currentMatches;

  constructor(public matchData: MatchDataService, public dialog: MatDialog) {
    matchData.matchNumber.subscribe((val: string) => {
      this.matchNumber = parseInt(val, 10);
      this.title = matchData.title;
      matchData.getMatchByRoundId(this.pageNumber);
    });
    matchData.currentMatches.subscribe(val => {
      this.currentMatches = val;
      console.log(val);
    });
  }

  getData(event: any): void {
    console.log(event.pageIndex);
  }

  setCurrentPage(event: PageEvent): void {
    if (Math.abs(this.pageNumber - event.pageIndex) !== 0) {
      this.pageNumber = event.pageIndex;
      this.matchData.getMatchByRoundId(this.pageNumber);
    }
  }

  openTeamDialog(event: Event, team: string): void {
    event.preventDefault();
    console.log(team);
    this.dialog.open(TeamDetailsComponent, {
      data: {
        name: team ,
        matchPlayed: this.matchData.teamDetails.details[team].totalMatch,
        win: this.matchData.teamDetails.details[team].win,
        lost: this.matchData.teamDetails.details[team].lost,
        draw: this.matchData.teamDetails.details[team].draw,
      },
      height: '300px',
      width: '600px',

    });
  }


}
