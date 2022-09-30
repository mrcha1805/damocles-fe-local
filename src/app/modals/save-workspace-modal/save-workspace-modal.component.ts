import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import { IRequestProject } from 'app/model/create-project-inteface';
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
  data: IRequestProject | undefined;
  ngOnInit(): void {}

  cancel() {
    console.log('modal cancel!');
    this.activeModal.close('cancel');
  }

  projectName: string = '';
  projectDesc: string = '';

  saveProject() {
    console.log('btn saveProject');
    // let req = {
    //   profile_id: '6',
    //   project_name: '1FlexiDrive 202206',
    //   project_description: 'INS_ASSET_test',
    //   create_date: '20220927 13:32:43',
    //   update_date: '20220927 13:40:38',
    //   inductry_id: '1',
    //   product_id: '1',
    //   feature: [
    //     {
    //       product_feature_id: '10001',
    //       operator: 'Is',
    //       item_value: ['Female', 'Male', 'Unknow'],
    //       range_value: [],
    //       graph_order: '1',
    //       feature_order: '1',
    //     },
    //     {
    //       product_feature_id: '10002',
    //       operator: 'Is',
    //       item_value: ['20-24', '25-29', '30-34'],
    //       range_value: [],
    //       graph_order: '1',
    //       feature_order: '1',
    //     },
    //   ],
    // };
    this.data!.project_name = this.projectName;
    this.data!.project_description = this.projectDesc;
      // if (data.resultData.length > 0) {
        console.log('data.resultData.length > 0');

      // }

    // this.apiService.postSaveProjectAPI(this.data).subscribe((data) => {
    //   if (data.resultData.length > 0) {
    //     if (data.resultCode === '20000') {
    //       const modalRef = this.ngModalService.open(
    //         SaveSuccessWorkspaceModalComponent,
    //         {
    //           size: 'md',
    //           centered: true,
    //           backdrop: 'static',
    //         }
    //       );
    //       modalRef.result.then((result: any) => {
    //         if (result.search('save') != -1) {
    //           console.log('save');
    //         }
    //       });
    //       this.activeModal.close('save');
    //     } else {
    //       console.log('already exists');
    //       const modalRef = this.ngModalService.open(
    //         SaveExistsWorkspaceModalComponent,
    //         {
    //           size: 'sm',
    //           centered: true,
    //           backdrop: 'static',
    //         }
    //       );
    //       this.activeModal.close('save');
    //     }
    //   }
    //   // (errorMsg) => {
    //   //   console.log('saveProjectAPI: ', errorMsg);

    //   //   this.toaster.error(errorMsg, '', {
    //   //     timeOut: 5000,
    //   //     positionClass: 'toast-top-center',
    //   //   })
    //   // }
    // });
  }
}
