import React, { RefObject, useRef, useState } from "react";
import { Menu, Modal } from "antd";
import { useNavigate, To } from "react-router-dom";
import styles from "./index.module.scss";
import type { MenuProps } from "antd";
import throwBottle from "../../assets/images/throw.png";
import getBottle from "../../assets/images/getBottle.png";
import myBottle from "../../assets/images/myBottle.png";
import gotoNet from "../../assets/images/www.png";
import open from "../../assets/images/open.png";
import bottle from "../../assets/images/bottle.png";
const Main = (userId: any) => {
  const navigate = useNavigate();
  const myRef = useRef();
  const myRefs = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  type MenuItem = Required<MenuProps>["items"][number];
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: string,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  const items = [
    getItem(
      <img
        src={throwBottle}
        style={{
          width: "5rem",
          height: "5rem",
        }}
        alt="throw bottle"
      />,
      "/send"
    ),
    getItem(
      <img
        src={getBottle}
        style={{
          width: "5rem",
          height: "5rem",
        }}
        alt="get bottle"
        ref={myRef as unknown as RefObject<HTMLImageElement>}
        // onAnimationEnd={() => {
        //   // navigate("/Get");
        // }}
      />,
      "/get"
    ),
    getItem(
      <img
        src={myBottle}
        style={{
          width: "5rem",
          height: "5rem",
        }}
        alt="My bottle"
      />,
      "/my"
    ),
  ];
  const onClick = (e: { key: To }) => {
    if (e.key === "/get") {
      const sentDom = myRef.current;
      //@ts-ignore
      sentDom.style.display = "inline";
      //@ts-ignore
      sentDom.style.animationPlayState = "running";
    } else {
      navigate(e.key, { state: { userId } });
    }
  };
  const handleEnd = () => {
    const sentDom = myRef.current;
    //@ts-ignore
    // sentDom.style.animationPlayState = "running";
    const first = async () => {
      //@ts-ignore
      sentDom.style.display = "none";
      await new Promise((resolve) => setTimeout(resolve, 10));
      setIsModalOpen(true);
    };
    first();
  };
  const handleEnds = () => {
    const sentDom = myRefs.current;
    //@ts-ignore
    sentDom.style.display = "none";
  };
  const handleOk = () => {
    navigate("/get", { state: { userId } });
  };

  const handleCancel = () => {
    const sentDom = myRefs.current;
    setIsModalOpen(false);
    //@ts-ignore
    sentDom.style.display = "inline";
  };
  return (
    <>
      <Menu
        mode="horizontal"
        className={styles.menu}
        onClick={onClick}
        items={items}
      ></Menu>
      <img
        src={gotoNet}
        ref={myRef as unknown as RefObject<HTMLImageElement>}
        className={styles.www}
        alt="gotoNet"
        onAnimationEnd={handleEnd}
      />
      <img
        src={bottle}
        ref={myRefs as unknown as RefObject<HTMLImageElement>}
        className={styles.throw}
        alt="bottle"
        onAnimationEnd={handleEnds}
      />
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={"扔回大海"}
        okText={"打开回复"}
      >
        <img src={open} className={styles.open} alt="open" />
      </Modal>
    </>
  );
};
export default Main;
