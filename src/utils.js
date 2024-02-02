const parseCommand = data => {
  const parts = data.toString().trim()
                               .split(' ')
                               .map(part => part.startsWith('--') ? part.slice(2, -1) : part);
  return {
    name: parts[0],
    args: parts.slice(1),
  };
};

const sortFolderItems = items => items.sort((a, b) => {
  if ((a.type === 'directory' && b.type === 'directory') ||
    (a.type === 'file' && b.type === 'file')) {
    return a.name.localeCompare(b.name);
  } else if (a.type === 'directory' && b.type === 'file') {
    return -1;
  } else {
    return 1;
  }
});

const getFolderItemsInfo = (names, isDirObjs) => {
  const itemsInfo = [];

  for (let i = 0; i < isDirObjs.length; i++) {
    const isDirObj = isDirObjs[i];

    if (isDirObj.status === 'rejected') continue;

    const info = {
      name: names[i],
      type: isDirObj.value ? 'directory' : 'file',
    };
    itemsInfo.push(info);
  }

  return itemsInfo;
};

export {
  parseCommand,
  sortFolderItems,
  getFolderItemsInfo,
};