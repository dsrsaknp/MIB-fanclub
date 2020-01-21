import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ContestService } from './../../../shared-services/contest.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-contest',
  templateUrl: './add-contest.component.html',
  styleUrls: ['./add-contest.component.css']
})
export class AddContestComponent implements OnInit {

  private month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public info: FormGroup;
  public question: FormGroup;
  public question1: FormGroup;
  public question2: FormGroup;
  public question3: FormGroup;
  public question4: FormGroup;
  public date: FormControl;
  public name = '';
  public text = '';
  public img = '';
  public itemChecked = true;
  public dob = '';
  minDate = new Date();
  maxDate = new Date(2018, 12, 31);


  constructor(
    public fb: FormBuilder,
    private contestService: ContestService,
    private toastr: ToastsManager
  ) {

    this.formInit();
  }



  formInit() {
    this.info = this.fb.group({
      'name': [null,
        [
          Validators.required,
          Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$'),
          Validators.minLength(5),
          Validators.maxLength(25)
        ]
      ],
      'text': [null,
        [
          Validators.required,
          Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$'),
          Validators.minLength(15),
          Validators.maxLength(200)
        ]
      ],
      'img': [null, [Validators.required, Validators.pattern('^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$')]],
    });

    this.question = this.fb.group(
      {
        'ques': [null,
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(150),
            Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')

          ]
        ],
        'option1': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'option2': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'option3': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'option4': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'ans': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])]
      }
    );
    this.question1 = this.fb.group(
      {
        'ques': [null,
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(150),
            Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')

          ]
        ],
        'option1': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'option2': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'option3': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'option4': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'ans': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])]
      }
    );
    this.question2 = this.fb.group(
      {
        'ques': [null,
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(150),
            Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')

          ]
        ],
        'option1': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'option2': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'option3': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'option4': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'ans': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])]
      }
    );
    this.question3 = this.fb.group(
      {
        'ques': [null,
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(150),
            Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')

          ]
        ],
        'option1': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'option2': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'option3': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'option4': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'ans': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])]
      }
    );
    this.question4 = this.fb.group(
      {
        'ques': [null,
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(150),
            Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')
          ]
        ],
        'option1': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'option2': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'option3': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'option4': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
        'ans': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])]
      }
    );
    this.date = new FormControl(new Date());
  }


  ngOnInit() {

  }

  setValidation(value) {
    if (value) {
      this.question = this.fb.group(
        {
          'ques': [null,
            [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(150), Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')
            ]
          ],
          'option1': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
          'option2': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
          'option3': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
          'option4': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
          'ans': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])]
        }
      );
      this.question1 = this.fb.group(
        {
          'ques': [null,
            [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(150), Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')
            ]
          ],
          'option1': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
          'option2': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
          'option3': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
          'option4': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
          'ans': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])]
        }
      );
      this.question2 = this.fb.group(
        {
          'ques': [null,
            [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(150), Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')
            ]
          ],
          'option1': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
          'option2': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
          'option3': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
          'option4': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
          'ans': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])]
        }
      );
      this.question3 = this.fb.group(
        {
          'ques': [null,
            [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(150), Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')
            ]
          ],
          'option1': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
          'option2': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
          'option3': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
          'option4': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])],
          'ans': [null, Validators.compose([Validators.required, Validators.pattern('^(?! )[A-Za-z0-9. ]*(?<! )$')])]
        }
      );

    } else {

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
          'ques': [null,
            [
            ]
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
          'ques': [null,
            [
            ]
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
          'ques': [null,
            [
            ]
          ],
          'option1': [null],
          'option2': [null],
          'option3': [null],
          'option4': [null],
          'ans': [null]
        }
      );

    }
  }


  async add(info, date, question, question1, question2, question3, question4, ongoing) {

    if (ongoing) {

      // Check if the contest is duplicate
      if (await this.isDuplicate({ name: info.name })) {
        this.toastr.info('Please enter a new contest name', 'Already exists!');
        return;
      }
      const contestDate = {
        name: info.name.trim(),
        text: info.text.trim(),
        img: info.img.trim()
      };

      const questionData = [
        {
          que: question.ques.trim(),
          opt: [
            { value: question.option1.trim() },
            { value: question.option2.trim() },
            { value: question.option3.trim() },
            { value: question.option4.trim() },
          ],
          ans: parseInt(question.ans, 10)
        },
        {
          que: question1.ques.trim(),
          opt: [
            { value: question1.option1.trim() },
            { value: question1.option2.trim() },
            { value: question1.option3.trim() },
            { value: question1.option4.trim() },
          ],
          ans: parseInt(question1.ans, 10)
        },
        {
          que: question2.ques,
          opt: [
            { value: question2.option1.trim() },
            { value: question2.option2.trim() },
            { value: question2.option3.trim() },
            { value: question2.option4.trim() },
          ],
          ans: parseInt(question2.ans, 10)
        },
        {
          que: question3.ques.trim(),
          opt: [
            { value: question3.option1.trim() },
            { value: question3.option2.trim() },
            { value: question3.option3.trim() },
            { value: question3.option4.trim() },
          ],
          ans: parseInt(question3.ans, 10)
        },
        {
          que: question4.ques.trim(),
          opt: [
            { value: question4.option1.trim() },
            { value: question4.option2.trim() },
            { value: question4.option3.trim() },
            { value: question4.option4.trim() },
          ],
          ans: parseInt(question4.ans, 10)
        },
      ];

      const contestQuestions = {
        name: info.name,
        questions: questionData
      };

      new Promise((resolve, reject) => {
        this.contestService.postContest(contestDate).subscribe(
          response => {
            resolve(response);
          },
          error => {
            this.toastr.error('Something wrong with the server!', 'Opps!');
            resolve(false);
          }
        );
      }).then(
        response => {
          if (!response) {
            this.toastr.error('Something wrong with the server!', 'Opps!');
            return;
          }
          this.contestService.postContestQuestions(contestQuestions).subscribe(
            result => {
              if (!result) {
                this.toastr.error('Something wrong with the server!', 'Opps!');
              }
              this.toastr.success('A new contest was added!', 'Success!');
              this.formInit();
            },
            error => {
              this.toastr.error('Something wrong with the server!', 'Opps!');
            }
          );
        }
      );


    } else {

      const dateFormatted = this.month[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
      const contestData = {
        name: info.name,
        text: info.text,
        img: info.img,
        date: dateFormatted
      };
      this.contestService.postUpcomingContest(contestData).subscribe(
        (response) => {
          if (response) {
            this.formInit();
            this.toastr.success('A new contest was added!', 'Success!');
          } else {
            this.toastr.error('Some error has occured!', 'Error!');
          }
        }
      );

    }
  }


  async isDuplicate(contestName) {
    return new Promise(
      (resolve) => {
        this.contestService.checkDuplicateContest(contestName).subscribe(
          response => {
            resolve(response);
          },
          error => {
            this.toastr.error('Something wrong with the server!', 'Opps!');
            resolve(false);
          }
        );
      }
    );


  }


  isDisabled(ongoing, upcoming, info, question, question1, question2, question3, question4) {
    if (upcoming) {
      if (info) {
        return false;
      }
    } else if (ongoing) {
      if (info && question && question1 && question2 && question3 && question4) {
        return false;
      }
    }
    return true;
  }
}
