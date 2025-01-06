import { TestBed } from '@angular/core/testing';
import {
  EMPLOYEE_PROP_LABEL_MAP,
  EmployeesTableColumnLabelPipe,
} from './employees-table-column-label.pipe';
import { TitleCasePipe } from '@angular/common';

describe('EmployeesTableColumnLabelPipe', () => {
  let pipe: EmployeesTableColumnLabelPipe;
  let titleCasePipe: jasmine.SpyObj<TitleCasePipe>;

  beforeEach(() => {
    // DLACZEGO jasmine.createSpyObj a nie po prostu provide? Bo chcemy nie tylko wstrzyknac zaleznosc ale tez przetestowac czy została uzyta
    const titleCasePipeMock = jasmine.createSpyObj<TitleCasePipe>(
      'TitleCasePipe',
      ['transform']
    );

    TestBed.configureTestingModule({
      providers: [
        EmployeesTableColumnLabelPipe,
        { provide: TitleCasePipe, useValue: titleCasePipeMock },
      ],
    });

    titleCasePipe = TestBed.inject(TitleCasePipe) as jasmine.SpyObj<TitleCasePipe>;
    pipe = TestBed.inject(EmployeesTableColumnLabelPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a known key using the label map', () => {
    const key = 'name';
    const expectedLabel = EMPLOYEE_PROP_LABEL_MAP.get(key)!;

    const result = pipe.transform(key);

    expect(result).toBe(expectedLabel);
  });

  it('should transform an unknown key using TitleCasePipe', () => {
    const key = 'position';
    const expectedFallback = 'Position';

    titleCasePipe.transform.and.returnValue(expectedFallback);

    const result = pipe.transform(key);

    expect(result).toBe(expectedFallback);
    expect(titleCasePipe.transform).toHaveBeenCalledWith(key);
  });

  it('should prioritize the map over the TitleCasePipe', () => {
    const key = 'email';
    const expectedLabel = EMPLOYEE_PROP_LABEL_MAP.get(key)!;

    titleCasePipe.transform.and.returnValue('Email Address Fallback');

    const result = pipe.transform(key);

    expect(result).toBe(expectedLabel);
    expect(titleCasePipe.transform).not.toHaveBeenCalled();
  });
});
