import React, { useState } from "react";
import { getFilters } from "../../api";
import { buyback, getUserOrders } from "api/oreBuyback";
import { useQuery, useMutation, queryCache } from "react-query";
import styles from "./OreBuyback.module.scss";
import OreBuybackForm from "./OreBuybackForm";
import OreBuybackTable from "./OreBuybackTable";
import MiningIskEfficiency from "./MiningIskEfficiency";
import BuyIndustry from "./BuyIndustry";
import Sidebar from "./Sidebar";
import PageHeader from "components/PageHeader";
import SlideDown from "components/SlideDown";
import ToggleButton from "components/inputs/ToggleButton";
import Button from "components/inputs/Button";
import { useHistory } from "react-router-dom";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { FaIndustry } from "react-icons/fa";
import { getCurrentUser } from "api/users";
import { TradeTypeProvider } from "./useTradeType";

const OreBuyback = () => {
  const [tradeType, setTradeType] = useState("buy");
  const [resources, setResources] = useState();
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

  // const { loading, error, data = [] } = useQuery("userOrders", getUserOrders);

  const { data = [], error, loading } = {};

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
    <TradeTypeProvider value={tradeType}>
      <div className={styles.oreBuyback}>
        <PageHeader>Ore Buyback</PageHeader>
        <ToggleButton
          actions={[
            {
              label: "Buy",
              onClick: () => setTradeType("buy"),
              selected: tradeType === "buy",
            },
            {
              label: "Sell",
              onClick: () => setTradeType("sell"),
              selected: tradeType === "sell",
            },
            {
              label: "Refine",
              onClick: () => setTradeType("refine"),
              selected: tradeType === "refine",
            },
          ]}
        />
        <div className={styles.content}>
          <div className={styles.efficiencyDesktop}>
            {tradeType === "sell" && <MiningIskEfficiency />}
            {tradeType === "buy" && <BuyIndustry onChange={setResources} />}
          </div>
          <div className={styles.efficiencyMobile}>
            <Sidebar
              icon={tradeType === "sell" ? HiOutlineCurrencyDollar : FaIndustry}
            >
              {tradeType === "sell" && <MiningIskEfficiency />}
              {tradeType === "buy" && <BuyIndustry onChange={setResources} />}
            </Sidebar>
          </div>
          <div className={styles.buyback}>
            <SlideDown>
              <OreBuybackForm handleSubmit={mutate} values={resources} />
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
        </div>
      </div>
    </TradeTypeProvider>
  );
};

export default OreBuyback;
