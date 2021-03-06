import React from 'react';

function easeInOutBack(time) {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  return time < 0.5
    ? (Math.pow(2 * time, 2) * ((c2 + 1) * 2 * time - c2)) / 2
    : (Math.pow(2 * time - 2, 2) * ((c2 + 1) * (time * 2 - 2) + c2) + 2) / 2;
}

const DIAL_ANIMATION_DURATION = [2000, 4000];
const ANGLE_PER_FRAME = 50;

const rotateTransformation = (angle = 0) => `rotate(${angle + -15} 146.84 224.186)`;

export default function Phone() {
  const renderState = React.useRef({
    angle: 0,
    target: 0,
    flip: false,
    startedAt: Date.now(),
    lastFrame: Date.now(),
    newTargetAfter: Date.now(),
  });

  const dialRef = React.useRef(null);

  React.useEffect(() => {
    if (!dialRef.current) {
      return () => {};
    }

    function onAnimate() {
      if (!dialRef.current) {
        return;
      }

      const now = Date.now()
      const delta = (now - renderState.current.lastFrame) / 1000;
      renderState.current.lastFrame = now;

      if (
        renderState.current.newTargetAfter
        && renderState.current.newTargetAfter <= now
      ) {
        renderState.current.newTargetAfter = null;
        renderState.current.startedAt = now;
        renderState.current.target = Math.floor(Math.random() * (DIAL_ANIMATION_DURATION[0] - DIAL_ANIMATION_DURATION[1] + 1)) + DIAL_ANIMATION_DURATION[1];
        renderState.current.flip = false;
      }

      const time = Math.min(1 - (((renderState.current.startedAt + renderState.current.target) - now) / renderState.current.target), 1);
      const tweenValue = easeInOutBack(time);

      const translate = ANGLE_PER_FRAME * tweenValue * delta;

      renderState.current.angle += (renderState.current.flip ? -1 : 1) * translate;
      renderState.current.angle = Math.min(Math.max(renderState.current.angle, 0), 120);

      dialRef.current.setAttribute('transform', rotateTransformation(renderState.current.angle));

      if (tweenValue === 1) {
        if (renderState.current.flip) {
          renderState.current.newTargetAfter = now + 500;
          renderState.current.flip = false;
        } else {
          renderState.current.flip = true;
          renderState.current.startedAt = now;
        }
      }

      window.requestAnimationFrame(onAnimate);
    }

    window.requestAnimationFrame(onAnimate);

    return () => window.cancelAnimationFrame(onAnimate);
  }, [dialRef.current]);

  return (
    <svg width="262" height="322" viewBox="0 0 262 322" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.722 15.6998C10.2226 15.6998 2.99996 24.5 1.99997 39C0.899145 54.9621 3.64076 78.7042 5.99997 90.5C9.00003 105.5 11.8013 119.571 16 134.5C20.5 150.5 24 175 38.5 183C49.4797 189.058 56.9214 181.788 60.5 171.5C64.5 160 66.0001 151 67.5001 136.5C72.0001 114 74 112.5 80 105.5C84.7143 100 89.7137 100.834 92.9571 100.834" stroke="#A45927" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="108.329" y="44.2122" width="77.6408" height="2.15669" fill="#A45927"/>
      <rect x="143.741" y="53.5006" width="6.86285" height="44.424" fill="#271205"/>
      <path d="M147.209 81.0996L158.904 101.356H135.514L147.209 81.0996Z" fill="#271205"/>
      <rect x="89.9975" width="2.15669" height="34.507" fill="#A45927"/>
      <circle cx="91.1626" cy="5.12863" r="3.35763" fill="#271205"/>
      <path d="M91.0761 34.5071C91.0761 44.2122 94.3112 45.2905 108.33 45.2905" stroke="#A45927" strokeWidth="2"/>
      <circle cx="117.913" cy="45.1619" r="5.75594" fill="#271205"/>
      <rect width="2.15669" height="34.507" transform="matrix(-1 0 0 1 205.38 0)" fill="#A45927"/>
      <circle cx="203.993" cy="5.12863" r="3.35763" fill="#271205"/>
      <circle cx="176.505" cy="45.1619" r="5.75594" fill="#271205"/>
      <path d="M204.302 34.5071C204.302 44.2122 200.864 45.2905 185.97 45.2905" stroke="#A45927" strokeWidth="2"/>
      <rect x="66.0355" y="302.441" width="162.273" height="19.4078" fill="#271205"/>
      <rect x="93.3683" y="98" width="108" height="6" fill="#271205"/>
      <path d="M101.77 103.607H192.574L237.975 303.441H56.3683L101.77 103.607Z" fill="#271205"/>
      <circle cx="147.172" cy="45.1988" r="10.737" fill="#271205"/>
      <circle cx="146.84" cy="224.186" r="45.5309" fill="#A45927"/>
      <g ref={dialRef} transform={rotateTransformation()}>
        <path d="M172.144 217.406C175.889 231.381 167.595 245.746 153.62 249.491C139.645 253.235 125.28 244.942 121.536 230.967C117.791 216.992 126.084 202.627 140.06 198.882C154.035 195.138 168.399 203.431 172.144 217.406Z" fill="#271205"/>
        <path d="M157.171 252.257C159.339 250.189 162.772 250.27 164.84 252.438C166.907 254.605 166.826 258.039 164.659 260.106C162.491 262.174 159.058 262.093 156.99 259.925C154.923 257.758 155.004 254.324 157.171 252.257Z" fill="#271205"/>
        <path d="M142.474 255.189C144.642 253.122 148.075 253.203 150.142 255.37C152.21 257.538 152.129 260.971 149.961 263.039C147.794 265.106 144.361 265.025 142.293 262.858C140.225 260.69 140.306 257.257 142.474 255.189Z" fill="#271205"/>
        <path d="M128.361 252.009C130.529 249.942 133.962 250.023 136.03 252.19C138.097 254.358 138.016 257.791 135.849 259.859C133.681 261.926 130.248 261.845 128.18 259.677C126.113 257.51 126.194 254.077 128.361 252.009Z" fill="#271205"/>
        <path d="M116.68 243.211C118.848 241.143 122.281 241.224 124.349 243.392C126.416 245.559 126.335 248.992 124.168 251.06C122 253.128 118.567 253.047 116.499 250.879C114.432 248.711 114.513 245.278 116.68 243.211Z" fill="#271205"/>
        <path d="M118.815 233.644C119.59 236.537 117.873 239.511 114.98 240.287C112.086 241.062 109.112 239.345 108.337 236.451C107.562 233.558 109.279 230.584 112.172 229.808C115.066 229.033 118.04 230.75 118.815 233.644Z" fill="#271205"/>
        <path d="M117.202 219.637C117.977 222.53 116.26 225.505 113.366 226.28C110.473 227.055 107.499 225.338 106.723 222.445C105.948 219.551 107.665 216.577 110.559 215.802C113.452 215.026 116.426 216.744 117.202 219.637Z" fill="#271205"/>
        <path d="M121.463 205.89C122.239 208.783 120.521 211.757 117.628 212.532C114.735 213.308 111.76 211.591 110.985 208.697C110.21 205.804 111.927 202.83 114.82 202.054C117.714 201.279 120.688 202.996 121.463 205.89Z" fill="#271205"/>
        <path d="M130.52 195.212C131.295 198.105 129.578 201.08 126.685 201.855C123.791 202.63 120.817 200.913 120.042 198.02C119.267 195.126 120.984 192.152 123.877 191.377C126.771 190.601 129.745 192.319 130.52 195.212Z" fill="#271205"/>
        <path d="M142.981 188.97C143.756 191.863 142.039 194.837 139.146 195.613C136.252 196.388 133.278 194.671 132.503 191.778C131.728 188.884 133.445 185.91 136.338 185.135C139.232 184.359 142.206 186.076 142.981 188.97Z" fill="#271205"/>
      </g>
      <path d="M147.366 175.5C146.981 176.167 146.019 176.167 145.634 175.5L141.737 168.75C141.352 168.083 141.833 167.25 142.603 167.25L150.397 167.25C151.167 167.25 151.648 168.083 151.263 168.75L147.366 175.5Z" fill="#A45927"/>
      <path d="M230.006 37.0447C230.006 30.6461 235.193 25.459 241.591 25.459H247.421C253.82 25.459 259.007 30.6461 259.007 37.0447V37.0447H230.006V37.0447Z" fill="#271205"/>
      <rect x="227.644" y="35.8807" width="33.7239" height="5.90353" rx="2.95176" fill="#271205"/>
      <path d="M50.0958 78.0741C43.6972 78.0741 38.5101 72.887 38.5101 66.4884L38.5101 60.6587C38.5101 54.2601 43.6972 49.073 50.0958 49.073V49.073L50.0958 78.0741V78.0741Z" fill="#271205"/>
      <rect x="48.9321" y="80.4355" width="33.7239" height="5.90353" rx="2.95176" transform="rotate(-90 48.9321 80.4355)" fill="#271205"/>
      <rect width="238.06" height="7.37941" rx="3.6897" transform="matrix(-1 0 0 1 252.144 11.9546)" fill="#271205"/>
      <rect width="18.8913" height="7.37941" rx="3.6897" transform="matrix(-4.37114e-08 1 1 4.37114e-08 240.853 8.48633)" fill="#271205"/>
      <rect width="100.876" height="22.8024" rx="11.4012" transform="matrix(1 0 0 -1 96.5121 27.0824)" fill="#271205"/>
      <rect width="69.5878" height="7.37941" rx="3.6897" transform="matrix(-4.37114e-08 1 1 4.37114e-08 18.438 8.48621)" fill="#271205"/>
      <rect width="44.793" height="7.37941" rx="3.6897" transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 51.7929 59.8469)" fill="#271205"/>
      <circle cx="22.1645" cy="63.5736" r="10.737" fill="#271205"/>
    </svg>
  );
}
