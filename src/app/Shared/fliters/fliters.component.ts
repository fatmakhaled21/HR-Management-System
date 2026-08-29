import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-fliters',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './fliters.component.html',
  styleUrl: './fliters.component.scss'
})
export class FlitersComponent {

  @Input()  selectedDepartment: string = '';
  @Input() showdepartment:boolean = true ;
  @Output() selectedDepartmentChange = new EventEmitter<string>();
  @Input()  selectedStatus: string = '';
  @Input() showStatus: boolean = true;
  @Input() showStatusattendance: boolean = true;
  @Output() selectedStatusChange = new EventEmitter<string>();
  @Input() showLeaveType:boolean = true;
  @Input() selectedLeaveType: string = '';
  @Output() selectedLeaveTypeChange = new EventEmitter<string>();
  @Input() showStatusatLeave:boolean = true;

}
