import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfettiService {
  triggerConfetti(): void {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ['#ffd4a3', '#ffb88c', '#ff9f6b', '#ffd4a3', '#ffe8d6'];

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      this.createConfetti(colors);
    }, 25);
  }

  private createConfetti(colors: string[]): void {
    const confetti = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = confetti.style.width;
    confetti.style.backgroundColor = color;
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.opacity = '0.9';
    
    const angle = Math.random() * 360;
    const velocity = Math.random() * 10 + 10;
    const rotation = Math.random() * 360;
    const rotationSpeed = Math.random() * 10 - 5;
    
    document.body.appendChild(confetti);
    
    const animation = confetti.animate(
      [
        {
          transform: `translate(0, 0) rotate(0deg)`,
          opacity: 1,
        },
        {
          transform: `translate(${Math.cos(angle * Math.PI / 180) * velocity * 10}px, ${Math.sin(angle * Math.PI / 180) * velocity * 10 + window.innerHeight}px) rotate(${rotation + rotationSpeed * 20}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 2000 + 2000,
        easing: 'cubic-bezier(0.5, 0, 0.5, 1)',
      }
    );
    
    animation.onfinish = () => {
      confetti.remove();
    };
  }
}

