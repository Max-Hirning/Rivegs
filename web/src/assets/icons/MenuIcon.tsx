import React, { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" {...props}>
    <path
      strokeWidth={1.5}
      stroke={props.color}
      strokeLinecap="round"
      d="M3 7h18M3 12h18M3 17h18"
    />
  </svg>
);
export default SvgComponent;