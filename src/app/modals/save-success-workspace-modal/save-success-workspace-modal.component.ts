import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-save-success-workspace-modal',
  templateUrl: './save-success-workspace-modal.component.html',
  styleUrls: ['./save-success-workspace-modal.component.scss']
})
export class SaveSuccessWorkspaceModalComponent implements OnInit {
  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  done() {
    console.log('modal save success!');
    // TODO: call api delete project
    this.activeModal.close('save-success');
  }

}
