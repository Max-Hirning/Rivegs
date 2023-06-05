import React, { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" {...props}>
    <path
      strokeWidth={1.5}
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2"
    />
  </svg>
);
export default SvgComponent;