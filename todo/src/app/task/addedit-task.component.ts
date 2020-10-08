import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/services/auth.service';
import { ListService } from '../auth/services/list.service';
import { TaskService } from '../auth/services/task.service';


@Component({
  selector: 'app-addedit-task',
  templateUrl: './addedit-task.component.html'
})
export class AddEditTaskComponent implements OnInit {

  public user: any;
  addEditTaskForm: FormGroup;
  submitted = false;
  add = false;


  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router : Router
  ) { }

  async ngOnInit() {

    this.addEditTaskForm = this.formBuilder.group({
      
      description: ['', [Validators.required, Validators.maxLength(200)]],
      remindeDate : [],
      dueDate : [Validators.required],
      myDayDate : [],
      Notes : [],
      isCompleted : [],
      isImportant : [],
    });

    this.user = await this.authService.getCurrentFirebaseUser();
    if (this.user) {
      
    }

  }

}
