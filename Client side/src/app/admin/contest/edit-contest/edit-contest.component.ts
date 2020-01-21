import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ContestService } from './../../../shared-services/contest.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HandleApiErrorService } from '../../../handle-api-error.service';

@Component({
  selector: 'app-edit-contest',
  templateUrl: './edit-contest.component.html',
  styleUrls: ['./edit-contest.component.css']
})
export class EditContestComponent implements OnInit {

  private month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public info: FormGroup;
  public question: FormGroup;
  public question1: FormGroup;
  public question2: FormGroup;
  public question3: FormGroup;
  public question4: FormGroup;
  public date: FormControl;
  // public name = '';
  // public text = '';
  // public img = '';
  public itemChecked = true;
  public dob = '';
  allData: any = [];
  currentData: any = [];
  public contestName;
  public ques;
  public option1;
  public option2;
  public option3;
  public option4;
  public answer;

  public ques1;
  public option11;
  public option12;
  public option13;
  public option14;
  public answer1;

  public ques2;
  public option21;
  public option22;
  public option23;
  public option24;
  public answer2;

  public ques3;
  public option31;
  public option32;
  public option33;
  public option34;
  public answer3;

  public ques4;
  public option41;
  public option42;
  public option43;
  public option44;
  public answer4;
  that = this;
  constructor(
    public fb: FormBuilder,
    private contestService: ContestService,
    private toastr: ToastsManager,
    private apiError: HandleApiErrorService, private router: Router, private route: ActivatedRoute
  ) {
    this.info = this.fb.group({
      'name': [null
      ]

    });
    this.question = this.fb.group(
      {
        'ques': [null],
        'option1': [null],
        'option2': [null],
        'option3': [null],
        'option4': [null],
        'ans': [null]
      }
    );
    this.question1 = this.fb.group(
      {
        'ques': [null
        ],
        'option1': [null],
        'option2': [null],
        'option3': [null],
        'option4': [null],
        'ans': [null]
      }
    );
    this.question2 = this.fb.group(
      {
        'ques': [null
        ],
        'option1': [null],
        'option2': [null],
        'option3': [null],
        'option4': [null],
        'ans': [null]
      }
    );
    this.question3 = this.fb.group(
      {
        'ques': [null
        ],
        'option1': [null],
        'option2': [null],
        'option3': [null],
        'option4': [null],
        'ans': [null]
      }
    );
    this.question4 = this.fb.group(
      {
        'ques': [null
        ],
        'option1': [null],
        'option2': [null],
        'option3': [null],
        'option4': [null],
        'ans': [null]
      }
    );
    this.date = new FormControl(new Date());
  }
  ngOnInit() {


    this.route.paramMap.subscribe((params: ParamMap) => {
      // tslint:disable-next-line:radix
      const contestName = params.get('contestName');
      this.contestName = contestName;
      console.log(this.contestName);
      this.contestService.getAllQuestions().subscribe(data => {
        this.allData = data;
        this.currentData = this.allData.filter(contest => contest.name === this.contestName);
        this.ques = this.currentData[0].questions[0].que;
        this.option1 = this.currentData[0].questions[0].opt[0].value;
        this.option2 = this.currentData[0].questions[0].opt[1].value;
        this.option3 = this.currentData[0].questions[0].opt[2].value;
        this.option4 = this.currentData[0].questions[0].opt[3].value;
        this.answer = this.currentData[0].questions[0].ans;

        this.ques1 = this.currentData[0].questions[1].que;
        this.option11 = this.currentData[0].questions[1].opt[0].value;
        this.option12 = this.currentData[0].questions[1].opt[1].value;
        this.option13 = this.currentData[0].questions[1].opt[2].value;
        this.option14 = this.currentData[0].questions[1].opt[3].value;
        this.answer1 = this.currentData[0].questions[1].ans;

        this.ques2 = this.currentData[0].questions[2].que;
        this.option21 = this.currentData[0].questions[2].opt[0].value;
        this.option22 = this.currentData[0].questions[2].opt[1].value;
        this.option23 = this.currentData[0].questions[2].opt[2].value;
        this.option24 = this.currentData[0].questions[2].opt[3].value;
        this.answer2 = this.currentData[0].questions[2].ans;

        this.ques3 = this.currentData[0].questions[3].que;
        this.option31 = this.currentData[0].questions[3].opt[0].value;
        this.option32 = this.currentData[0].questions[3].opt[1].value;
        this.option33 = this.currentData[0].questions[3].opt[2].value;
        this.option34 = this.currentData[0].questions[3].opt[3].value;
        this.answer3 = this.currentData[0].questions[3].ans;

        this.ques4 = this.currentData[0].questions[4].que;
        this.option41 = this.currentData[0].questions[4].opt[0].value;
        this.option42 = this.currentData[0].questions[4].opt[1].value;
        this.option43 = this.currentData[0].questions[4].opt[2].value;
        this.option44 = this.currentData[0].questions[4].opt[3].value;
        this.answer4 = this.currentData[0].questions[4].ans;
        console.log(this.ques);
        this.formInit();
      });
    });

  }


