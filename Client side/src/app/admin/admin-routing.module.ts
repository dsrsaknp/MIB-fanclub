import { ContestComponent } from './contest/contest.component';
import { AddContestComponent } from './contest/add-contest/add-contest.component';
import { EditStoreComponent } from './edit-store/edit-store.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { AdminGalleryComponent } from './admin-gallery/admin-gallery.component';
import { AdminVideosComponent } from './admin-videos/admin-videos.component';
import { UpdateItemComponent } from './edit-store/update-item/update-item.component';
import { EditContestComponent } from './contest/edit-contest/edit-contest.component';

const routes: Routes = [
    { path: '', component: AdminDashboardComponent, pathMatch: 'full' },
    { path: 'store', component: EditStoreComponent },
    { path: 'news', component: AdminNewsComponent },
    { path: 'gallery', component: AdminGalleryComponent },
    { path: 'videos', component: AdminVideosComponent },
    { path: 'update/:id', component: UpdateItemComponent },
    { path: 'contest', component: ContestComponent },
    { path: 'contest/add', component: AddContestComponent },
    { path: 'contest/:contestName', component: EditContestComponent }
];

@NgModule(
    {
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    }
)
export class AdminRoutingModule { }

