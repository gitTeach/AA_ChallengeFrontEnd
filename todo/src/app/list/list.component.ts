import { Component, OnInit } from '@angular/core';
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

  public list : any;
  public user : any;

  constructor(private listService : ListService,
              private authService : AuthService) {

   }

  async ngOnInit() {
    this.user = await this.authService.getCurrentFirebaseUser();
    if (this.user){
      console.log('list component->', this.user);
      this.getListsForUser(this.user.uid);
    }
  }

  getListsForUser(uid:string) {
    this.list = this.listService.getListsForUser(uid);
  }

  onClick(){
    console.log('click');
  }

}
