import {
  Select,
  Space,
  Typography,
  Flex,
  Divider,
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  DatePicker,
  useForm,
  Result,
} from "antd";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CryptoInfo from "./CryptoInfo";
import { setAssets } from "../store/assets/slice";
import { cryptoAssets } from "../store/coins/dataCoins";
import { setCryptoAssets } from "../store/cryptoAssets/slice";

function AddAssetForm({ onClose }) {
  const { cryptoCoins } = useSelector((state) => state.coins);
  const { assets } = useSelector((state) => state.assets);
  const dispatch = useDispatch();
  const [crypto, setCrypto] = useState();
  const [total, setTotal] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [form] = Form.useForm();
  const assetRef = useRef();

  const onFinish = (values) => {
    const newAsset = {
      id: crypto.id,
      amount: values.amount,
      price: values.price,
    };

    dispatch(setCryptoAssets(newAsset));

    assetRef.current = newAsset;
    setSubmitted(true);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onOk = (value) => {
    console.log("onOk: ", value);
  };
  const handleChangeAmount = (value) => {
    const price = form.getFieldValue(`price`);
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  };
  const handleChangePrice = (value) => {
    const amount = form.getFieldValue(`amount`);
    form.setFieldsValue({
      total: +(value * amount).toFixed(2),
    });
  };
  const handleSubmit = () => {
    setSubmitted(true);

    console.log(submitted);
  };
  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${crypto.name} by price${assetRef.current.price}`}
        extra={[
          <Button onClick={onClose} type="primary" key="console">
            Close
          </Button>,
        ]}
      />
    );
  }

  if (crypto) {
    return (
      <>
        <CryptoInfo crypto={crypto} />
        <Divider />
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 30 }}
          style={{
            width: `100%`,
          }}
          initialValues={{
            price: crypto.price.toFixed(2),
            totalAmount: total,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                type: `number`,
                min: 0,
                message: "Please input amount!",
              },
            ]}
          >
            <InputNumber
              style={{ width: `100%` }}
              onChange={handleChangeAmount}
              min={0}
            />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              style={{ width: `100%` }}
              onChange={handleChangePrice}
            />
          </Form.Item>

          <Form.Item label="Total" name="total">
            <InputNumber style={{ width: `100%` }} disabled />
          </Form.Item>
          <Form.Item label="Date & Time: " name="date">
            <DatePicker
              showTime
              onChange={(value, dateString) => {
                console.log("Selected Time: ", value);
                console.log("Formatted Selected Time: ", dateString);
              }}
              onOk={onOk}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              style={{ width: `200px`, margin: `auto` }}
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  } else if (!crypto) {
    return (
      <Select
        className="drawer_select"
        onSelect={(v) => setCrypto(cryptoCoins.find((c) => c.id === v))}
        value="Select coin"
        options={cryptoCoins.map((coin) => ({
          label: coin.name,
          value: coin.id,
          emoji: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              className="select_crypto_icon"
              src={option.data.emoji}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
    );
  }
}

export default AddAssetForm;
