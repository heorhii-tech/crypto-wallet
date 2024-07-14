import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";

function AssetsTable(props) {
  const { assets } = useSelector((state) => state.assets);
  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.id,
    price: asset.price,
    amount: asset.amount,
  }));
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: {
        target: "full-header",
      },

      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Price,$",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.amount - b.amount,

      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      onChange={onChange}
      size="small"
      style={{ alignSelf: "end", width: `40%`, justifySelf: `end` }}
    />
  );
}

export default AssetsTable;
