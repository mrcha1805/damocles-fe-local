import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveWorkspaceModalComponent } from './save-workspace-modal.component';

describe('SaveWorkspaceModalComponent', () => {
  let component: SaveWorkspaceModalComponent;
  let fixture: ComponentFixture<SaveWorkspaceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveWorkspaceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveWorkspaceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
