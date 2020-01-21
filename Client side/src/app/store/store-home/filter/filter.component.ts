import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../shared-services/store.service';
import { MatDialog } from '@angular/material';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  categoryName = 'All';

  private filters: any;
  private load: any = 0;
  private viewMore: boolean;
  private limit: number = 5;

  constructor( private storeService: StoreService, private dialog: MatDialog ) { }

  ngOnInit() {
 

    this.storeService.catetoryEvent.subscribe(data => {
      this.categoryName = data;
      this.loadCategory();
    });

 

  }

  typeFilter(data, event) {
    if (event.checked) {
      this.storeService.filterTypeAddEvent.emit(data);
    } else {
      this.storeService.filterTypeRemoveEvent.emit(data);
    }
  }

  brandFilter(data, event) {
    if (event.checked) {
      this.storeService.filterBrandAddEvent.emit(data);
    } else {
      this.storeService.filterBrandRemoveEvent.emit(data);
    }
  }
  loadCategory() {
    this.storeService.getFiltersByCategory(this.categoryName).subscribe(data => {
      this.filters = data;
    }, error => {
      console.log('ERROR : ', error);
    });
  }

  // CHECK IF ANY <TYPE> OF ITEMS IS PRESENT
  isTypeAvailable(type) {
    if (type === undefined) {
      return false; //   Not available
    }
    return true;   // available
  }

  // CHECK IF ANY <BRAND> OF ITEMS IS PRESENT
  isBrandAvailable(brand) {
    if (brand === undefined) {
      return false;   //   Not available
    }
    return true;  //  available
  }



  // LOAD MORE FILTERS
  loadMoreFilters(filters) {
    console.log("filters::::::::", filters);
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '600px',
      height: '400px',
      data : {
        dialogFilters : filters
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // VIEW MORE
  moreFilters(filter) {
    // console.log(`length: ${filters.length}`);
    // console.log("length", filter);
    // console.log("length", filter.length);
    if(filter === undefined) {
      return true;
    }
    else if(filter.length >= this.limit) {
      return false;
    }
    else {
      return true;
    }
  }
}
