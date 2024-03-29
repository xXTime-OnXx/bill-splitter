import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {CreateGroup} from '../../../service/group/dto/create-group.type';
import {GroupService} from '../../../service/group/group.service';
import {NavigationHandler} from "../../../service/navigation/navigation.handler";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {

  public defaultBackHref = '/tabs/groups';
  public createGroupForm: UntypedFormGroup;

  constructor(private groupService: GroupService,
              private navHandler: NavigationHandler) { }

  ngOnInit() {
    this.buildForm();
  }

  async createGroup(): Promise<void> {
    if (!this.createGroupForm.valid) {
      // TODO: Error handling
      return;
    }
    const createGroup: CreateGroup = {
      name: this.createGroupForm.get('name').value,
      description: this.createGroupForm.get('description').value
    };
    await this.groupService.createGroup(createGroup);
    await this.navHandler.navigateBack(this.defaultBackHref);
  }

  private buildForm(): void {
    this.createGroupForm = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
      description: new UntypedFormControl('', [Validators.maxLength(100)]),
    });
  }
}
