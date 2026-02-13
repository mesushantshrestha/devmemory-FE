import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturePage } from './capture-page';

describe('CapturePage', () => {
  let component: CapturePage;
  let fixture: ComponentFixture<CapturePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapturePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
