import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureBox } from './capture-box';

describe('CaptureBox', () => {
  let component: CaptureBox;
  let fixture: ComponentFixture<CaptureBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptureBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptureBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
