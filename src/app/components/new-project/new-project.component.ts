import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DeleteProjectModalComponent } from 'src/app/modals/delete-project-modal/delete-project-modal.component';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
})
export class NewProjectComponent implements OnInit {
  isOpen: boolean = false;
  typeSelected: string;

  constructor(
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private ngModalService: NgbModal
  ) {
    this.typeSelected = 'ball-atom';
  }

  ngOnInit(): void {}

  showSpinner(path: string) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.router.navigateByUrl(path);
    }, 1000);
  }

  goKpi() {
    this.showSpinner('/kpi');
  }

  deleteProject() {
    console.log('deleteProject');
    const modalRef = this.ngModalService.open(DeleteProjectModalComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.projectName = 'My Project 101';
    modalRef.result.then((result: any) => {
      if (result.search('deleting') != -1) {
        console.log(result);
        // TODO: update project lists
      }
    });
  }
}
