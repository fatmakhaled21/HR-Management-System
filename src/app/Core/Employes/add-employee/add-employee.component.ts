import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { EmployeesService } from '../../../Shared/Services/employees.service';
import { DepartmentsService } from '../../../Shared/Services/departments.service';
import { Employees } from '../../../Shared/interface/employees';
import { Departments } from '../../../Shared/interface/departments';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule,
    NgIf,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent {
  constructor(
    private employeesService: EmployeesService,
    private departmentservice: DepartmentsService,
    private toastr: ToastrService,
  ) {}

  employees: Employees[] = [];



  @Input() openpopu: boolean = false;
  @Input() statusList: any[] = [];
  @Input() departments: Departments[] = [];
  @Input() Employees: Employees[] = [];
  
  @Output() formSubmitted = new EventEmitter<Employees>();

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
  openAddEmployees() {
    this.openpopu = true;
  }
  handleForm() {
    this.employeesService.addEmployees(this.EmployeeForm.value).subscribe({
      next: (respone: any) => {
        this.EmployeeForm.reset();

        this.getEmployees();
        console.log(respone);
        this.openpopu = false;
        this.toastr.success('Employee added successfully', 'Success');
      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }
  closeAddEmployees() {
    this.openpopu = false;
  }
}
