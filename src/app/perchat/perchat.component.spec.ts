import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerchatComponent } from './perchat.component';

describe('PerchatComponent', () => {
  let component: PerchatComponent;
  let fixture: ComponentFixture<PerchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
