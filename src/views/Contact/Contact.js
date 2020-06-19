import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import SocialButton from 'Components/SocialButton/SocialButton';
import {
  Facebook,
  LinkedIn,
  GitHub,
  Gmail,
} from 'Components/Icons';
import { isEmailOpen } from '#/store/ducks/email';
import styles from './contact.scss';

const Contact = () => {
  const isEmailOpenSelector = useSelector((state) => isEmailOpen(state));
  const emailClasses = classNames(styles.email, { [styles.active]: isEmailOpenSelector });

  return (
    <div className={emailClasses}>
      <SocialButton
        color="#0077b5"
        Icon={LinkedIn}
        title="LinkedIn"
        href="https://www.linkedin.com/in/jrobcc/"
      />
      <SocialButton
        color="#eee"
        size={40}
        Icon={GitHub}
        title="Github"
        href="https://github.com/RobCC"
        altIcon
      />
      <SocialButton
        color="#1777f2"
        Icon={Facebook}
        title="Facebook"
        href="https://www.facebook.com/jrobcc"
      />
      <SocialButton
        color="#cd201f"
        size={25}
        Icon={Gmail}
        title="Gmail"
        href="https://mail.google.com/mail/?view=cm&fs=1&to=rrc0138@gmail.com"
      />
    </div>
  );
};

export default React.memo(Contact);