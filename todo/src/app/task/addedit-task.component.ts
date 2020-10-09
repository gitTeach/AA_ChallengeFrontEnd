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
  actionTitle :  string = 'Add a new Task';

  /*Date Picker Conf*/
  bsValue = new Date();
  dateModel: any;

  /* Nested Value*/
  public listCollection: any;
  public selectedListId: any;

  /*Edit action */
  etask : Task;
  
  constructor(
    private taskService: TaskService,
    private listService:ListService,
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
      this.idTask = parseInt(this.route.snapshot.params[id]);
      this.action = 'edit';
      this.actionTitle = 'Edit Task'
    }

     /* Form Builder */
     this.addEditTaskForm = new FormGroup({
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
      remindDate: new FormControl(new Date()),
      dueDate: new FormControl(new Date(), [ Validators.required]),
      myDayDate: new FormControl(new Date()),
      notes: new FormControl(),
      isCompleted: new FormControl(false),
      isImportant: new FormControl(false),
      list: new FormControl('', [Validators.required])
    });
  }

  async ngOnInit() {

    this.user = await this.authService.getCurrentFirebaseUser();

    if (this.user) {
      this.getListsForUser(this.user.uid);
      
      if(this.idTask > 0){
      
        await this.taskService.getTask(this.idTask, this.user.uid)
          .subscribe(data => (
            this.etask = data,
            this.addEditTaskForm.controls["description"].setValue(data.description),
            this.addEditTaskForm.controls["notes"].setValue(data.notes),
            this.addEditTaskForm.controls["dueDate"].setValue( new Date(data.dueDate)),
            this.addEditTaskForm.controls["list"].setValue(data.idList),
            this.addEditTaskForm.controls["isImportant"].setValue(data.isImportant),
            this.addEditTaskForm.controls["isCompleted"].setValue(data.isCompleted),
            this.addEditTaskForm.controls["remindDate"].setValue( new Date(data.remindDate)),
            this.addEditTaskForm.controls["myDayDate"].setValue( new Date(data.myDayDate))
          ));
      }
    }
  }

  get gForm() {
    return this.addEditTaskForm.controls;
  }

  Save() {
    
    this.submitted = true;

    if (this.addEditTaskForm.invalid) {
      return;
    }

    /*Getting values from form */
    const {
      list,
      description,
      remindDate,
      dueDate,
      myDayDate,
      notes,
      isCompleted,
      isImportant,
    } = this.addEditTaskForm.value;

    let task: Task = {
      id: 0,
      idList : parseInt(list),
      description: description,
      remindDate: remindDate,
      dueDate: dueDate,
      myDayDate: myDayDate,
      notes: notes,
      isCompleted: isCompleted,
      isImportant: isImportant
    };

    if (this.action === 'add') {
      return this.taskService.createTaskForList(task).subscribe((data) => {
        this.toastr.success('The task has been created.');
        this.router.navigate(['/task/show/all']);
        this.onReset();
      })
    }

    if (this.action === 'edit') {
      task.id = this.idTask;
      return this.taskService.updateTask(task).subscribe((data) => {
        this.toastr.success('The task has been updated.');
        this.router.navigate(['/task/show/all']);
        this.onReset();
      })
    }
  }

  onReset() {
    this.submitted = false;
    this.addEditTaskForm.reset();
  }

  getListsForUser(uid: string) {
    this.listCollection = this.listService.getListsForUser(uid);
  }
}
