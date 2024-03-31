import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadproductComponent } from './uploadproduct.component';

describe('UploadproductComponent', () => {
  let component: UploadproductComponent;
  let fixture: ComponentFixture<UploadproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
