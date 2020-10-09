import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { auth } from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { ListService } from '../auth/services/list.service';
import { TaskService } from '../auth/services/task.service';
import { Router, ActivatedRoute,  ParamMap } from '@angular/router';
import { List } from '../models/list';
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  public taskCollection = null;
  public taskCollectionFiltered = null;
  public user: any;
  category : string;
  idlist :  number;
  today : Date;

  constructor(private taskService : TaskService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) 
  { 
    this.today = new Date();
    const category = 'category';
    const idlist = 'idlist';
    
    if (this.route.snapshot.params[category]) {
      this.category = this.route.snapshot.params[category];
    }

    if (this.route.snapshot.params[idlist]) {
      this.idlist = this.route.snapshot.params[idlist];
    }

  }

  async ngOnInit() {

    this.user = await this.authService.getCurrentFirebaseUser();
    
    if(this.category){
      this.getTasksDetail(this.user.email, 0, this.category);
    }

    if(this.idlist){
      this.getTasksDetail(this.user.email,this.idlist, "");
    }

  }

  getTasksForList(idList: number) {
    return this.taskService.getTasksForList(idList).pipe(first()).subscribe((data) => {this.taskCollection = data, this.taskCollectionFiltered = data});
  }
  getTasksDetail(userId: string, idlist:number, category: string) {
    return this.taskService.getTasksDetail(userId, idlist, category).pipe(first()).subscribe((data) => {this.taskCollection = data, this.taskCollectionFiltered = data});
  }

  assignCopy() {
    this.taskCollectionFiltered = Object.assign([], this.taskCollectionFiltered);
  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();
    } // when nothing has typed
    this.taskCollectionFiltered = Object.assign([], this.taskCollection).filter(
      (item) => item.description.toLowerCase().indexOf(value.toLowerCase()) > -1 
      || item.notes.toLowerCase().indexOf(value.toLowerCase()) > -1
      || item.listName.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }

  addTask(){
    this.router.navigate(['/task/add']);
  }

  viewEditTask(id){
    this.router.navigate(['../task/edit/', id]);
  }
  
}
