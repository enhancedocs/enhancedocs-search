export function formatHits (hits: any) {
  return hits.map((hit: any) => {
    const { objectID, hierarchy, content, type, url } = hit.document;
    const hierarchyValues = Object.values(hierarchy).filter(Boolean);

    return {
      _id: objectID,
      title: hierarchyValues[hierarchyValues.length - 1],
      descrption: content,
      type,
      url
    };
  });
}
