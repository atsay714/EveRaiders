import axios from "axios";

const baseURL = "https://everaiders.azurewebsites.net/";

const instance = axios.create({
  baseURL,
  timeout: 30000,
});

export const getPlanets = ({
  region,
  constellatin,
  system,
  planetName,
  planetType,
}) =>
  instance.get("/api/planets", {
    params: {
      region: region.name,
      constellatin,
      system,
      planetName,
      planetType,
    },
  });

export const getFilters = () => instance.get("/api/Planets/filters");

export const getResources = ({
  resourceType,
  richness,
  region: { id, name } = {},
}) =>
  instance.get(
    `/api/Planets/resources/${resourceType.replace(/\s+/g, "")}/${richness}`,
    {
      params: { regionId: id },
    }
  );
