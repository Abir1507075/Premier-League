import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  public tableData = [];
  columnsToDisplay = ['matchPlayed', 'win', 'lost', 'draw'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.tableData.push(data);
  }


  ngOnInit(): void {
  }

}
