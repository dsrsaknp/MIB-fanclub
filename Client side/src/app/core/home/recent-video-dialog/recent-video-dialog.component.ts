import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-recent-video-dialog',
  templateUrl: './recent-video-dialog.component.html',
  styleUrls: ['./recent-video-dialog.component.css']
})
export class RecentVideoDialogComponent implements OnInit {

  public link = '1LVpuWpRs3I';

  player: YT.Player;
  savePlayer(player) {
    this.player = player;
    // console.log('player instance', player);
  }
  onStateChange(event) {
    // console.log('player state', event.data);
  }

  constructor(
    private dialog: MatDialog,
    public thisDialogRef: MatDialogRef<RecentVideoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.link = this.data.link;
  }

}
