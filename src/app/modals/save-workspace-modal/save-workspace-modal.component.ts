import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import { SaveExistsWorkspaceModalComponent } from '../save-exists-workspace-modal/save-exists-workspace-modal.component';
import { SaveSuccessWorkspaceModalComponent } from '../save-success-workspace-modal/save-success-workspace-modal.component';

@Component({
  selector: 'app-save-workspace-modal',
  templateUrl: './save-workspace-modal.component.html',
  styleUrls: ['./save-workspace-modal.component.scss'],
})
export class SaveWorkspaceModalComponent implements OnInit {
  constructor(
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private ngModalService: NgbModal
  ) {}
  projectId: string | undefined;

  ngOnInit(): void {}

  cancel() {
    console.log('modal cancel!');
    this.activeModal.close('cancel');
  }

  projectName: string = '';
  projectDesc: string = '';

  saveProject() {
    console.log('btn saveProject');
    let req = {
      profile_id: '6',
      project_name: this.projectName,
      project_description: this.projectDesc,
      inductry_id: '1',
      product_id: '1',
      feature: [
        {
          product_feature_id: '10001',
          operator: 'Is',
          item_value: ['Female', 'Male', 'Unknow'],
          range_value: [],
          graph_order: '1',
          feature_order: '1',
        },
        {
          product_feature_id: '10002',
          operator: 'Is',
          item_value: ['20-24', '25-29', '30-34'],
          range_value: [],
          graph_order: '1',
          feature_order: '1',
        },
      ],
    };

    this.apiService.postSaveProjectAPI(req).subscribe((data) => {
      // if (data.resultData.length > 0) {
        console.log('data.resultData.length > 0');
        if (data.resultCode === '20100') {
          console.log('20100');
          const modalRef = this.ngModalService.open(
            SaveSuccessWorkspaceModalComponent,
            {
              size: 'md',
              centered: true,
              backdrop: 'static',
            }
          );
          modalRef.result.then((result: any) => {
            if (result.search('save') != -1) {
              console.log('save');
            }
          });
          this.activeModal.close('save');
        } 
      // }
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
