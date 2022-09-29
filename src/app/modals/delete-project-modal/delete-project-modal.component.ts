import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-delete-project-modal',
  templateUrl: './delete-project-modal.component.html',
  styleUrls: ['./delete-project-modal.component.scss'],
})
export class DeleteProjectModalComponent implements OnInit {
  constructor(
    private activeModal: NgbActiveModal,
    private apiService: ApiService
  ) {}
  projectName: string | undefined;
  projectId: string | undefined;
  ngOnInit(): void {}
  cancel() {
    console.log('modal cancel!');
    this.activeModal.close('cancel');
  }

  delete() {
    console.log('modal delete!');
    // TODO: call api delete project
    this.apiService.deleteProjectAPI(this.projectId!).subscribe((data) => {
      if (data.resultCode === '20000') {
        this.activeModal.close('deleting');
      }
    });
  }
}