  formInit() {
    this.info = this.fb.group({
      'name': [this.contestName,
      [
        Validators.required
      ]
      ],

    });
    this.question = this.fb.group(
      {
        'ques': [this.ques,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(150)
        ]
        ],
        'option1': [this.option1, [Validators.required ]],
        'option2': [this.option2, [Validators.required ]],
        'option3': [this.option3, [Validators.required]],
        'option4': [this.option4, [Validators.required]],
        'ans': [this.answer, [Validators.required]]
      }
    );
    this.question1 = this.fb.group(
      {
        'ques': [this.ques1,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(150)
        ]
        ],
        'option1': [this.option11, [Validators.required]],
        'option2': [this.option12, [Validators.required]],
        'option3': [this.option13, [Validators.required]],
        'option4': [this.option14, [Validators.required]],
        'ans': [this.answer1, [Validators.required]]
      }
    );
    this.question2 = this.fb.group(
      {
        'ques': [this.ques2,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(150)
        ]
        ],
        'option1': [this.option21, [Validators.required]],
        'option2': [this.option22, [Validators.required]],
        'option3': [this.option23, [Validators.required]],
        'option4': [this.option24, [Validators.required]],
        'ans': [this.answer2, [Validators.required]]
      }
    );
    this.question3 = this.fb.group(
      {
        'ques': [this.ques3,
        [
          Validators.required,
          Validators.pattern('^([a-zA-Z0-9]+\\s)*[a-zA-Z0-9]+$'),
          Validators.minLength(10),
          Validators.maxLength(150)
        ]
        ],
        'option1': [this.option31, [Validators.required]],
        'option2': [this.option32, [Validators.required]],
        'option3': [this.option33, [Validators.required]],
        'option4': [this.option34, [Validators.required]],
        'ans': [this.answer3, [Validators.required]]
      }
    );
    this.question4 = this.fb.group(
      {
        'ques': [this.ques4,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(150)
        ]
        ],
        'option1': [this.option41, Validators.compose([Validators.required])],
        'option2': [this.option42, Validators.compose([Validators.required])],
        'option3': [this.option43, Validators.compose([Validators.required])],
        'option4': [this.option44, Validators.compose([Validators.required])],
        'ans': [this.answer4, [Validators.required]]
      }
    );
    this.date = new FormControl(new Date());
  }
  updateContest(info, question, question1, question2, question3, question4) {
    // console.log(info.value);
    // console.log(question.value);
    // console.log(question1.value);
    // console.log(question2.value);
    // console.log(question3.value);
    // console.log(question4.value);
    console.log(question4.value.option4.length);
    if (this.info.value.name.trim() === '' || this.question.value.ques.trim() === '' ||
    this.question.value.option1.trim() === '' ||
    this.question.value.option2.trim() === '' ||
    this.question.value.option3.trim() === '' ||
    this.question.value.option4.trim() === '' ||
    // this.question.value.ans.trim() === '' ||
    this.question1.value.ques.trim() === '' ||
    this.question1.value.option1.trim() === '' ||
    this.question1.value.option2.trim() === '' ||
    this.question1.value.option3.trim() === '' ||
    this.question1.value.option4.trim() === '' ||
    // this.question1.value.ans.trim() === '' ||
    this.question2.value.ques.trim() === '' ||
    this.question2.value.option1.trim() === '' ||
    this.question2.value.option2.trim() === '' ||
    this.question2.value.option3.trim() === '' ||
    this.question2.value.option4.trim() === '' ||
    // this.question2.value.ans.trim() === '' ||
    this.question3.value.ques.trim() === '' ||
    this.question3.value.option1.trim() === '' ||
    this.question3.value.option2.trim() === '' ||
    this.question3.value.option3.trim() === '' ||
    this.question3.value.option4.trim() === '' ||
    // this.question3.value.ans.trim() === '' ||
    this.question4.value.ques.trim() === '' ||
    this.question4.value.option1.trim() === '' ||
    this.question4.value.option2.trim() === '' ||
    this.question4.value.option3.trim() === '' ||
    this.question4.value.option4.trim() === ''
    // this.question4.value.ans.trim() === ''
  ) {
      this.toastr.warning('value should not be empty');
      return false;
    }



    if (this.info.value.name.length > 100 || this.question.value.ques.length > 100 ||
    this.question.value.option1.length > 100 ||
    this.question.value.option2.length > 100 ||
    this.question.value.option3.length > 100 ||
    this.question.value.option4.length > 100 ||
    // this.question.value.ans.trim() === '' ||
    this.question1.value.ques.length > 100 ||
    this.question1.value.option1.length > 100 ||
    this.question1.value.option2.length > 100 ||
    this.question1.value.option3.length > 100 ||
    this.question1.value.option4.length > 100 ||
    // this.question1.value.ans.trim() === '' ||
    this.question2.value.ques.length > 100 ||
    this.question2.value.option1.length > 100 ||
    this.question2.value.option2.length > 100 ||
    this.question2.value.option3.length > 100 ||
    this.question2.value.option4.length > 100 ||
    // this.question2.value.ans.trim() === '' ||
    this.question3.value.ques.length > 100 ||
    this.question3.value.option1.length > 100 ||
    this.question3.value.option2.length > 100 ||
    this.question3.value.option3.length > 100 ||
    this.question3.value.option4.length > 100 ||
    // this.question3.value.ans.trim() === '' ||
    this.question4.value.ques.length > 100 ||
    this.question4.value.option1.length > 100 ||
    this.question4.value.option2.length > 100 ||
    this.question4.value.option3.length > 100 ||
    this.question4.value.option4.length > 100
    // this.question4.value.ans.trim() === ''
  ) {
      this.toastr.warning('value length should not be more than 100 ');
      return false;
    }





    if (this.info.value.name.charAt(0) === ' ' || this.question.value.ques.charAt(0) === ' ' ||
    this.question.value.option1.charAt(0) === ' ' ||
    this.question.value.option2.charAt(0) === ' ' ||
    this.question.value.option3.charAt(0) === ' ' ||
    this.question.value.option4.charAt(0) === ' ' ||
    // this.question.value.ans.trim() === '' ||
    this.question1.value.ques.charAt(0) === ' ' ||
    this.question1.value.option1.charAt(0) === ' '  ||
    this.question1.value.option2.charAt(0) === ' ' ||
    this.question1.value.option3.charAt(0) === ' ' ||
    this.question1.value.option4.charAt(0) === ' ' ||
    // this.question1.value.ans.trim() === '' ||
    this.question2.value.ques.charAt(0) === ' ' ||
    this.question2.value.option1.charAt(0) === ' ' ||
    this.question2.value.option2.charAt(0) === ' ' ||
    this.question2.value.option3.charAt(0) === ' ' ||
    this.question2.value.option4.charAt(0) === ' ' ||
    // this.question2.value.ans.trim() === '' ||
    this.question3.value.ques.charAt(0) === ' ' ||
    this.question3.value.option1.charAt(0) === ' ' ||
    this.question3.value.option2.charAt(0) === ' ' ||
    this.question3.value.option3.charAt(0) === ' ' ||
    this.question3.value.option4.charAt(0) === ' ' ||
    // this.question3.value.ans.trim() === '' ||
    this.question4.value.ques.charAt(0) === ' ' ||
    this.question4.value.option1.charAt(0) === ' ' ||
    this.question4.value.option2.charAt(0) === ' ' ||
    this.question4.value.option3.charAt(0) === ' ' ||
    this.question4.value.option4.charAt(0) === ' '
    // this.question4.value.ans.trim() === ''
  ) {
      this.toastr.warning('value should not start with space');
      return false;
    }



    const obj = [
      {
        que: question.value.ques,
        opt: [
          { value: question.value.option1 },
          { value: question.value.option3 },
          { value: question.value.option3 },
          { value: question.value.option4 },
        ],
        ans: parseInt(question.value.ans, 10)
      },
      {
        que: question1.value.ques,
        opt: [
          { value: question1.value.option1 },
          { value: question1.value.option2 },
          { value: question1.value.option3 },
          { value: question1.value.option4 },
        ],
        ans: parseInt(question1.value.ans, 10)
      },
      {
        que: question2.value.ques,
        opt: [
          { value: question2.value.option1 },
          { value: question2.value.option2 },
          { value: question2.value.option3 },
          { value: question2.value.option4 },
        ],
        ans: parseInt(question2.value.ans, 10)
      },
      {
        que: question3.value.ques,
        opt: [
          { value: question3.value.option1 },
          { value: question3.value.option2 },
          { value: question3.value.option3 },
          { value: question3.value.option4 },
        ],
        ans: parseInt(question3.value.ans, 10)
      },
      {
        que: question4.value.ques,
        opt: [
          { value: question4.value.option1 },
          { value: question4.value.option2 },
          { value: question4.value.option3 },
          { value: question4.value.option4 },
        ],
        ans: parseInt(question4.value.ans, 10)
      },
    ];
    const main =  {
        check: this.contestName,
        name: info.value.name,
        questions: obj
      };
    console.log(main);
    // console.log(obj);
    // const myJSON = JSON.stringify(main);
    this.contestService.updateContest(main).subscribe(data => {
      if (data === true) {
        this.toastr.warning('successfully update');
        this.router.navigate(['/admin/contest']);
      }
    });
    return false;
  }
  isDisabled(info, question, question1, question2, question3, question4) {

      if (info && question && question1 && question2 && question3 && question4) {
        return true;
      } else {
        return false;
      }

  }
}




