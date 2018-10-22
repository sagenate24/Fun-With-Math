const xDropDown = document.querySelector('.x_values');
const yDropDown = document.querySelector('.y_values');
const myBtn = document.querySelector('.hahabutton');

const toRadian = (deg) => deg * (Math.PI / 180);
let myStuff = [];
class Character {
  constructor(element) {
    this.position = { x: 0, y: 0 };
    this.speed = Math.random();
    this.acceleration = Math.random() * .05;
    this.deg = 0;
    this.degSpeed = Math.random() * 1;
    this.time = Date.now();
    this.element = element;
    this.color = 'rgba(0, 0, 0, 0)';
  }
  update() {
    if (this.degSpeed > 200 || this.degSpeed < 200 && Math.random() > .9) {
      this.acceleration = this.acceleration * -1
    }
    this.degSpeed += this.acceleration;
    this.deg += this.degSpeed;
    this.position.y = (Math[yDropDown.value](toRadian(this.deg)) * 100) + 500;

    this.position.x = (Math[xDropDown.value](toRadian(this.deg)) * 100) + 300;

  }

  onRemove() {
    this.element.parentNode.removeChild(this.element);
  }

  render() {
    this.element.style.left = this.position.x;
    this.element.style.top = this.position.y;
  }
}

function generateAnimation() {
  for (var i = 0; i < 1000; i++) {
    const elem = document.createElement('div');

    const colorsArr = ['#FFFF00', '#FF0000', '#FF6600', '#00FF00', '#00FFFF', '#0033FF', '#FF00FF', '#CC00FF', '#00FF66', '#9900FF'];
    const randomIndex = Math.floor(Math.random() * colorsArr.length - 1);
    Object.assign(elem.style, {
      backgroundColor: `${colorsArr[randomIndex]}`,
      position: 'absolute',
      height: '5px',
      width: '5px',
      left: 10,
      top: 10,
    });
    document.body.appendChild(elem);
  
    myStuff.push(new Character(elem));
  }
}

const animate = () => {
  myStuff.forEach(item => item.update());
  myStuff.forEach(item => item.render());
  window.requestAnimationFrame(animate);
}

generateAnimation();
animate();

document.querySelectorAll('select').forEach((select) => {
  select.addEventListener('change', () => {
    myStuff.forEach(item => item.onRemove());
    myStuff = [];
    generateAnimation();
  });
})
