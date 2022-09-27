import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSuccessWorkspaceModalComponent } from './save-success-workspace-modal.component';

describe('SaveSuccessWorkspaceModalComponent', () => {
  let component: SaveSuccessWorkspaceModalComponent;
  let fixture: ComponentFixture<SaveSuccessWorkspaceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveSuccessWorkspaceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveSuccessWorkspaceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
