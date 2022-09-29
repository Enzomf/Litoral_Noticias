import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritterDashboardComponent } from './writter-dashboard.component';

describe('WritterDashboardComponent', () => {
  let component: WritterDashboardComponent;
  let fixture: ComponentFixture<WritterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WritterDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WritterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
