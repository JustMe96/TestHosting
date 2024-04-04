import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineRadioButtonsComponent } from './inline-radio-buttons.component';

describe('InlineRadioButtonsComponent', () => {
  let component: InlineRadioButtonsComponent;
  let fixture: ComponentFixture<InlineRadioButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineRadioButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InlineRadioButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
