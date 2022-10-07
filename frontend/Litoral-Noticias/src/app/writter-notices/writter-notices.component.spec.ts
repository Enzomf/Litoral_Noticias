import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritterNoticesComponent } from './writter-notices.component';

describe('WritterNoticesComponent', () => {
  let component: WritterNoticesComponent;
  let fixture: ComponentFixture<WritterNoticesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WritterNoticesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WritterNoticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
