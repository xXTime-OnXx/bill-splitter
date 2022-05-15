import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {

  public defaultBackHref = '/tabs/groups';
  public changePasswordForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.buildForm();
  }

  createGroup(): void {

  }

  private buildForm(): void {
    this.changePasswordForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      description: new FormControl('', [Validators.maxLength(100)]),
    });
  }
}
