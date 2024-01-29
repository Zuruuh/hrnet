import { Link } from '@tanstack/react-router';
import { type FC } from 'react';
import { css } from '../../../styled-system/css';

export const Footer: FC = () => {
  return (
    <footer
      className={css({
        fontFamily: 'inter',
        width: 'screen',
        shadow: 'md',
        paddingY: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        sm: {
          paddingX: 20,
          flexDirection: 'row',
          alignItems: 'center',
        },
      })}
    >
      <p>&copy; 2024 HRNet - Younès Ziadi</p>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          marginTop: 2,
          sm: {
            gap: 4,
            flexDirection: 'row',
          },
        })}
      >
        <Link to="/">Privacy Policy</Link>
        <Link to="/">Terms of Service</Link>
      </div>
    </footer>
  );
};
