import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainItemPreviewComponent } from './chain-item-preview.component';

describe('ChainItemPreviewComponent', () => {
  let component: ChainItemPreviewComponent;
  let fixture: ComponentFixture<ChainItemPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChainItemPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChainItemPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
