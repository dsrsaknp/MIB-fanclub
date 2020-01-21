import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContestService } from '../../shared-services/contest.service';
import { HandleApiErrorService } from '../../handle-api-error.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css']
})
export class ContestComponent implements OnInit {
  allData: any = [];
  inProgress = false;
  // Swal: any;
  constructor(private contestService: ContestService,
    private apiError: HandleApiErrorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllQuestions();
  }
  getAllQuestions() {
    this.inProgress = true;
    this.contestService.getAllQuestions().subscribe(data => {
      this.allData = data;
      this.inProgress = false;
      // console.log(this.allData);
    });
  }
  deleteContest(contestName) {
    Swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
      if (result.value) {
    this.contestService.deleteContest(contestName).subscribe(data => {
      // console.log(data);
      this.getAllQuestions();
    });
      } else {
        Swal(
          'Cancelled',
          'Your contest is safe :)',
          'error'
        );
      }
  });
}

  editContest(contestName) {
    this.router.navigate([contestName], {relativeTo: this.route});
  }
}
