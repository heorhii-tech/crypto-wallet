import React from "react";
import { Flex, Typography } from "antd";

function CryptoInfo({ crypto }) {
  return (
    <Flex align="center" justify="center">
      <img className="crypto_icon" src={crypto.icon} alt={crypto.name} />
      <Typography.Title style={{ margin: 0 }} level={2}>
        ({crypto.symbol}){crypto.name}
      </Typography.Title>
    </Flex>
  );
}

export default CryptoInfo;
