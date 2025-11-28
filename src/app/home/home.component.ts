import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  count = 0;
  ngOnInit(): void {
    setInterval(() => {
      this.count++;
      console.log('count ++');
    }, 500);
  }
}
