import classNames from 'classnames';
import { faInfo, faAlignLeft } from '@fortawesome/free-solid-svg-icons';

import files from './files';

import styles from './icons.scss';

const EXTENSION_REGEX = new RegExp(/\.([0-9a-z]+)$/);

const icons = {
  js: 'JS',
  css: '#',
  json: '{}',
  md: faInfo,
  txt: faAlignLeft,
};

function getIconStyles(extension, isStringIcon) {
  return classNames({
    [styles.icon]: isStringIcon,
    [styles.logoIcon]: !isStringIcon,
    [styles.js]: isStringIcon && extension === 'js',
    [styles.css]: isStringIcon && extension === 'css',
    [styles.md]: extension === 'md',
    [styles.json]: extension === 'json',
    [styles.txt]: extension === 'txt',
  });
}

export function getFileContent(fullName) {
  const paths = fullName.split('/');
  let content = files;

  paths.forEach((path) => {
    content = content.get(path);
  });

  return content;
}

function isFolder(content) {
  return content instanceof Map;
}

export function getShortName(fullName) {
  const lastSlashIndex = fullName.lastIndexOf('/');
  const isRoot = lastSlashIndex === -1;

  if (isRoot) {
    return fullName;
  }

  return fullName.slice(lastSlashIndex + 1);
}

function getExtension(name) {
  const [, extension] = name.match(EXTENSION_REGEX) || [];

  return extension;
}

export function getFileIcon(fullName) {
  const extension = getExtension(fullName);
  const icon = icons[extension] || '';
  const isStringIcon = typeof icon === 'string';
  const iconStyles = getIconStyles(extension, isStringIcon);

  return {
    extension, icon, iconStyles, isStringIcon,
  };
}

export function getFilesFolders(items) {
  const names = [...items.keys()];

  return names.reduce(([fFiles, fGroups], name) => {
    const content = items.get(name);
    const isItemFolder = isFolder(content);

    return [[
      ...fFiles,
      ...(!isItemFolder ? [name] : []),
    ], [
      ...fGroups,
      ...(isItemFolder ? [name] : []),
    ],
    ];
  }, [[], []]);
}

export default files;
