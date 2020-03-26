// https://stackoverflow.com/questions/54972131/im-trying-to-get-this-cursor-effect-on-react

import React, { PureComponent } from 'react'

const defaultValues = {
  zIndex: 1000,
  diameter: 50,
  borderWidth: 3,
  borderColor: '#312f40',
  background: 'transparent',
  opacity: 1,
};

const hoverValues = {
  diameter: 25,
  borderWidth: 2,
  borderColor: '#312f40',
  background: 'transparent',
  opacity: 1,
};

const $$ = s =>
  Array.prototype.slice.call(
    document.querySelectorAll(s)
  )
const isEl = obj => obj instanceof HTMLElement
const isStr = obj => Object.prototype.toString.call(obj) === '[object String]'

class Cursor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isHover: false, styles: {}, inited: false };
  }

  time = 0.2
  
  easing = 6

  alt = { x: 0, y: 0, o: 1, d: defaultValues.diameter }

  cur = { x: 0, y: 0, o: 0, d: defaultValues.diameter }

  mousemove = (e) => {
      this.alt.x = e.clientX;
      this.alt.y = e.clientY;
      if (!this.state.inited) {
        this.cur.x = this.alt.x
        this.cur.y = this.alt.y
        this.setState({ inited: true });
      }
      this.setState({ styles: this.draw() });
  }

  draw = () => {
    const dX = this.alt.x - this.cur.x;
    const dY = this.alt.y - this.cur.y;
    this.cur.x += (dX / this.easing);
    this.cur.y += (dY / this.easing);
    const t3d = `translate3d(${this.cur.x - this.cur.d / 2}px,${this.cur.y - this.cur.d / 2}px,0)`;
    const dO = this.alt.o - this.cur.o;
    this.cur.o += dO / this.easing;
    const dD = this.alt.d - this.cur.d;
    this.cur.d += dD / this.easing;

    return { height: this.cur.d, width: this.cur.d, webkitTransform: t3d, transform: t3d };
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.mousemove);
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.mousemove);
  }

  render() {
    const { isHover } = this.state;
    const values = isHover ? hoverValues : defaultValues;
    console.log(this.state.styles, "!!!");
    const { zIndex, diameter, borderWidth, borderColor, time, opacity, background } = values;

    const styles = {
      position: 'fixed',
      top: 0,
      left:0,
      pointerEvents: 'none',
      opacity,
      zIndex: zIndex,
      height: diameter,
      width: diameter,
      background,
      border: `${borderWidth}px solid ${borderColor}`,
      borderRadius: '100%',
      mixBlendMode:'exclusion',
      transition:`all ${time}s`,
    }
    return <div style={{ ...styles, ...this.state.styles }} data-test="true" />;
  }
}

export default Cursor;
