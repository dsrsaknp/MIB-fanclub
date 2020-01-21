import { YoutubePlayerModule } from 'ngx-youtube-player';
import { TableBowlingComponent } from './stats/table-bowling/table-bowling.component';
import { MaterialModule } from './../material.module';
import { ApiService } from './../shared-services/api.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CountDown} from '../../../node_modules/ng4-date-countdown-timer';


import { StatsComponent } from './stats/stats.component';
import { StoriesComponent } from './stories/stories.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContestComponent } from './contest/contest.component';
import { SearchComponent } from './search/search.component';
import { UserRoutingModule, routingComponents } from './user-routing.module';
import { PlayerStatsComponent } from './stats/player-stats/player-stats.component';



import { AboutComponent } from './about/about.component';
import { SideNavComponent } from './stats/side-nav/side-nav.component';
import { TableBattingComponent } from './stats/table-batting/table-batting.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GalleryDialogComponent } from './gallery-dialog/gallery-dialog.component';
import { SlideshowDialogComponent } from './slideshow-dialog/slideshow-dialog.component';
import { AboutService } from '../shared-services/about.service';
import { StoriesDialogComponent } from './stories-dialog/stories-dialog.component';
import { FilterPipe } from './stats/side-nav/filter.pipe';
import { OngoingContestsComponent } from './contest/ongoing-contests/ongoing-contests.component';
import { UpcomingContestsComponent } from './contest/upcoming-contests/upcoming-contests.component';
import { LeaderboardComponent } from './contest/leaderboard/leaderboard.component';
import { ContestService } from '../shared-services/contest.service';
import { QuizComponent } from './contest/quiz/quiz.component';
import {ShareModule} from 'ng2share/share.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule,
    YoutubePlayerModule,
    ReactiveFormsModule,
    ShareModule
  ],
  declarations: [
    routingComponents,
    StatsComponent,
    StoriesComponent,
    StoriesDialogComponent,
    GalleryComponent,
    GalleryDialogComponent,
    SlideshowDialogComponent,
    ContestComponent,
    SearchComponent,
    PlayerStatsComponent,
    AboutComponent,
    SideNavComponent,
    TableBattingComponent,
    TableBowlingComponent,
    CalendarComponent,
    FilterPipe,
    OngoingContestsComponent,
    UpcomingContestsComponent,
    CountDown,
    LeaderboardComponent,
    QuizComponent
  ],
  entryComponents: [
    StoriesDialogComponent, GalleryDialogComponent, SlideshowDialogComponent
  ],
  providers: [
    ApiService,
    AboutService,
    ContestService
  ]
})
export class UserModule { }
