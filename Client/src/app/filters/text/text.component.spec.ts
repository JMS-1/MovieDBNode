import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFilterComponent } from './text.component';

describe('TextComponent', () => {
  let component: TextFilterComponent;
  let fixture: ComponentFixture<TextFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
