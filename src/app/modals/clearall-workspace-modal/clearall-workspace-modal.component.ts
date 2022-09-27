import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clearall-workspace-modal',
  templateUrl: './clearall-workspace-modal.component.html',
  styleUrls: ['./clearall-workspace-modal.component.scss']
})
export class ClearallWorkspaceModalComponent implements OnInit {
  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
  cancel() {
    console.log('modal cancel!');
    this.activeModal.close('cancel');
  }

  clearAll() {
    console.log('modal clear all!');
    // TODO: call api delete project

    this.activeModal.close('clear all');
  }

}
