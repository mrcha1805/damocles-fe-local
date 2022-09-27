import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    private ngModalService: NgbModal) {}

  ngOnInit(): void {}

  cancel() {
    // console.log('modal cancel!');
    // this.activeModal.close('cancel');

    // # Open when save file already exists
    console.log('cancel');
    const modalRef = this.ngModalService.open(SaveExistsWorkspaceModalComponent, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
    });
    modalRef.result.then((result: any) => {
      if (result.search('cancel') != -1) {
        console.log('cancel')
        // TODO: update project lists
      }
    });

  }

  saveProject() {
    console.log('save');
    const modalRef = this.ngModalService.open(SaveSuccessWorkspaceModalComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
    });
    modalRef.result.then((result: any) => {
      if (result.search('save') != -1) {
        console.log('save')
        // TODO: update project lists
      }
    });
    this.activeModal.close('save');
  }

}
