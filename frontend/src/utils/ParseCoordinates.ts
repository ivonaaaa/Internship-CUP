export const parseCoordinates = (coordinates: {
  coordinates: number[][][] | number[];
}) => {
  const parsedCoordinates = coordinates.coordinates;

  if (Array.isArray(parsedCoordinates) && parsedCoordinates.length === 2) {
    return [parsedCoordinates[0], parsedCoordinates[1]];
  }

  if (
    Array.isArray(parsedCoordinates) &&
    Array.isArray(parsedCoordinates[0]) &&
    Array.isArray(parsedCoordinates[0][0])
  ) {
    return [...parsedCoordinates];
  }

  return [];
};
