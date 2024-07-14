import React, { useEffect } from "react";
import { Layout, Card, Statistic, List, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setAssets } from "../../store/assets/slice";
import { cryptoAssets, dataCoins } from "../../store/coins/dataCoins";
import { Spin } from "antd";
import { relativePercentageDifference } from "../../utils";
const siderStyle = {
  padding: "1rem",
};

function AppSider(props) {
  const { isLoading, cryptoCoins } = useSelector((state) => state.coins);
  const { assets } = useSelector((state) => state.assets);
  const { cryptoAssets } = useSelector((state) => state.cryptoAssets);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setAssets(
        cryptoAssets.map((asset) => {
          const coin =
            cryptoCoins.length && cryptoCoins.find((c) => c.id === asset.id);

          return {
            grow: asset.price < coin.price,
            growPercent: relativePercentageDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            isPlain: true,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
          };
        })
      )
    );
  }, [cryptoAssets, cryptoCoins]);
  return (
    <>
      <Spin spinning={isLoading} fullscreen />
      <Layout.Sider width="20%" style={siderStyle}>
        {Object.keys(assets) &&
          assets.map((asset) => (
            <Card key={asset.id} className="statistic_card">
              <Statistic
                title={asset.id.charAt(0).toUpperCase() + asset.id.slice(1)}
                value={asset.totalAmount}
                precision={2}
                valueStyle={{ color: asset.grow ? "green" : "red" }}
                prefix={
                  asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                }
                suffix="$"
              />
              <List
                size="small"
                bordered
                dataSource={[
                  { title: "Total profit:", value: asset.totalProfit },
                  {
                    title: "Asset amount:",
                    value: asset.amount,
                    isPlain: true,
                  },
                  {
                    title: "Difference:",
                    value: asset.growPercent,
                    isPercent: true,
                  },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <span>{item.title}</span>
                    {item.isPlain && <span>{item.value.toFixed(2)}</span>}
                    {item.isPercent && (
                      <Tag color={asset.grow ? `green` : `red`}>
                        {item.value}%
                      </Tag>
                    )}
                    {!item.isPercent && !item.isPlain && (
                      <Typography.Text type={asset.grow ? `success` : `danger`}>
                        {item.value.toFixed(2)}$
                      </Typography.Text>
                    )}
                  </List.Item>
                )}
              />
            </Card>
          ))}
      </Layout.Sider>
    </>
  );
}

export default AppSider;
