import {FC} from 'react';

import './MoreBtn.scss';

interface Props {
  onClick: () => void;
}

const MoreBtn: FC<Props> = ({onClick}) => {
  return (
    <button
      type="button"
      className="more-btn"
      onClick={onClick}
    >
      Показать еще
    </button>
  );
};

export default MoreBtn;
