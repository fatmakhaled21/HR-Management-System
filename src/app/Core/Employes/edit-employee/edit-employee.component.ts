import {
  Component,
  EventEmitter,
  Input,
  Output,
  output,
  SimpleChanges,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DepartmentsService } from '../../../Shared/Services/departments.service';
import { EmployeesService } from '../../../Shared/Services/employees.service';
import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Employees } from '../../../Shared/interface/employees';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss',
})
export class EditEmployeeComponent {
  constructor(
    private employeesService: EmployeesService,
    private departmentservice: DepartmentsService,
    private toastr: ToastrService,
  ) {}

  @Input() editpopu: boolean = false;
  @Input() selectedEmployeeId!: number;
  @Input() EmplyeesEdits: any = {} as any;
  @Input() departments: any = [] as any;
  @Input() employees: Employees[] = [];
  @Output() closeEdit = new EventEmitter<void>();
  @Output() employeeUpdated = new EventEmitter<void>();

  EmployeeForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    department_id: new FormControl(null),
    salary: new FormControl(null),
    hire_date: new FormControl(''),
    status: new FormControl(''),
  });
  getEmployees() {
    this.employeesService.getEmployees().subscribe({
      next: (respone: any) => {
        this.employees = respone;
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedEmployeeId'] && this.selectedEmployeeId) {
      this.loadEmployee();
    }
  }
  loadEmployee() {
    this.employeesService.getEmployeeById(this.selectedEmployeeId).subscribe({
      next: (response: any) => {
        const employee = response[0];

        this.EmployeeForm.patchValue({
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          department_id: employee.department_id,
          salary: employee.salary,
          hire_date: employee.hire_date,
          status: employee.status,
        });
      },
    });
  }
  updateEmployee() {
    console.log('Save clicked');
    console.log(this.selectedEmployeeId);
    console.log(this.EmployeeForm.value);

    this.employeesService
      .EditemployeesById(this.selectedEmployeeId, this.EmployeeForm.value)
      .subscribe({
        next: (response: any) => {
          console.log('Updated:', response);

          this.toastr.success('Employee updated successfully', 'Success');

          this.employeeUpdated.emit();
          this.closeEdit.emit();
        },

        error: (error: any) => {
          console.log(error);
        },
      });
  }
  closeEditEmployee() {
      this.closeEdit.emit();

  }
}
