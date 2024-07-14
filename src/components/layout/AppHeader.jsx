import React, { useEffect, useRef, useState } from "react";
import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../store/select/slice";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";
import thunks from "../../store/coins/thunks";
const headerStyle = {
  textAlign: "center",
  color: "black",
  height: 60,

  padding: "16px",
};

function AppHeader(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [coin, setCoin] = useState();
  const { cryptoCoins } = useSelector((state) => state.coins);
  const { open } = useSelector((state) => state.select);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunks.fetchCoins());
  }, []);

  const handleSelect = (value) => {
    setIsModalOpen(true);
    setCoin(value);
  };
  useEffect(() => {
    const keypress = (e) => {
      e.key === `/` && dispatch(setOpen(!open));
    };
    document.addEventListener(`keypress`, keypress);
    return () => {
      document.removeEventListener(`keypress`, keypress);
    };
  }, [open]);
  const handleClick = (e) => {
    dispatch(setOpen(!open));
  };
  const onClose = () => {
    setDrawerOpen(false);
  };
  const handleOpenDrawer = () => {
    setDrawerOpen(true);
    dispatch(setOpen(false));
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: "18%",
        }}
        onSelect={handleSelect}
        onClick={handleClick}
        open={open}
        value="press / to open"
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
      <Button type="primary" onClick={handleOpenDrawer}>
        Add asset
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer
        width={`40%`}
        onClose={onClose}
        open={isDrawerOpen}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawerOpen(false)} />
      </Drawer>
    </Layout.Header>
  );
}

export default AppHeader;
