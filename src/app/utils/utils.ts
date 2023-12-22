export const parseLinkHeaderPages = (linkHeader: string) => {
  const linkHeadersArray = linkHeader
    .split(', ')
    .map((header) => header.split('; '));

  const linkHeadersMap = linkHeadersArray.map((header) => {
    const thisHeaderRel = header[1].replace(/"/g, '').replace('rel=', '');
    const thisHeaderUrl = header[0].slice(1, -1);
    const thisHeaderPageList = thisHeaderUrl.match(/_page=(\d+)/);

    let thisHeaderPage = '';
    if (thisHeaderPageList && thisHeaderPageList.length > 0) {
      thisHeaderPage = thisHeaderPageList[1];
    }
    return [thisHeaderRel, Number(thisHeaderPage)];
  });
  return Object.fromEntries(linkHeadersMap);
};
