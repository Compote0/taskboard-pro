import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Taskboard';
  isLoading = true;
  progress = 0;
  fadeOut = false;

  ngOnInit(): void {
    // Simulate loading with progress bar
    const interval = setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(interval);
        // Wait a bit to show 100%, then fade out
        setTimeout(() => {
          this.fadeOut = true;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        }, 300);
      }
    }, 80);
  }
}
