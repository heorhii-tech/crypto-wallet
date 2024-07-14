import { Typography, Flex, Tag, Divider } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import CryptoInfo from "./CryptoInfo";

function coinInfoModal({ coin }) {
  const { cryptoCoins } = useSelector((state) => state.coins);

  let crypto = [];

  if (Object.keys(cryptoCoins).length) {
    crypto = cryptoCoins.find((item) => item.id === coin);
  }
  return (
    <>
      <CryptoInfo crypto={crypto} />
      <Divider />
      <Typography.Paragraph>
        <Typography.Text className="modal_time_stat" strong>
          1 hour:{" "}
        </Typography.Text>
        <Tag
          className="modal_time_stat"
          color={crypto.priceChange1h > 0 ? `green` : `red`}
        >
          {crypto.priceChange1h}%
        </Tag>
        <Typography.Text className="modal_time_stat" strong>
          1 day:{" "}
        </Typography.Text>
        <Tag
          className="modal_time_stat"
          color={crypto.priceChange1d > 0 ? `green` : `red`}
        >
          {crypto.priceChange1d}%
        </Tag>
        <Typography.Text className="modal_time_stat" strong>
          1 week:{" "}
        </Typography.Text>
        <Tag color={crypto.priceChange1w > 0 ? `green` : `red`}>
          {crypto.priceChange1w}%
        </Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price: </Typography.Text>
        {crypto.price.toFixed(2)}$
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price BTC: </Typography.Text>
        {crypto.priceBtc}$
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Market Capitalization: </Typography.Text>
        {crypto.marketCap}$
      </Typography.Paragraph>
      {crypto.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong>Contract Adress: </Typography.Text>
          {crypto.contractAddress}
        </Typography.Paragraph>
      )}
    </>
  );
}

export default coinInfoModal;
