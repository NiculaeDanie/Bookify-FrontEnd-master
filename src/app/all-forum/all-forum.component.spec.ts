import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllForumComponent } from './all-forum.component';

describe('AllForumComponent', () => {
  let component: AllForumComponent;
  let fixture: ComponentFixture<AllForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllForumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
