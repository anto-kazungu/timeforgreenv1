import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeLoggingComponent } from './tree-logging.component';

describe('TreeLoggingComponent', () => {
  let component: TreeLoggingComponent;
  let fixture: ComponentFixture<TreeLoggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeLoggingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeLoggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
