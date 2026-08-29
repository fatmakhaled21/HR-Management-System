import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  isDarkMode = false;

  ngOnInit(): void {
    const saved = localStorage.getItem('hr-theme');
    if (saved === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark-theme');
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('hr-theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('hr-theme', 'light');
    }
  }
}
