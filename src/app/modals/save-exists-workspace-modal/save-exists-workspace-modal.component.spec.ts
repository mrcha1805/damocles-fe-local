import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveExistsWorkspaceModalComponent } from './save-exists-workspace-modal.component';

describe('SaveExistsWorkspaceModalComponent', () => {
  let component: SaveExistsWorkspaceModalComponent;
  let fixture: ComponentFixture<SaveExistsWorkspaceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveExistsWorkspaceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveExistsWorkspaceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
