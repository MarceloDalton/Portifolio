export class SkillsChart {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.init();
  }

  init() {
    const ctx = this.canvas.getContext('2d');
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Comunicação', 'Front', 'Back', 'Resolução de Problemas', 'Organização'],
        datasets: [{
          label: 'Minhas Skills',
          data: [80, 50, 75, 70, 75],
          backgroundColor: 'rgba(0, 184, 148, 0.2)',
          borderColor: '#00b894',
          pointBackgroundColor: '#6366f1',
          pointBorderColor: '#fff',
          pointHoverRadius: 8,
          pointRadius: 4,
          borderWidth: 3,
          fill: true,
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: { display: false },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
            pointLabels: {
              color: '#f8fafc',
              font: { size: 14, weight: '600' }
            }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}
