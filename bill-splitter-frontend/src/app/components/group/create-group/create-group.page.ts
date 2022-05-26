import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateGroup} from '../../../service/group/dto/create-group.type';
import {GroupService} from '../../../service/group/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {

  public defaultBackHref = '/tabs/groups';
  public createGroupForm: FormGroup;

  constructor(private groupService: GroupService) { }

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
  }

  private buildForm(): void {
    this.createGroupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      description: new FormControl('', [Validators.maxLength(100)]),
    });
  }
}
