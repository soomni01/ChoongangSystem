import React from "react";
import { Box, Center, createListCollection, Table } from "@chakra-ui/react";
import { ActiveSwitch } from "../../tool/list/ActiveSwitch.jsx";
import { Sort } from "../../tool/list/Sort.jsx";
import { Pagination } from "../../tool/list/Pagination.jsx";
import { SearchBar } from "../../tool/list/SearchBar.jsx";
import { FilterRadioGroup } from "./FilterRadioGroup.jsx";

export function CommonCodeList({
  commonCodeList,
  count,
  searchParams,
  setSearchParams,
  onRowClick,
}) {
  // 검색 옵션
  const searchOptions = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "품목코드", value: "commonCode" },
      { label: "품목명", value: "commonCodeName" },
    ],
  });

  // 정렬 헤더
  const sortOptions = [
    { key: "commonCodeKey", label: "#" },
    { key: "commonCodeType", label: "코드구분" },
    { key: "commonCode", label: "코드" },
    { key: "commonCodeName", label: "코드명" },
  ];

  return (
    <Box w={"100%"}>
      <SearchBar
        searchOptions={searchOptions}
        onSearchChange={(nextSearchParam) => setSearchParams(nextSearchParam)}
      />
      <ActiveSwitch
        onActiveChange={(nextSearchParam) => setSearchParams(nextSearchParam)}
      />
      <FilterRadioGroup
        onRadioChange={(nextRadioValue) => setSearchParams(nextRadioValue)}
      />
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
              <Sort
                sortOptions={sortOptions}
                onSortChange={(nextSearchParam) =>
                  setSearchParams(nextSearchParam)
                }
              />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {commonCodeList?.map((item, index) => (
              <Table.Row
                key={item.commonCodeKey ? item.commonCodeKey : index}
                onDoubleClick={() => {
                  console.log("클릭");
                  onRowClick(item.commonCodeKey);
                }}
                style={{
                  cursor: "pointer",
                }}
                bg={item.commonCodeActive ? "white" : "gray.100"}
                _hover={{ backgroundColor: "gray.200" }}
              >
                <Table.Cell verticalAlign="middle" textAlign="center">
                  {index + 1}
                </Table.Cell>
                <Table.Cell verticalAlign="middle" textAlign="center">
                  {item.commonCodeType}
                </Table.Cell>
                <Table.Cell verticalAlign="middle" textAlign="center">
                  {item.commonCode}
                </Table.Cell>
                <Table.Cell verticalAlign="middle" textAlign="center">
                  {item.commonCodeName}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Center pt={5}>
          <Pagination
            count={count}
            pageSize={10}
            onPageChange={(newPage) => {
              const nextSearchParam = new URLSearchParams(searchParams);
              nextSearchParam.set("page", newPage);
              setSearchParams(nextSearchParam);
            }}
          />
        </Center>
      </Box>
    </Box>
  );
}
