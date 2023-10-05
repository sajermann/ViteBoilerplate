export function removeParamsFromQuery(
  query: string,
  params: string | string[]
) {
  if (typeof params === "string") {
    const pattern = new RegExp(`&?${params}=\\d+&?`, "g");
    return query.replace(pattern, (match, offset, string) =>
      offset === 0 || offset + match.length === string.length ? "" : "&"
    );
  }
  let newQuery = query;
  for (const param of params) {
    const pattern = new RegExp(`&?${param}=\\d+&?`, "g");
    newQuery = newQuery.replace(pattern, (match, offset, string) =>
      offset === 0 || offset + match.length === string.length ? "" : "&"
    );
  }
  return newQuery;
}
