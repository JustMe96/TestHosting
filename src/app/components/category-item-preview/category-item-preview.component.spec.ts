import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryItemPreviewComponent } from './category-item-preview.component';

describe('CategoryItemPreviewComponent', () => {
  let component: CategoryItemPreviewComponent;
  let fixture: ComponentFixture<CategoryItemPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryItemPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryItemPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
