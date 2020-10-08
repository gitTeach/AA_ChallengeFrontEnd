import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { auth } from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { ListService } from '../auth/services/list.service';
import { TaskService } from '../auth/services/task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  public taskCollection: any;
  public user: any;

  constructor(private taskService : TaskService,
              private authService: AuthService,
              private toastr: ToastrService) { }

  async ngOnInit() {

    this.user = await this.authService.getCurrentFirebaseUser();
    if (this.user) {
      this.getTasksForUser(this.user.uid);
    }
  }

  getTasksForList(idList: number) {
    this.taskCollection = this.taskService.getTasksForList(idList);
  }

  getTasksForUser(userId: string) {
    this.taskCollection = this.taskService.getTasksForUser(userId);
  }
  
}
