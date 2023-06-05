import React, { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" {...props}>
    <path
      strokeWidth={2}
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 16h.01M12 8v4m0 9a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
    />
  </svg>
);
export default SvgComponent;