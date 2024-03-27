import { Link } from '@tanstack/react-router';
import type { FC } from 'react';
import { css } from '../../../styled-system/css';

const linkStyle = {
  padding: 1,
  _hover: {
    color: 'gray.900',
    textDecoration: 'underline',
  },
} satisfies Parameters<typeof css>[0];

export const NavBar: FC = () => {
  return (
    <nav
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 'xl',
        paddingX: 5,
        paddingY: 2,
        fontFamily: 'inter',
      })}
    >
      <Link
        to="/"
        className={css({ fontWeight: 600, fontSize: 'xl', ...linkStyle })}
      >
        <h1>HRNet</h1>
      </Link>
      <div className={css({ display: 'flex', gap: 2, sm: { gap: 5 } })}>
        <Link to="/" className={css(linkStyle)}>
          Create a new employee
        </Link>
        <Link to="/" className={css(linkStyle)}>
          Employee list
        </Link>
      </div>
    </nav>
  );
};
