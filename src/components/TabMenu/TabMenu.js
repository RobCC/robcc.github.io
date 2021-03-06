import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import classNames from 'classnames';
import { v1 as generateId } from 'uuid';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import FileTab from 'Components/FileTab/FileTab';
import { getOpenFiles, getCurrentFile } from '#/store/ducks/file';

import usePrevious from '#/utils/usePrevious';

import styles from './tabMenu.scss';

function getMaxScroll(element) {
  const { scrollWidth, offsetWidth } = element;

  return element ? scrollWidth - offsetWidth : 0;
}

const FileTabMenu = () => {
  const currentTab = useSelector((store) => getCurrentFile(store));
  const openFiles = useSelector((store) => getOpenFiles(store));
  const [shouldScroll, setShouldScroll] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const menuScrollRef = useRef(null);
  const previousCurrentTabIndex = usePrevious(openFiles.indexOf(currentTab));

  useEffect(() => {
    const menu = menuScrollRef?.current;

    if (!menu) {
      return;
    }

    const { scrollWidth, offsetWidth } = menu;

    setShouldScroll(scrollWidth > offsetWidth);
  }, [openFiles]);

  useEffect(() => {
    const menu = menuScrollRef?.current;

    if (!menu) {
      return;
    }

    const { scrollWidth, offsetWidth } = menu;

    // if shouldScroll is not true
    if (scrollWidth <= offsetWidth) {
      return;
    }

    const currentFileIndex = openFiles.indexOf(currentTab);
    const currentTabElement = menu.children[currentFileIndex];
    const { offsetLeft, offsetWidth: elementWidth } = currentTabElement;
    const offsetRight = offsetLeft + elementWidth;

    if (previousCurrentTabIndex > currentFileIndex) {
      setScrollLeft(offsetLeft);
    } else if (previousCurrentTabIndex < currentFileIndex && offsetRight > offsetWidth) {
      setScrollLeft(offsetLeft);
    }
  }, [currentTab, openFiles]);

  useEffect(() => {
    const menu = menuScrollRef?.current;

    if (!menu) {
      return;
    }

    menu.scrollLeft = scrollLeft;
  }, [scrollLeft]);

  const scroll = useCallback((newScroll) => () => {
    const menu = menuScrollRef?.current;
    const maxScroll = getMaxScroll(menu);

    if (newScroll < 50) {
      setScrollLeft(0);

      return;
    }

    if ((maxScroll - newScroll) < 50) {
      setScrollLeft(maxScroll);
    } else {
      setScrollLeft(newScroll);
    }
  }, [scrollLeft]);

  return (
    <div
      className={classNames(styles.tabMenu, {
        [styles.empty]: !openFiles.length,
      })}
    >
      <div className={styles.wrapper} ref={menuScrollRef}>
        {
          openFiles.map((name) => <FileTab key={generateId()} name={name} />)
        }
      </div>
      {(shouldScroll && scrollLeft > 0) && (
        <button
          type="button"
          className={classNames(styles.scrollButton, styles.left)}
          onClick={scroll(scrollLeft - 50)}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
      )}
      {(shouldScroll && scrollLeft < getMaxScroll(menuScrollRef?.current)) && (
        <button
          type="button"
          className={classNames(styles.scrollButton, styles.right)}
          onClick={scroll(scrollLeft + 50)}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      )}
    </div>
  );
};

export default FileTabMenu;
