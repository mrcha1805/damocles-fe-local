import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-save-exists-workspace-modal',
  templateUrl: './save-exists-workspace-modal.component.html',
  styleUrls: ['./save-exists-workspace-modal.component.scss']
})
export class SaveExistsWorkspaceModalComponent implements OnInit {
  constructor(private activeModal: NgbActiveModal) {}
  projectName: string | undefined;

  ngOnInit(): void {}
  cancel() {
    console.log('modal cancel!');
    this.activeModal.close('cancel');
  }

  replace() {
    console.log('modal replace!');
    // TODO: call api delete project

    this.activeModal.close('replace');
  }

}
