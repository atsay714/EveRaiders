import instance from "./base";

export const getPlanets = ({
  region,
  constellation,
  system,
  planetName,
  planetType,
}) =>
  instance.get("/api/planets", {
    params: {
      region: region.name,
      constellation,
      system,
      planetName,
      planetType,
    },
  });

export const getFilters = () => instance.get("/api/Planets/filters");

export const getResources = ({
  resourceName,
  richness,
  region: { id, name } = {},
}) =>
  instance.get(
    `/api/Planets/resources/${resourceName.replace(/\s+/g, "")}/${richness}`,
    {
      params: { regionId: id },
    }
  );
