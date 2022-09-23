import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-project-modal',
  templateUrl: './delete-project-modal.component.html',
  styleUrls: ['./delete-project-modal.component.scss'],
})
export class DeleteProjectModalComponent implements OnInit {
  constructor(private activeModal: NgbActiveModal) {}
  projectName: string | undefined;

  ngOnInit(): void {}
  cancel() {
    console.log('modal cancel!');
    this.activeModal.close('cancel');
  }

  delete() {
    console.log('modal delete!');
    // TODO: call api delete project

    this.activeModal.close('deleting');
  }
}
