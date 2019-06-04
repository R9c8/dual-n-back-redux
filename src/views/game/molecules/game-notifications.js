import React from "react";
import { useStore } from "effector-react";
import styled from "styled-components";

import { $gameNotifications } from "../../../core/game";

export const GameNotifications = () => {
  const notifications = useStore($gameNotifications);
  return (
    <NotificationsBox>
      {notifications.map(n => (
        <Notification key={Date.now()} isSuccess={n.isSuccess} isFail={n.isFail}>
          <strong>{n.title}</strong>
          {n.message && (
            <>
              &nbsp;
              {n.message}
            </>
          )}
        </Notification>
      ))}
    </NotificationsBox>
  );
};

const NotificationsBox = styled.div`
  position: absolute;
  width: 100%;
  height: 162px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Notification = styled.div`
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 8px;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  opacity: 0.85;

  border: none;
  color: #fff;

  background-color: #3498DB;
  border-color: #c6e2f5;
  ${p => p.isSuccess && `
    background-color: #00bc8c;
    border-color: #b8ecdf;
  `}
  ${p => p.isFail && `
    background-color: #E74C3C;
    border-color: #f8cdc8;
  `}
`;
