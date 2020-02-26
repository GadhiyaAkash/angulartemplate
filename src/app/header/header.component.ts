import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /**
   * Declaration of Variable's
   */
  faShoppingBasket = faShoppingCart;
  closeResult: string;
  registerForm: FormGroup;
  submitted = false;
  currentUser: User;

  /**
   * Constructor to assign instance
   */
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    console.log("this.authenticationService.currentUserValue::", this.authenticationService.currentUserValue);
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    console.log("this.currentUser::", this.currentUser);

  }

  /**
   * On init modal when component has been loaded
   */
  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        username: ["", Validators.required],
        password: ["", Validators.required]
      }
    );
  }

  /**
   * Open ng-bootstrap model to login in application
   * @param content 
   */
  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**
   * Disable the model when fire event for closing modal
   * @param reason 
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  /**
   * Close modal with erase all data from modal
   * and make it valid form 
   */
  closeModal() {
    this.submitted = false;
    this.registerForm.reset();
    this.modalService.dismissAll();
  }

  /** 
   * convenience getter for easy access to form fields
   */
  get f() {
    return this.registerForm.controls;
  }

  /**
   * On click login button
   */
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.authenticationService.login(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success('You are loggedIn successfully');
          this.closeModal();
        },
        error => {
          let errorMessage = (error && error.error) ? error.error : 'Sorry! something went wrong.'
          this.toastr.error(errorMessage);
          this.registerForm.reset();
          this.submitted = false;
        });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
