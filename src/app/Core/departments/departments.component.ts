import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../Shared/Services/departments.service';
import { Departments } from '../../Shared/interface/departments';
import { SearchPipe } from '../../Shared/Pipes/search.pipe';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SearchComponent } from '../../Shared/search/search.component';
import { FlitersComponent } from '../../Shared/fliters/fliters.component';
import { FilterPipe } from '../../Shared/Pipes/filter.pipe';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from '../../Shared/Services/employees.service';
import { Employees } from '../../Shared/interface/employees';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    NgFor,
    SearchPipe,
    FormsModule,
    UpperCasePipe,
    SearchComponent,
    FlitersComponent,
    FilterPipe,
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NgIf,

],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss',
})
export class DepartmentsComponent implements OnInit {
  constructor(
    private departmentsService: DepartmentsService,
    private toastr: ToastrService,
    private employeesService: EmployeesService,
  ) {}

  departments: Departments[] = [];
  employees: Employees[] = [];
  searchTerms: string = '';
  selectedDepartment: string = '';
  openpopu: boolean = false;
  totalEmployees: number = 0;
  departmentsForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    manager: new FormControl('', Validators.required),
    number_of_employees: new FormControl(0, [
      Validators.required,
      Validators.min(0),
    ]),
  });




  ngOnInit(): void {
    this.departmentsService.getDepartments().subscribe({
      next: (data: any) => {
        this.departments = data;
      },
    });
    this.getEmployees();
  }
  getEmployees() {
    this.employeesService.getEmployees().subscribe({
      next: (respone: any) => {
        this.employees = respone;
      },
    });
  }
  getEmployeesCount(departmentId: number): number {
    return this.employees.filter(
      (employee) => Number(employee.department_id) === Number(departmentId),
    ).length;
  }
  getDepartments(): void {
  this.departmentsService.getDepartmentsForDropdown().subscribe({
    next: (response: Departments[]) => {
      this.departments = response;
    }
  });
}
 openAdddepartments() {
    this.openpopu = true;
  }
  openAdd() {
    this.departmentsService
      .addDepartments(this.departmentsForm.value)
      .subscribe({
        next: (respone: any) => {
          this.departmentsForm.reset();
        this.getDepartments();

          console.log(respone);
          this.openpopu = false;
          this.toastr.success('Employee added successfully', 'Success');
        },
        error: (error) => {
          console.log(error.error);
        },
      });
  }
  closeAdddepartments() {}

}
