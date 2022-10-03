import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import { IRequestProject } from 'app/model/create-project-inteface';

@Component({
  selector: 'app-save-exists-workspace-modal',
  templateUrl: './save-exists-workspace-modal.component.html',
  styleUrls: ['./save-exists-workspace-modal.component.scss'],
})
export class SaveExistsWorkspaceModalComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private activeModal: NgbActiveModal
  ) {}
  projectName: string | undefined;
  data: IRequestProject | undefined;
  ngOnInit(): void {}
  cancelExists() {
    console.log('modal cancel exists!');
    this.activeModal.close('cancel exists');
  }

  replace() {
    console.log('modal replace!');
    // TODO: call api delete project
    this.apiService.replaceSaveProjectAPI(this.data, '1').subscribe((data) => {
      if (data.resultCode === '20100') {
        console.log('replace project ');
        this.activeModal.close('replace');
      }
    });
  }
}
