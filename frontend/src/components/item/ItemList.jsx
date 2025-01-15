import React, { useEffect, useState } from "react";
import {
  Box,
  createListCollection,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Table,
} from "@chakra-ui/react";
import axios from "axios";
import { Checkbox } from "../ui/checkbox.jsx";
import { Switch } from "../ui/switch.jsx";
import { Button } from "../ui/button.jsx";

export function ItemList({ onShowDetail }) {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/item/list")
      .then((res) => {
        setItemList(res.data);
      })
      .catch((error) => {
        console.error("물품 목록 요청 중 오류 발생: ", error);
      });
  }, []);

  console.log(itemList);

  return (
    <Box>
      <HStack>
        <HStack>
          <SelectRoot
            collection={itemSearchList}
            size="sm"
            width="100px"
            position="relative"
          >
            <SelectTrigger>
              <SelectValueText placeholder="검색 항목" />
            </SelectTrigger>
            <SelectContent
              style={{
                width: "100px",
                top: "40px",
                position: "absolute",
              }}
            >
              {itemSearchList.items.map((items) => (
                <SelectItem item={items} key={items.value}>
                  {items.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>

          <Input
            placeholder="키워드를 입력해주세요"
            width="320px"
            onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchClick();
              }
            }}
          ></Input>
          <Button>검색</Button>
        </HStack>
      </HStack>
      <Switch>전체 상품 조회</Switch>
      <Box>
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>#</Table.ColumnHeader>
              <Table.ColumnHeader>품목명</Table.ColumnHeader>
              <Table.ColumnHeader>담당업체</Table.ColumnHeader>
              <Table.ColumnHeader>입고가</Table.ColumnHeader>
              <Table.ColumnHeader>출고가</Table.ColumnHeader>
              <Table.ColumnHeader>사용여부</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {itemList.map((item, index) => (
              <Table.Row
                key={item.itemKey}
                onClick={() => onShowDetail(item.itemKey)}
                style={{ cursor: "pointer" }}
              >
                <Table.Cell textAlign="center"> {index + 1}</Table.Cell>
                <Table.Cell>{item.itemCommonName}</Table.Cell>
                <Table.Cell>{item.customerName}</Table.Cell>
                <Table.Cell textAlign="end">{item.inputPrice}</Table.Cell>
                <Table.Cell textAlign="end">{item.outputPrice}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Checkbox checked={item.itemActive} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}

const itemSearchList = createListCollection({
  items: [
    { label: "전체", value: "all" },
    { label: "품목명", value: "itemName" },
    { label: "담당 업체", value: "customerName" },
    { label: "입고가", value: "inputPrice" },
    { label: "출고가", value: "outputPrice" },
  ],
});
