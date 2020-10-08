import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { auth } from 'firebase';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { ListService } from '../auth/services/list.service';
import { List } from '../models/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public listCollection : any;
  public list : List;
  public user : any;
  listForm: FormGroup;
  submitted = false;
  add = false;

  constructor(private listService : ListService,
              private authService : AuthService,
              private formBuilder: FormBuilder) {

   }

  async ngOnInit() {

    this.listForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
    });

    this.user = await this.authService.getCurrentFirebaseUser();
    if (this.user){
      console.log('list component->', this.user);
      this.getListsForUser(this.user.uid);
    }
  }

  get currentListForm() {
    return this.listForm.controls;
  }

  getListsForUser(uid:string) {
    this.listCollection = this.listService.getListsForUser(uid);
  }

  onClick(){
    console.log('click');
  }
  
  createList(){

    console.log(this.listForm.controls);
    
    this.submitted = true;

    if (this.listForm.invalid) {
      return;
    }

    const { name, description } = this.listForm.value;
    this.list.name = name;
    this.list.description = description;
    this.list.userId = this.user.uid;
    
    this.listService.createListForUser(this.list, this.list.userId);
    
  }

  addList(){
    this.add = true;
  }

  onReset() {
    this.submitted = false;
    this.listForm.reset();
  }

}
