import {TeamDetails} from './team-details';

export class Teams {
  public allMatch: any[] = [];
  public details = new Map();

  constructor(public matchObject) {
    matchObject.rounds.forEach(round => {
      round.matches.forEach(match => {
        this.allMatch.push(match);
      });
    });
  }

  processMatchHistory(): void {
    this.allMatch.forEach(match => {
      if (!this.details[match.team1]) {
        this.details[match.team1] = new TeamDetails(0, 0, 0);
      }
      if (!this.details[match.team2]) {
        this.details[match.team2] = new TeamDetails(0, 0, 0);
      }
      if (match.score.ft[0] === match.score.ft[1]) {
        this.details[match.team1].draw = this.details[match.team1].draw + 1;
        this.details[match.team2].draw = this.details[match.team2].draw + 1;
      } else if (match.score.ft[0] > match.score.ft[1]) {
        this.details[match.team1].win = this.details[match.team1].win + 1;
        this.details[match.team2].lost = this.details[match.team2].lost + 1;
      } else {
        this.details[match.team2].win = this.details[match.team2].win + 1;
        this.details[match.team1].lost = this.details[match.team1].lost + 1;

      }
    });
  }

}
