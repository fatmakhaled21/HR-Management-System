import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DepartmentsService } from '../../../Shared/Services/departments.service';
import { EmployeesService } from '../../../Shared/Services/employees.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.scss',
})
export class ViewDetailsComponent {
  constructor(
    private employeesService: EmployeesService,
    private departmentservice: DepartmentsService,
    private toastr: ToastrService,
  ) {}

  @Input() selectedEmployeeId!: number;
  @Input() EmplyeesDetails: any = {} as any;
  @Input() viewpopu: boolean = false;

  @Output() closeview = new EventEmitter<void>();

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
  closeDetails() {
  this.closeview.emit();
}

}
