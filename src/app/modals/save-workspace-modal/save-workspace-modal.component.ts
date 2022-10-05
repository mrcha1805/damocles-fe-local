import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import { IRequestProject } from 'app/model/create-project-inteface';
import { GetprojectIDData, IGetprojectID } from 'app/model/get-project-id-interface';
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
  ) { }
  data: IRequestProject | undefined;
  projectDataApi: IGetprojectID | undefined;
  projectData: GetprojectIDData | undefined;
  InitialProjectName: string | undefined;
  InitialProjectNameFormat: string | undefined;

  ngOnInit(): void {
    if (this.InitialProjectName) {
      this.InitialProjectNameFormat = this.InitialProjectName.substring(0,19)
    }
  }

  cancel() {
    console.log('cancel save');
    this.activeModal.close('cancel save');
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
    this.data!.project_name = (this.InitialProjectNameFormat + this.projectName);
    this.data!.project_description = this.projectDesc;

    console.log(`save project ${JSON.stringify(this.data)}`);
    console.log('project_name', this.data!.project_name);

    this.apiService.postSaveProjectAPI(this.data).subscribe(
      (data) => {
        console.log('response data ' + JSON.stringify(data));

        if (data.resultCode === '20100') {
          console.log('save return 20100');
          const modalRef = this.ngModalService.open(
            SaveSuccessWorkspaceModalComponent,
            {
              size: 'md',
              centered: true,
              backdrop: 'static',
            }
          );
          modalRef.result.then((result: any) => {
            if (result.search('save-success') != -1) {
              console.log('save-success');
            }
          });
          this.activeModal.close('save-success');
        }
      },
      (errorMsg) => {
        // this.projectName = 'xxx';
        this.apiService.getProjectIDAPI(this.projectName).subscribe((data: IGetprojectID) => {
          this.projectDataApi = data;
          if (this.projectDataApi.resultCode === '20000') {
            this.projectData = this.projectDataApi?.resultData;
            console.log('dynamicProjectIDMockup:', this.projectData?.project_id);
            console.log('case project is exist');
            const modalRef = this.ngModalService.open(
              SaveExistsWorkspaceModalComponent,
              {
                size: 'sm',
                centered: true,
                backdrop: 'static',
              }
            );
            modalRef.componentInstance.data = this.data;
            modalRef.componentInstance.projectID = this.projectData?.project_id;
            modalRef.componentInstance.projectName = this.data!.project_name;
            modalRef.result.then((result: any) => {
              if (result.search('replace') != -1) {
                this.activeModal.close('projectIsExist');
                // TODO: update project lists
              } else if (result.search('cancel replace') != -1) {
                this.activeModal.close('cancel replace');
              }
            });
          }
          console.log('can not get ProjectIDAPI');
        },
          (errorMsg) => {
            this.activeModal.close('can not get project id');
          });
      }
    );
  }

}
