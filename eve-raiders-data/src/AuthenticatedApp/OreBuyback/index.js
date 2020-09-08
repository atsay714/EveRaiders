import React from "react";
import { getFilters } from "../../api";
import { buyback, getUserOrders } from "../../api/oreBuyback";
import { useQuery, useMutation, queryCache } from "react-query";
import styles from "./OreBuyback.module.scss";
import OreBuybackForm from "./OreBuybackForm";
import OreBuybackTable from "./OreBuybackTable";
import PageHeader from "../../components/PageHeader";
import SlideDown from "../../components/SlideDown";
import Button from "../../components/inputs/Button";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../../api/users";

const OreBuyback = () => {
  const {
    loading: loadingUser,
    error: loadingError,
    data: currentUser,
  } = useQuery("currentUser", getCurrentUser);

  const history = useHistory();

  const handleSubmit = async (values) => {
    const { success, error, data: res } = await buyback({
      resources: values.resources
        .filter(({ resource }) => resource?.name)
        .map(({ resource, quantity }) => ({
          id: resource.id,
          quantity: +quantity,
        })),
      pilotNameId: values.pilotName.id,
    });
    return res;
  };

  const { loading, error, data = [] } = useQuery("userOrders", getUserOrders);

  const [mutate] = useMutation(handleSubmit, {
    onSuccess: (newOrder) =>
      queryCache.setQueryData("userOrders", (previousOrders) => [
        ...previousOrders,
        newOrder,
      ]),
  });

  const {
    loading: filtersLoading,
    error: filtersError,
    data: filtersTypesData,
  } = useQuery("filters", getFilters);

  if (filtersLoading) return "Loading...";

  if (filtersError) return "An error has occurred: " + filtersError.message;

  if (currentUser?.pilotNames?.length === 0)
    return (
      <div className={styles.noPilotNames}>
        <Button onClick={() => history.push("/user-profile")}>Add</Button>
        pilot names to your profile before using this tool.
      </div>
    );

  return (
    <div className={styles.oreBuyback}>
      <PageHeader>Ore Buyback</PageHeader>
      <SlideDown>
        <OreBuybackForm handleSubmit={mutate} />
      </SlideDown>
      <div className={styles.results}>
        {error && (
          <div className={styles.error}>
            An error occured. Please try again.
          </div>
        )}
        <OreBuybackTable data={data} />
      </div>
    </div>
  );
};

export default OreBuyback;
