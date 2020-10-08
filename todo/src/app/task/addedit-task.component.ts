import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/services/auth.service';
import { ListService } from '../auth/services/list.service';
import { TaskService } from '../auth/services/task.service';
import { Task } from '../models/task';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { List } from '../models/list';

@Component({
  selector: 'app-addedit-task',
  templateUrl: './addedit-task.component.html',
})
export class AddEditTaskComponent implements OnInit {
  /*root */
  public user: any;
  addEditTaskForm: FormGroup;
  submitted = false;

  /*Parameters*/
  idTask: number;
  action: string = 'add';

  /*Date Picker Conf*/
  bsValue = new Date();
  dateModel: any;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private calendar: NgbCalendar
  ) {
    const category = 'category';
    const id = 'id';

    if (this.route.snapshot.params[id]) {
      this.idTask = this.route.snapshot.params[id];
      this.action = 'Edit';
      console.log(this.idTask);
      console.log(this.action);
    }
  }

  async ngOnInit() {
    /* Form Builder */
    this.addEditTaskForm = new FormGroup({
      firstName: new FormControl(''),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
      remindeDate: new FormControl(new Date()),
      dueDate: new FormControl(new Date(), [ Validators.required]),
      myDayDate: new FormControl(new Date()),
      Notes: new FormControl(),
      isCompleted: new FormControl(),
      isImportant: new FormControl(),
    });

    // this.addEditTaskForm = this.formBuilder.group({

    //   description: ['', [Validators.required, Validators.maxLength(200)]],
    //   remindeDate : [],
    //   dueDate : [Validators.required],
    //   myDayDate : [],
    //   Notes : [],
    //   isCompleted : [],
    //   isImportant : [],
    // });

    this.user = await this.authService.getCurrentFirebaseUser();
    if (this.user) {
    }
  }

  get gForm() {
    return this.addEditTaskForm.controls;
  }

  Save() {
    console.log(this.addEditTaskForm.controls);

    this.submitted = true;

    if (this.addEditTaskForm.invalid) {
      return;
    }

    /*Getting values from form */
    const {
      idList,
      description,
      remindDate,
      dueDate,
      myDayDate,
      notes,
      isCompleted,
      isImportant,
    } = this.addEditTaskForm.value;

    console.log(this.addEditTaskForm);

    if (this.action === 'add') {
      let task: Task = {
        id: 0,
        description: description,
        remindDate: new Date(),
        dueDate: new Date(),
        myDayDate: new Date(),
        notes: notes,
        isCompleted: isCompleted,
        isImportant: isImportant,
        list: new List(),
      };
    }
  }

  onReset() {
    this.submitted = false;
    this.addEditTaskForm.reset();
  }
}
