import React from "react";
import { Layout, Typography, Tag, Flex } from "antd";

import { useSelector } from "react-redux";
import { dataCoins } from "../../store/coins/dataCoins";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";
const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",

  paddingBottom: 0,
  display: "grid",
};
function AppContent(props) {
  const { assets } = useSelector((state) => state.assets);
  const { cryptoAssets } = useSelector((state) => state.cryptoAssets);
  const cryptoPriceMap = dataCoins.reduce((acc, coin) => {
    acc[coin.id] = coin.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      <div className="content_titile_wrapper">
        <Typography.Title
          style={{ color: `#fff`, textAlign: `left`, margin: 0 }}
          level={2}
        >
          Portfolio:
        </Typography.Title>
        <Tag className="content-title-tag" color="green">
          {assets
            .map((asset) => {
              return asset.amount * cryptoPriceMap[asset.id];
            })
            .reduce((acc, v) => (acc += v), 0)
            .toFixed(2)}
          $
        </Tag>
      </div>
      <PortfolioChart></PortfolioChart>
      <AssetsTable></AssetsTable>
    </Layout.Content>
  );
}

export default AppContent;
