import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/service/UserService";
import {MatTableDataSource} from "@angular/material/table";
import {UserEntity} from "../../shared/models/UserEntity";
import {Router} from "@angular/router";

@Component({
  selector: "app-user-search",
  templateUrl: "user-search.component.html",
  styleUrls: ["user-search.component.scss"]
})
export class UserSearchComponent implements OnInit, AfterViewInit{
  @ViewChild('lastNameInput') lastNameInput!: ElementRef<HTMLInputElement>
  searchForm!: FormGroup;

  dataSource!: MatTableDataSource<UserEntity>;

  private timerId?: NodeJS.Timeout;

  columnsToDisplay = ['lastName', 'firstName', 'birthDate', 'email', 'phoneNumber'];

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }


  ngOnInit() {
    this.searchForm = this.fb.group({
      firstName: [""],
      lastName: ["", [Validators.minLength(2), Validators.required]]
    })
  }

  ngAfterViewInit() {
    this.lastNameInput.nativeElement.focus();
  }

  findUsers() {
    if(this.searchForm.valid) {
      if(this.timerId) {
        clearTimeout(this.timerId);
      }
      this.timerId = setTimeout(() => {
        let firstName = this.searchForm.value["firstName"] ?? "";
        let lastName = this.searchForm.value["lastName"];
        this.userService.findUsersByFirstAndLastName(firstName, lastName)
          .subscribe(users => {
            this.dataSource = new MatTableDataSource<UserEntity>(users);
          })
      }, 500);

    }
  }

  navigateToProfile(userId: string) {
    this.router.navigate(["/profile", userId]);
  }


}
