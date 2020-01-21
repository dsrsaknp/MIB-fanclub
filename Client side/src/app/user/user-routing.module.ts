import { AuthGaurdService } from './../shared-services/auth-gaurd.service';
import { QuizComponent } from './contest/quiz/quiz.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SideNavComponent } from './stats/side-nav/side-nav.component';
import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsComponent } from './stats/stats.component';
import { StoriesComponent } from './stories/stories.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SearchComponent } from './search/search.component';
import { ContestComponent } from './contest/contest.component';

const routes: Routes = [
    { path: 'team', component: SideNavComponent },
    { path: 'team/:name', component: SideNavComponent },
    { path: 'stories', component: StoriesComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'search', component: SearchComponent },
    { path: 'contests', component: ContestComponent },
    {
        path: 'contests/:name/:id',
        canActivate: [AuthGaurdService],
        component: QuizComponent
    },
    { path: 'about', component: AboutComponent },
    { path: 'calendar', component: CalendarComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
export const routingComponents = [StatsComponent];
