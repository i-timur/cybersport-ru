import {ChangeEvent, FC} from 'react';

import styles from './index.module.scss';

interface Props {
  label: string;
  value: string;
  onChange: (e: ChangeEvent) => void;
}

export const Input: FC<Props> = ({label, value, onChange}) => {
  return (
    <label className={styles.inputLabel} htmlFor={label}>
      <span>{label}</span>
      <input
        aria-label={label}
        type="text"
        className={styles.inputLabel__formControl}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
