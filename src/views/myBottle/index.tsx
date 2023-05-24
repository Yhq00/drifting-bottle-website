import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Empty, Card, message, Tooltip } from "antd";
import { getMyBottles } from "../../service/text";
import Bottle from "../../assets/images/bottle.png";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const MyBottle = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  const [textList, setTextList] = useState<any>([]);
  useEffect(() => {
    getMyBottles(userId.userId).then((res) => {
      // console.log(res.data);
      if (res.status === 200) {
        if (res.data.code === 200) {
          if (res.data.data.length !== 0) {
            setTextList(res.data.data);
          } else {
            message.info("你还没有发布过内容噢！");
          }
        } else {
          message.info("后端错误联系管理员！");
        }
      } else {
        message.error("请求失败！");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();
  const lookDetails = (textId: string, textContent: any) => {
    console.log(textId);
    navigate("/my/details", {
      state: { textId: textId, textContent: textContent },
    });
  };

  const listCard = () => {
    return textList.map((item: any) => {
      return (
        <Card
          key={item.textId}
          style={{ width: 300, margin: "5px 0px 10px 20px" }}
          cover={<img alt="bottle" src={Bottle} style={{ height: "250px" }} />}
          actions={[
            <Tooltip title="查看详情">
              <EditOutlined
                key="edit"
                onClick={() => lookDetails(item.textId, item.textContent)}
              />
            </Tooltip>,
            <Tooltip title="打碎瓶子">
              <DeleteOutlined key="del" />
            </Tooltip>,
          ]}
        >
          {item.textContent}
        </Card>
      );
    });
  };
  return (
    <>
      {typeof userId !== "undefined" ? (
        <div className={styles.body}>
          <div className={styles.header}>我的瓶子</div>
          <div className={styles.cardBody}>{listCard()}</div>
        </div>
      ) : (
        <Empty description={<span>非法跳转！！</span>}></Empty>
      )}
    </>
  );
};

export default MyBottle;
