import { Component, Input, OnInit, Output } from '@angular/core';
import { Employees } from '../../../Shared/interface/employees';
import { EmployeesService } from '../../../Shared/Services/employees.service';
import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DepartmentsService } from '../../../Shared/Services/departments.service';
import { Departments } from '../../../Shared/interface/departments';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { SearchPipe } from '../../../Shared/Pipes/search.pipe';
import { SearchComponent } from '../../../Shared/search/search.component';
import { FlitersComponent } from '../../../Shared/fliters/fliters.component';
import { FilterPipe } from '../../../Shared/Pipes/filter.pipe';
import { ViewDetailsComponent } from "../view-details/view-details.component";
import { EditEmployeeComponent } from "../edit-employee/edit-employee.component";
import { AddEmployeeComponent } from '../add-employee/add-employee.component';


@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule,
    NgIf,
    CommonModule,
    FormsModule,
    UpperCasePipe,
    SearchPipe,
    SearchComponent,
    FlitersComponent,
    FilterPipe,
    AddEmployeeComponent,
        ViewDetailsComponent,
    EditEmployeeComponent
],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {

  constructor(
    private employeesService: EmployeesService,
    private departmentservice: DepartmentsService,
    private ActivatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {}
  employees: Employees[] = [];
  departments: Departments[] = [];
  searchTerms: string = '';
  selectedDepartment: string = '';
  selectedStatus: string = '';
  selectedEmployee: Employees | null = null;
  openpopu: boolean = false;
  statusList: string[] = ['Active', 'Inactive', 'On Leave'];
  electedEmployeeId!: number;
  deletepopu: boolean = false;
  editpopu: boolean = false;
  selectedEmployeeId!: number;
  EmplyeesEdits: Employees = {} as Employees;
  viewpopu: boolean = false;
  EmplyeesDetails: Employees = {} as Employees;


  EmployeeForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    department_id: new FormControl(null),
    salary: new FormControl(null),
    hire_date: new FormControl(''),
    status: new FormControl(''),
  });
  ngOnInit(): void {
    this.employeesService.getEmployees().subscribe({
      next: (data: any) => {
        this.employees = data;
      },
    });
    this.getDepartments();
  }
  handleFormSubmission(employee: Employees) {
    this.employeesService.addEmployees(employee).subscribe({
      next: (response: any) => {
        this.employees.push(response);
        this.toastr.success('Employee added successfully', 'Success');
      },
      error: (error) => {
        console.log(error.error);
      },
    });

  }
  getDepartments() {
    this.departmentservice.getDepartmentsForDropdown().subscribe({
      next: (respone: any) => {
        this.departments = respone;
      },
    });
  }
  getEmployees() {
    this.employeesService.getEmployees().subscribe({
      next: (respone: any) => {
        this.employees = respone;
      },
    });
  }
  openview(id: number) {
    this.selectedEmployeeId = id;
    this.viewpopu = true;
    console.log(this.selectedEmployeeId);
    this.employeesService.getEmployeeById(this.selectedEmployeeId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.EmplyeesDetails = response[0];
      },
    });
  }
  closeview() {
    this.viewpopu = false;
  }
  openedit(id: number) {
    this.editpopu = true;
    this.selectedEmployeeId = id;
    this.employeesService.getEmployeeById(id).subscribe({
      next: (response: any) => {
        const employee = response[0];
        this.EmplyeesEdits = response;
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
    this.employeesService
      .EditemployeesById(this.selectedEmployeeId, this.EmployeeForm.value)
      .subscribe({
        next: (response: any) => {
          this.editpopu = false;
          this.EmplyeesEdits = response;
          this.getEmployees();
        },
      });
  }
  closeEdit(){
        this.editpopu =false;

  }
  openDelete(id: number) {
    this.selectedEmployeeId = id;
    this.deletepopu = true;
  }
  CencleDelete() {
    this.deletepopu = false;
  }
  confirmDelete() {
    this.employeesService
      .deleteEmployeeById(this.selectedEmployeeId)
      .subscribe({
        next: () => {
          this.employees = this.employees.filter(
            (employee) => employee.id !== this.selectedEmployeeId,
          );
          this.deletepopu = false;
          this.toastr.success('Deleted successfully', 'Success');
        },
        error: (error) => {
          console.log(error.error);
        },
      });
  }
}
