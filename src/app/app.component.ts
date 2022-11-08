import {Component, OnInit} from '@angular/core';
import {MyButtonConfig} from "./my-button/my-button-config";
import {MyAction, MyOrder, MyPagination, MySearch, MyTableActionEnum, MyTableConfig} from "./my-table/my-table-config";
import {User} from "./user/user-config";
import {UserService} from "./services/user.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  config !: MyButtonConfig;
  table !: MyTableConfig;
  data !: any[];
  order !: MyOrder;
  search !: MySearch;
  pagination !: MyPagination;
  actions !: MyAction[];
  users: User[]=[]

  constructor(private userService: UserService){}
  getUsers(){
    this.userService.getUsers().subscribe(user => {
      this.users=user;
    });
  }

  ngOnInit() {
    this.config = {
      customCssClass: 'btn btn-primary',
      text: 'giulia',
      icon: 'home'
    }
    this.pagination = {
      itemPerPage: 5,
      itemPerPageOptions: [5, 10, 15]
    }
    this.order = {
      defaultColumn: 'name',
      orderType: 'asc'
    }

    this.search = {
      columns: this.data
    }

    this.actions = [
      {
        text: 'modifica',
        cssClass: 'btn btn-warning',
        actionType: MyTableActionEnum.EDIT,
        icon: 'edit',
        onTop: false
      },
      {
        text: 'elimina',
        cssClass: 'btn btn-danger',
        actionType: MyTableActionEnum.DELETE,
        icon: 'remove',
        onTop: false
      },
      {
        text: 'nuovo dato',
        cssClass: 'btn btn-primary',
        actionType: MyTableActionEnum.NEW_ROW,
        icon: 'add',
        onTop: true
      }
    ]

    this.table = {
      headers: [
        {
          key: 'firstName',
          label: 'nome',
        },
        {
          key: 'lastName',
          label: 'cognome',
        },
        {
          key: 'birthDate',
          label: 'data di nascita',
        },
        {
          key: 'username',
          label: 'username',
        },
        {
          key: 'password',
          label: 'password',
        }
      ],
      order: this.order,
      search: this.search,
      pagination: this.pagination,
      actions: this.actions
    }

    this.data = [{
      users: this.users
    }
    ]

    this.getUsers();
  }

  actionToPerform(myObject: any) {

    console.log(myObject)
    let action = myObject.action

    switch (action) {
      case 'edit': {
        console.log('element ready to get edited')
        break;
      }
      case 'delete': {
        console.log('element deleted')
        break;
      }
      case 'new-row': { // this is not taking anything in input
        console.log('new element')
        break;
      }
    }
  }
}

