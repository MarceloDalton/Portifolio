export class SkillWeb {
  constructor(containerId, skills) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.skills = skills;
    this.size = 350;
    this.radius = 140;
    this.centerX = this.size / 2;
    this.centerY = this.size / 2;
    this.svg = null;
    
    this.init();
  }

  init() {
    this.createSVG();
    this.drawGrid();
    this.drawData();
    this.drawNodes();
  }

  createSVG() {
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("viewBox", `0 0 ${this.size} ${this.size}`);
    this.svg.style.width = "100%";
    this.svg.style.height = "100%";
    this.svg.style.filter = "drop-shadow(0 0 10px rgba(0, 184, 148, 0.1))";
    this.container.innerHTML = "";
    this.container.appendChild(this.svg);
  }

  getPoint(angle, value) {
    const x = this.centerX + Math.cos(angle) * (this.radius * (value / 100));
    const y = this.centerY + Math.sin(angle) * (this.radius * (value / 100));
    return { x, y };
  }

  drawGrid() {
    const levels = 4;
    const angleStep = (Math.PI * 2) / this.skills.length;

    // Draw concentric polygons
    for (let l = 1; l <= levels; l++) {
      const value = (100 / levels) * l;
      let points = "";
      
      for (let i = 0; i < this.skills.length; i++) {
        const { x, y } = this.getPoint(i * angleStep - Math.PI / 2, value);
        points += `${x},${y} `;
      }

      const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      poly.setAttribute("points", points);
      poly.setAttribute("fill", "none");
      poly.setAttribute("stroke", "rgba(255, 255, 255, 0.08)");
      poly.setAttribute("stroke-width", "1");
      this.svg.appendChild(poly);
    }

    // Draw axes
    for (let i = 0; i < this.skills.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const { x, y } = this.getPoint(angle, 100);
      
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", this.centerX);
      line.setAttribute("y1", this.centerY);
      line.setAttribute("x2", x);
      line.setAttribute("y2", y);
      line.setAttribute("stroke", "rgba(255, 255, 255, 0.05)");
      this.svg.appendChild(line);

      // Labels
      const labelPoint = this.getPoint(angle, 120);
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", labelPoint.x);
      text.setAttribute("y", labelPoint.y);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "middle");
      text.setAttribute("fill", "var(--text-muted)");
      text.style.fontSize = "12px";
      text.style.fontWeight = "600";
      text.textContent = this.skills[i].label;
      this.svg.appendChild(text);
    }
  }

  drawData() {
    const angleStep = (Math.PI * 2) / this.skills.length;
    let points = "";
    
    for (let i = 0; i < this.skills.length; i++) {
      const { x, y } = this.getPoint(i * angleStep - Math.PI / 2, this.skills[i].value);
      points += `${x},${y} `;
    }

    const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    poly.setAttribute("class", "skill-poly");
    poly.setAttribute("points", points);
    poly.setAttribute("fill", "rgba(0, 184, 148, 0.2)");
    poly.setAttribute("stroke", "var(--primary-light)");
    poly.setAttribute("stroke-width", "3");
    poly.style.transformOrigin = "center";
    poly.style.transition = "all 1s ease";
    
    this.svg.appendChild(poly);
  }

  drawNodes() {
    const angleStep = (Math.PI * 2) / this.skills.length;
    
    for (let i = 0; i < this.skills.length; i++) {
      const { x, y } = this.getPoint(i * angleStep - Math.PI / 2, this.skills[i].value);
      
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", x);
      circle.setAttribute("cy", y);
      circle.setAttribute("r", "5");
      circle.setAttribute("fill", "white");
      circle.setAttribute("class", "skill-node");
      circle.style.filter = "drop-shadow(0 0 5px var(--primary-light))";
      circle.style.animation = `pulse 2s infinite ${i * 0.2}s`;
      
      this.svg.appendChild(circle);
    }
  }
}
