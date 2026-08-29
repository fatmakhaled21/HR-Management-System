import { Component } from '@angular/core';
import { NavBarComponent } from "../../Layout/nav-bar/nav-bar.component";
import { NgFor, UpperCasePipe } from '@angular/common';
import { Attendance } from '../../Shared/interface/attendance';
import { AttendanceService } from '../../Shared/Services/attendance.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from "../../Shared/Pipes/search.pipe";
import { SearchComponent } from "../../Shared/search/search.component";
import { FlitersComponent } from "../../Shared/fliters/fliters.component";
import { FilterPipe } from "../../Shared/Pipes/filter.pipe";

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [NgFor, FormsModule, UpperCasePipe, SearchPipe, SearchComponent, FlitersComponent, FilterPipe],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent {
 constructor( private attendance: AttendanceService ) { }
  Attendance : Attendance[] = [];
  searchTerms: string = '';
selectedStatus: string = '';

  ngOnInit(): void {
    this.attendance.getAttendance().subscribe({
      next: (data : any) => {
        this.Attendance = data;
      }

    })
  }
}
