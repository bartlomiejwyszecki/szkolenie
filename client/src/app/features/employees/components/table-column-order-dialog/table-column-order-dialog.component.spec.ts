import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnOrderDialogComponent } from './table-column-order-dialog.component';

describe('TableColumnOrderDialogComponent', () => {
  let component: TableColumnOrderDialogComponent;
  let fixture: ComponentFixture<TableColumnOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableColumnOrderDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableColumnOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
