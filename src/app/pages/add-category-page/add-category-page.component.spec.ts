import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryPageComponent } from './add-category-page.component';

describe('AddCategoryPageComponent', () => {
  let component: AddCategoryPageComponent;
  let fixture: ComponentFixture<AddCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCategoryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
