import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import { SaveExistsWorkspaceModalComponent } from '../save-exists-workspace-modal/save-exists-workspace-modal.component';
import { SaveSuccessWorkspaceModalComponent } from '../save-success-workspace-modal/save-success-workspace-modal.component';

@Component({
  selector: 'app-save-workspace-modal',
  templateUrl: './save-workspace-modal.component.html',
  styleUrls: ['./save-workspace-modal.component.scss']
})
export class SaveWorkspaceModalComponent implements OnInit {
  constructor(
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private ngModalService: NgbModal
  ) { }
  projectId: string | undefined;

  ngOnInit(): void { }

  cancel() {
    console.log('modal cancel!');
    this.activeModal.close('cancel');
  }

  projectName: string = '';
  projectDesc: string = '';

  saveProject() {
    console.log('modal save!');
    this.apiService.postSaveProjectAPI(this.projectName).subscribe((data) => {
      console.log('this.projectName', this.projectName);
      console.log('this.projectDesc', this.projectDesc);
      if (data.resultData.length > 0) {

        if (data.resultCode === '20000') {
          const modalRef = this.ngModalService.open(SaveSuccessWorkspaceModalComponent, {
            size: 'md',
            centered: true,
            backdrop: 'static',
          });
          modalRef.result.then((result: any) => {
            if (result.search('save') != -1) {
              console.log('save')
            }
          });
          this.activeModal.close('save');
        } else {
          console.log('already exists');
          const modalRef = this.ngModalService.open(SaveExistsWorkspaceModalComponent, {
            size: 'sm',
            centered: true,
            backdrop: 'static',
          });
          this.activeModal.close('save');
        }
      }
      // (errorMsg) => {
      //   console.log('saveProjectAPI: ', errorMsg);

      //   this.toaster.error(errorMsg, '', {
      //     timeOut: 5000,
      //     positionClass: 'toast-top-center',
      //   })
      // }


    });
  }

}
