import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user-config";
import {UserService} from "../../services/user.service";
import {isString} from "lodash";
import {MyButtonConfig} from "../../components/my-button/my-button-config";
import {QuestionService} from "../../components/my-dynamic-form/question.service";
import {QuestionBase} from "../../components/my-dynamic-form/question-base";


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [QuestionService]
})
export class AddUserComponent implements OnInit {

  isAdmin !: boolean
  userToEdit !: string
  isEditMode !: boolean
  user !: User
  userSaved !: boolean
  buttonConfig !: MyButtonConfig
  alert !: boolean
  message !: string
  questions: QuestionBase<any>[] = [];


  constructor(
    public authService: AuthService,
    private userService: UserService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
  ) {

  }

  ngOnInit() {
    this.questions = this.questionService.getUserQuestions()
    this.isAdmin = this.authService.checkIsAdmin()


    this.activatedRoute.queryParams.subscribe(params => {
      if (params && isString(params['usertoedit'])) {
        this.userToEdit = params['usertoedit']
        this.isEditMode = true
        this.getUserToEdit(this.userToEdit)
      }
    })
  }

  registerUser(event: any) {
    console.log(event)
    if (!this.isAdmin) {
      this.authService.signUp(event).subscribe(
        data => {
          this.userSaved = true
          this.alert = true
          this.message = "User saved successfully. Please log in"
        }
      )

    } else {
      this.authService.signUp(event).subscribe(
        data => {
          this.userSaved = true
          this.alert = true
          this.message = "User saved successfully."
        }
      )
    }

  }

  getUserToEdit(username: string) {
    username = this.userToEdit
    this.userService.getUserByUsername(username).subscribe(user => {
      this.questions = this.questionService.getUserQuestions(user)
    })
  }

  editUser(event: any) {
    this.userService
      .editUser(event, this.userToEdit)
      .subscribe(() => this.user)
    this.alert = true
    this.userSaved = true
    this.message = "User edited successfully."

  }

  closeAlert() {
    this.userSaved = false
    if (!this.isAdmin) {
      this.router.navigate(['login'], {queryParams: {registrationSuccess: true}})
    } else {
      this.router.navigate(['homepage'], {queryParams: {registrationSuccess: true}})
    }
  }

}

