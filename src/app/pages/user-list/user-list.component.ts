import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user-config";
import {UserService} from "../../services/user.service";
import {
  MyAction,
  MyOrder,
  MyPagination,
  MySearch,
  MyTableActionEnum,
  MyTableConfig
} from "../../components/my-table/my-table-config";
import {Router} from '@angular/router';
import * as moment from "moment";


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


  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.getUsers()

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
        text: 'nuovo utente',
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
          key: 'birthDateFormat',
          label: 'data di nascita',
        },
        {
          key: 'username',
          label: 'username',
        },
        {
          key: 'password',
          label: 'password',
        },
        {
          key: 'actions',
          label: 'azioni'
        }
      ],
      order: this.order,
      search: this.search,
      pagination: this.pagination,
      actions: this.actions
    }

  }


  actionToPerform(myObject: any) {

    let action = myObject.action
    let user = myObject.row

    switch (action) {
      case 'edit': {
        this.editUser(user.username)
        break;
      }
      case 'delete': {
        this.deleteUser(user.username)
        break;
      }
      case 'new-row': {
        this.router.navigate(['add'])
        break;
      }
    }
  }


  getUsers() {
    this.userService.getUsers().subscribe(data => {
      data.forEach(user => {
        user.birthDateFormat = moment(user.birthDate).format('DD-MM-YYYY')
      })
      this.users = data;
    });
  }

  deleteUser(username: string) {
    this.userService.deleteUser(username).subscribe(() => {
      this.getUsers()
    })
  }

  editUser(username : string) {
    this.router.navigate(['newuser'], {queryParams: {usertoedit: username}})
    }
  }

