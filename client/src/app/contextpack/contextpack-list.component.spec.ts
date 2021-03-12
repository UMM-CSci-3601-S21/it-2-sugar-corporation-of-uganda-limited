import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextpackListComponent } from './contextpack-list.component';

describe('ContextpackListComponent', () => {
  let component: ContextpackListComponent;
  let fixture: ComponentFixture<ContextpackListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextpackListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextpackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
