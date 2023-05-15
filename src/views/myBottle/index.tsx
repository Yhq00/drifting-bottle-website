import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { useLocation } from "react-router-dom";
import { Empty, Card } from "antd";
const MyBottle = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  useEffect(() => {}, []);
  return (
    <>
      {typeof userId !== "undefined" ? (
        <div className={styles.body}>
          <div className={styles.header}>我的瓶子</div>
          <div>
            <Card></Card>
          </div>
        </div>
      ) : (
        <Empty description={<span>非法跳转！！</span>}></Empty>
      )}
    </>
  );
};

export default MyBottle;
