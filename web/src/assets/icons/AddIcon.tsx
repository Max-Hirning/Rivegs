import React, { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" {...props}>
    <path
      strokeWidth={1.5}
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 12h8M12 16V8M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z"
    />
  </svg>
);
export default SvgComponent;