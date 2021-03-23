import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWordpacksComponent } from './edit-wordpacks.component';

describe('EditWordpacksComponent', () => {
  let component: EditWordpacksComponent;
  let fixture: ComponentFixture<EditWordpacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWordpacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWordpacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
