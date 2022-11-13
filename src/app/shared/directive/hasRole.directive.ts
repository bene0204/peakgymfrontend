import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";
import {AuthService} from "../service/AuthService";

@Directive({
  selector: "[hasRole]",
})
export class HasRoleDirective implements OnInit{

  requiredRoles: string[] = []
  role = "";

  constructor(private authService: AuthService, private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef, element: ElementRef) {
  }
  ngOnInit() {
    this.authService.user.subscribe({
      next: (user) => {
        if (user) {
          this.role = user.role;
          this.updateView();
        } else {
          this.role = "";
          this.updateView();
        }
      }
    })
  }

  @Input()
  set hasRole(requiredRoles: string[]) {
    this.requiredRoles = requiredRoles;
    this.updateView();
  }

  updateView() {
    this.viewContainer.clear();
    if (this.checkRole()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  checkRole() {
    return this.requiredRoles.includes(this.role);
  }

}
