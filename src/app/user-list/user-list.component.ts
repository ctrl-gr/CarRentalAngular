import {Component, Input, OnInit} from '@angular/core';
import {User} from "../user/user-config";
import {UserService} from "../services/user.service";
import {MyAction, MyOrder, MyPagination, MySearch, MyTableActionEnum, MyTableConfig} from "../my-table/my-table-config";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  tableConfig !: MyTableConfig;
  order !: MyOrder;
  search !: MySearch;
  pagination !: MyPagination;
  actions !: MyAction[];
  users: User[] = [];
  data!: any[];


  constructor(private userService: UserService) {
  }

  ngOnInit() {

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

    this.tableConfig = {
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
      users: this.getUsers()
    }
    ]


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

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users)
    });
  }

}
