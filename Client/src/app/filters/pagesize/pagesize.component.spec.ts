import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSizeFilterComponent } from './pagesize.component';

describe('PagesizeComponent', () => {
  let component: PageSizeFilterComponent;
  let fixture: ComponentFixture<PageSizeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSizeFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSizeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
