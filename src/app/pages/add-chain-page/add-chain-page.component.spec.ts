import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChainPageComponent } from './add-chain-page.component';

describe('AddChainPageComponent', () => {
  let component: AddChainPageComponent;
  let fixture: ComponentFixture<AddChainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddChainPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddChainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
