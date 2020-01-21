import { EditStoreComponent } from './edit-store/edit-store.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { MaterialModule } from './../material.module';
import { AdminGalleryComponent } from './admin-gallery/admin-gallery.component';
import { AdminVideosComponent } from './admin-videos/admin-videos.component';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { UpdateItemComponent } from './edit-store/update-item/update-item.component';
import { AdminGalleryViewComponent } from './admin-gallery/admin-gallery-view/admin-gallery-view.component';
import { AdminVideosViewComponent } from './admin-videos/admin-videos-view/admin-videos-view.component';
import { AdminNewsDeleteComponent } from './admin-news/admin-news-delete/admin-news-delete.component';
import { AdminNewsUpdateComponent } from './admin-news/admin-news-update/admin-news-update.component';
import { AdminNewsViewComponent } from './admin-news/admin-news-view/admin-news-view.component';
import { AdminGalleryDeleteComponent } from './admin-gallery/admin-gallery-delete/admin-gallery-delete.component';
import { AdminGalleryUpdateComponent } from './admin-gallery/admin-gallery-update/admin-gallery-update.component';
import { AdminVideosUpdateComponent } from './admin-videos/admin-videos-update/admin-videos-update.component';
import { AdminVideosDeleteComponent } from './admin-videos/admin-videos-delete/admin-videos-delete.component';
import { ContestComponent } from './contest/contest.component';
import { AddContestComponent } from './contest/add-contest/add-contest.component';
import { ContestService } from '../shared-services/contest.service';
import { HandleApiErrorService } from '../handle-api-error.service';
import { EditContestComponent } from './contest/edit-contest/edit-contest.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    YoutubePlayerModule
  ],
  declarations: [AdminDashboardComponent,
    AdminNewsComponent, AdminNewsUpdateComponent, AdminNewsDeleteComponent, AdminNewsViewComponent,
    EditStoreComponent, AdminGalleryComponent, AdminVideosComponent, AdminVideosViewComponent,
    UpdateItemComponent, AdminGalleryViewComponent, AdminGalleryDeleteComponent,
    AdminGalleryUpdateComponent, AdminVideosUpdateComponent,
    AdminVideosDeleteComponent, ContestComponent, AddContestComponent, EditContestComponent
  ],
  entryComponents: [
    AdminNewsUpdateComponent, AdminNewsDeleteComponent, AdminNewsViewComponent, AdminGalleryViewComponent,
    AdminVideosViewComponent, AdminGalleryDeleteComponent, AdminGalleryUpdateComponent,
    AdminVideosDeleteComponent, AdminVideosUpdateComponent
  ],
  providers: [ContestService, HandleApiErrorService]
})
export class AdminModule { }
