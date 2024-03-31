import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatgroupComponent } from './creatgroup.component';

describe('CreatgroupComponent', () => {
  let component: CreatgroupComponent;
  let fixture: ComponentFixture<CreatgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
