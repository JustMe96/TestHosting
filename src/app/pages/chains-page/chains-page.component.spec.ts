import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainsPageComponent } from './chains-page.component';

describe('ChainsPageComponent', () => {
  let component: ChainsPageComponent;
  let fixture: ComponentFixture<ChainsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChainsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChainsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
