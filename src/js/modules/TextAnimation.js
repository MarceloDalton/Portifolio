export class TextAnimation {
  constructor(elementId, phrases) {
    this.element = document.getElementById(elementId);
    if (!this.element) return;
    
    this.phrases = phrases;
    this.chars = "01{}<>;=()";
    this.phraseIndex = 0;
    this.init();
  }

  init() {
    this.loopPhrases();
  }

  randomChar() {
    return this.chars.charAt(Math.floor(Math.random() * this.chars.length));
  }

  async animateIn(text) {
    for (let iterations = 0; iterations <= text.length; iterations++) {
      let html = '';
      for (let i = 0; i < text.length; i++) {
        if (i < iterations) {
          html += `<span style="color: var(--text-main);">${text[i]}</span>`;
        } else {
          html += `<span style="color: var(--primary-light); font-family: monospace;">${this.randomChar()}</span>`;
        }
      }
      this.element.innerHTML = html;
      await new Promise(r => setTimeout(r, 50));
    }
  }

  async animateOut() {
    const text = this.element.textContent;
    for (let iterations = 0; iterations <= text.length; iterations++) {
      let html = '';
      for (let i = 0; i < text.length; i++) {
        if (i < iterations) {
          html += `<span style="color: var(--primary-light); font-family: monospace;">${this.randomChar()}</span>`;
        } else {
          html += `<span style="color: var(--text-main);">${text[i]}</span>`;
        }
      }
      this.element.innerHTML = html;
      await new Promise(r => setTimeout(r, 30));
    }
  }

  async loopPhrases() {
    while (true) {
      await this.animateIn(this.phrases[this.phraseIndex]);
      await new Promise(r => setTimeout(r, 2500));
      await this.animateOut();
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
    }
  }
}
