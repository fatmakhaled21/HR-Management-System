import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { SearchComponent } from '../../Shared/search/search.component';
import { SearchPipe } from '../../Shared/Pipes/search.pipe';
import { FlitersComponent } from '../../Shared/fliters/fliters.component';
import { FilterPipe } from '../../Shared/Pipes/filter.pipe';
import { LeavesService } from '../../Shared/Services/leaves.service';
import { EmployeesService } from '../../Shared/Services/employees.service';
import { Leaves } from '../../Shared/interface/leaves';
import { Employees } from '../../Shared/interface/employees';
import { Departments } from '../../Shared/interface/departments';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-leaves',
  standalone: true,
  imports: [
    NgFor,
    SearchPipe,
    FlitersComponent,
    FilterPipe,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

],
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.scss',
})
export class LeavesComponent {
  constructor(
     private leavesService: LeavesService,
        private employeesService: EmployeesService,
        private toastr: ToastrService,
  ) {}

  leaves: Leaves[] = [];
   employees: Employees[] = [];
  searchTerms: string = '';
  selectedLeaveType: string = '';
  selectedStatus: string = '';
  popu = false;
  openpopu = false;
  selectedEmployeeId!: number;
  LeavesEdits: Leaves = {} as Leaves;
  departments: Departments[] = [];
  statusList: string[] = ['Approved', '	Rejected'];
searchEmployee: string = '';
  employeeSuggestions: Employees[] = [];
  selectedEmployee: Employees | null = null;
  showSuggestions: boolean = false;
  selectedEmployeeLeaves: Leaves[] = [];
  selectedEmployeeForm: boolean = false;

  LeavesForm: FormGroup = new FormGroup({
    employee_id: new FormControl(null),
    leave_type: new FormControl(''),
    start_date: new FormControl(''),
    end_date: new FormControl(''),
    status: new FormControl(''),
  });

 ngOnInit(): void {
    this.leavesService.getLeaves().subscribe({
      next: (data: any) => {
        this.leaves = data;
      },
    });
    this.employeesService.getEmployees().subscribe({
      next: (data: any) => {
        this.employees = data;
      },
    });
  }
  getleaves() {
    this.leavesService.getLeaves().subscribe({
      next: (data: any) => {
        this.leaves = data;
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
 onEmployeeSearch() {
    const searchValue = this.searchEmployee.trim().toLowerCase();
    this.selectedEmployee = null;
    this.selectedEmployeeLeaves = [];
    this.selectedEmployeeForm = true;
    if (!searchValue) {
      this.employeeSuggestions = [];
      this.showSuggestions = false;
      this.selectedEmployeeForm = false;
      return;
    }
    this.employeeSuggestions = this.employees.filter((employee: Employees) =>
      employee.name.toLowerCase().includes(searchValue),
    );

    this.showSuggestions = this.employeeSuggestions.length > 0;
  }
  selectEmployee(employee: Employees): void {
    this.selectedEmployee = employee;
    this.searchEmployee = employee.name;
    this.showSuggestions = false;
    this.selectedEmployeeLeaves = this.leaves.filter(
      (leave) => Number(leave.employee_id) === Number(employee.id),
    );

    this.selectedEmployeeForm = this.selectedEmployeeLeaves.length === 0;

    if (this.selectedEmployeeForm) {
      this.LeavesForm.patchValue({
        employee_id: employee.id,
      });
    } else {
      this.toastr.warning('This employee already has a leave');
    }
  }

  addLeave(): void {
    if (!this.selectedEmployee) {
      this.toastr.error('Please select an employee');
      return;
    }
    this.leavesService.addLeave(this.LeavesForm.value).subscribe({
      next: (response: any) => {
        this.LeavesForm.reset();
        this.getEmployees();
        this.toastr.success('Leave added successfully', 'Success');
        this.selectedEmployee = null;
        this.selectedEmployeeForm = false;
        this.employeeSuggestions = [];
        this.showSuggestions = false;
        this.searchEmployee = '';
      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }

}
