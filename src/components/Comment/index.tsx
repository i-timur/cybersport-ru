import {FC} from 'react';

import styles from './index.module.scss';

interface Props {
  authorId: string;
  authorName: string;
  text: string;
  date: string;
}

export const Comment: FC = () => {
  return (
    <div>
      Comment
    </div>
  );
};
