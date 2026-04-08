export class CodeRain {
  constructor(canvasId) {
    this.container = document.getElementById(canvasId);
    if (!this.container) return;
    
    this.characters = [
      "0", "1", "{", "}", "[", "]", ";", ".", ",", "<", ">", "+", "-", "*", "=", "!", "?", ":",
      "const", "let", "var", "function", "return", "=>", "if", "else", "for", "while"
    ];
    this.numberOfSpans = 40;
    this.init();
  }

  init() {
    for (let i = 0; i < this.numberOfSpans; i++) {
      this.createSpan();
    }
  }

  createSpan() {
    const span = document.createElement("span");
    span.textContent = this.characters[Math.floor(Math.random() * this.characters.length)];
    span.style.position = "absolute";
    span.style.top = "-100px";
    span.style.left = Math.random() * 100 + "vw";
    span.style.fontFamily = "monospace";
    span.style.color = "var(--primary-light)";
    span.style.opacity = "0.3";
    span.style.fontSize = (Math.random() * 12 + 12) + "px";
    span.style.pointerEvents = "none";
    
    const duration = 2 + Math.random() * 3;
    const delay = Math.random() * 5;
    
    span.style.animation = `fall ${duration}s linear ${delay}s infinite`;
    this.container.appendChild(span);
  }
}
