export const buildFiltersPayload = (filters: Record<string, string[]>) => {
  return Object.entries(filters).flatMap(([name, values]) =>
    values.map((value) => ({ name, value }))
  );
};
