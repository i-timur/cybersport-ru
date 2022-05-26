import {FC, useState} from 'react';

interface Props {
  name: string;
  size?: number | string;
  color?: string;
  hoverColor?: string;
}

const Icon: FC<Props> = ({name, size = 24, color, hoverColor}) => {
  const [iconColor, setIconColor] = useState(color);
  const onMouseEnter = () => {
    if (hoverColor) {
      setIconColor(hoverColor);
    }
  };

  const onMouseLeave = () => {
    if (hoverColor) {
      setIconColor(color);
    }
  };

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fill: iconColor
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <use xlinkHref={`/sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;
