import { CalendarOutlined } from "@ant-design/icons";
import { Badge, Card, List } from "antd";
import React, { useState } from "react";
import { Text } from "../text";
import UpcomingEventsSkeleton from "../skeleton/upcoming-events";
import { getDate } from "@/utilities/helpers";
import { useList } from "@refinedev/core";
import { DASHBOARD_CALENDAR_UPCOMING_APPOINTMENTS_QUERY } from "@/graphql/queries";
import dayjs from "dayjs";

const UpcomingAppointments = () => {
  const { data, isLoading } = useList({
    // Refines useList feature makes sure to already create isLoading state for you, so you don't need one
    resource: "events", // Change later to appts
    pagination: { pageSize: 5 },
    sorters: [{ field: "startDate", order: "asc" }], // Change to descending order for startDate
    filters: [
      {
        field: "startDate",
        operator: "gte", // greater than
        value: dayjs().format("2024-06-20"), // Get the current date
      },
    ],
    meta: {
      gqlQuery: DASHBOARD_CALENDAR_UPCOMING_APPOINTMENTS_QUERY,
    },
  });

  return (
    <Card
      style={{ height: "435px" }}
      styles={{ header: { padding: "8px 16px" }, body: { padding: "0 1rem" } }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CalendarOutlined />{" "}
          <Text size="sm" style={{ marginLeft: "0.7rem" }}>
            Upcoming Appointments
          </Text>{" "}
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={() => <UpcomingEventsSkeleton />}
        >
          {/* Output: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] */}
        </List>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={data?.data || []}
          renderItem={(item) => {
            const renderDate = getDate(item.startDate, item.endDate);

            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Badge color={item.color} />}
                  title={<Text size="xs">{renderDate}</Text>}
                  description={
                    <Text ellipsis={{ tooltip: true }} strong size="sm">
                      {item.title}
                    </Text>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
      {!isLoading && data?.data.length === 0 && (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "220px",
          }}
        >
          No upcoming events!
        </span>
      )}
    </Card>
  );
};

export default UpcomingAppointments;
