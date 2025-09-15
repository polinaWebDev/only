import { PropsWithChildren } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface ContainerProps {
  className?: string;
}

export const Container = ({
  children,
  className,
}: PropsWithChildren<ContainerProps>) => {
  return <div className={clsx(styles.container, className)}>{children}</div>;
};
