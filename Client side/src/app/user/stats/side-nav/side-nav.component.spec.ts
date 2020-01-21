import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ApiService } from './../../../shared-services/api.service';
import { FilterPipe } from './filter.pipe';
import { TableBowlingComponent } from './../table-bowling/table-bowling.component';
import { TableBattingComponent } from './../table-batting/table-batting.component';
import { PlayerStatsComponent } from './../player-stats/player-stats.component';
import { StatsComponent } from './../stats.component';
import { HttpClientModule } from '@angular/common/http';
import { UserRoutingModule, routingComponents } from './../../user-routing.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';
import { MaterialModule } from '../../../material.module';
import { Router, ActivatedRoute } from '@angular/router';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

fdescribe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule,
        HttpClientModule, FormsModule, BrowserAnimationsModule
  ],
      declarations: [ SideNavComponent,
        routingComponents,
        StatsComponent,
        PlayerStatsComponent,
        TableBattingComponent,
        TableBowlingComponent,
        FilterPipe,
  ],
        providers: [
         {provide: Router, useClass: MockRouter},
         {provide: ActivatedRoute, useValue: MockRouter},
          ApiService,
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
