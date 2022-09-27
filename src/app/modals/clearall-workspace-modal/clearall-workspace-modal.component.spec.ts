import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearallWorkspaceModalComponent } from './clearall-workspace-modal.component';

describe('ClearallWorkspaceModalComponent', () => {
  let component: ClearallWorkspaceModalComponent;
  let fixture: ComponentFixture<ClearallWorkspaceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearallWorkspaceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearallWorkspaceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
