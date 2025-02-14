import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Stack,
} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../../components/ui/pagination.jsx";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { StandardSideBar } from "../../../components/tool/sidebar/StandardSideBar.jsx";
import { FranchiseList } from "../../../components/standard/franchise/FranchiseList.jsx";
import { FranchiseDialog } from "../../../components/standard/franchise/FranchiseDialog.jsx";

export function Franchise() {
  const [franchiseKey, setFranchiseKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams("");
  const [search, setSearch] = useState({
    type: "all",
    keyword: "",
  });
  // const [checkedActive, setCheckedActive] = useState(
  //   searchParams.get("active") === "true",
  // );
  const [franchiseList, setFranchiseList] = useState([]);
  const [count, setCount] = useState(0);
  // 페이지네이션
  const pageParam = searchParams.get("page") ? searchParams.get("page") : "1";
  const page = Number(pageParam);

  // 가맹점 리스트 가져오기
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/franchise/list", {
        params: searchParams,

        // active: checkedActive,
        // page: searchParams.get("page") || "1",
        // type: searchParams.get("type") || "all",
        // keyword: searchParams.get("keyword") || "",
        // sort: searchParams.get("sort"),
        // order: searchParams.get("order"),
        // },
      })
      .then((res) => res.data)
      .then((data) => {
        setCount(data.count);
        setFranchiseList(data.franchiseList);
        setIsLoading(false);
      });
  }, [searchParams]);

  // 검색 상태를 URLSearchParams에 맞게 업데이트
  useEffect(() => {
    const nextSearch = { ...search };

    // 기존 검색 파라미터 설정
    if (searchParams.get("type")) {
      nextSearch.type = searchParams.get("type");
    } else {
      nextSearch.type = "all";
    }
    if (searchParams.get("keyword")) {
      nextSearch.keyword = searchParams.get("keyword");
    } else {
      nextSearch.keyword = "";
    }

    setSearch(nextSearch);
  }, [searchParams]);

  // 검색 파라미터 업데이트
  const handleSearchClick = () => {
    const nextSearchParam = new URLSearchParams(searchParams);

    if (search.keyword.trim().length > 0) {
      nextSearchParam.set("type", search.type);
      nextSearchParam.set("keyword", search.keyword);
      nextSearchParam.set("page", "1"); // 1 페이지로 설정
    } else {
      nextSearchParam.delete("type");
      nextSearchParam.delete("keyword");
    }

    // searchParams 상태를 업데이트하여 경로에 반영
    setSearchParams(nextSearchParam);
  };

  // // 체크 박스 상태 변경 시 URL 파라미터 업데이트
  // const toggleCheckedActive = () => {
  //   const nextValue = !checkedActive;
  //   setCheckedActive(nextValue);
  //
  //   const nextSearchParams = new URLSearchParams(searchParams);
  //   nextSearchParams.set("active", nextValue.toString());
  //   nextSearchParams.set("page", "1");
  //   setSearchParams(nextSearchParams);
  // };

  // 새로운 가맹점 추가 또는 수정
  const handleSave = (newFranchise) => {
    if (newFranchise?.franchiseKey) {
      setFranchiseList((prevList) => {
        // 가맹점 수정 처리
        const index = prevList.findIndex(
          (item) => item.franchiseKey === newFranchise.franchiseKey,
        );

        // 만약 해당 가맹점이 리스트에 존재하면 -> (index !== -1)
        if (index !== -1) {
          // 수정된 가맹점 정보로 업데이트
          const updatedList = [...prevList];
          updatedList[index] = newFranchise;
          return updatedList;
        }

        // 가맹점이 리스트에 없는 경우 (추가)
        const updatedList = [newFranchise, ...prevList];

        // 1페이지는 최대 10개만 보이게 하고, 추가된 항목은 2페이지로 넘김
        if (updatedList.length > 10) {
          const secondPageData = updatedList.slice(10); // 2페이지로 넘길 데이터 (11번째 이후)
          const firstPageData = updatedList.slice(0, 10); // 1페이지 데이터

          setFranchiseList(firstPageData); // 1페이지 데이터 업데이트

          // 2페이지 데이터 처리
          console.log("넘길 데이터 (2페이지로):", secondPageData);

          return firstPageData; // 1페이지에 10개만 남기고 반환
        }

        return updatedList; // 10개 이하일 경우 그대로 반환
      });
    } else {
      console.error("잘못된 가맹점 정보가 전달되었습니다:", newFranchise);
    }
  };

  // 가맹점 삭제
  const handleDelete = (franchiseKey) => {
    setFranchiseList((prevList) => {
      return prevList.filter((item) => item.franchiseKey !== franchiseKey);
    });

    // 현재 페이지 번호 가져오기
    const currentPage = Number(searchParams.get("page") || 1);

    // 삭제 후 데이터 재조회: 현재 페이지의 가맹점 리스트 업데이트
    axios
      .get("/api/franchise/list", {
        params: searchParams,

        // active: checkedActive,
        // page: searchParams.get("page") || "1",
        // type: searchParams.get("type") || "all",
        // keyword: searchParams.get("keyword") || "",
        // sort: searchParams.get("sort"),
        // order: searchParams.get("order"),
        // },
      })
      .then((res) => res.data)
      .then((data) => {
        setCount(data.count);
        setFranchiseList(data.franchiseList);
        setIsLoading(false);
      });
  };

  // 페이지 번호 변경 시 URL 의 쿼리 파라미터 업데이트
  function handlePageChange(e) {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", e.page);

    setSearchParams(nextSearchParams);
  }

  // 검색 초기화
  const handleResetClick = () => {
    setSearchParams("");
    // setSearchParams({ page: "1" }); // searchParams 초기화
    setSearch({ type: "all", keyword: "" }); // search 상태도 초기화
  };

  // 가맹점 등록 버튼 클릭 시 다이얼로그 열림
  const handleAddFranchiseClick = () => {
    setIsAddDialogOpen(true);
  };

  // 해당 가맹점 클릭 시 뷰 다이얼로그 열림
  const handleFranchiseClick = (key) => {
    setFranchiseKey(key);
    setIsDialogOpen(true);
  };

  // 다이얼로그 닫기
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setIsAddDialogOpen(false);
  };

  return (
    <Box>
      <HStack align={"flex-start"} w={"100%"}>
        <StandardSideBar />
        <Stack flex={1} p={5}>
          <Heading size={"xl"} p={2} mb={3}>
            기준정보 관리 {">"} 가맹점 관리
          </Heading>
          <FranchiseList
            franchiseList={franchiseList}
            count={count}
            search={search}
            setSearch={setSearch}
            setSearchParams={setSearchParams}
            handleSearchClick={handleSearchClick}
            onReset={handleResetClick}
            // checkedActive={checkedActive}
            // setCheckedActive={setCheckedActive}
            // toggleCheckedActive={toggleCheckedActive}
            handlePageChange={handlePageChange}
            onFranchiseClick={handleFranchiseClick}
          />
          {/* 페이지네이션 */}
          <Center w="100%" p={2}>
            <PaginationRoot
              onPageChange={handlePageChange}
              count={count}
              page={page}
              pageSize={10}
              variant="solid"
              size={"md"}
            >
              <HStack>
                <PaginationPrevTrigger />
                <PaginationItems />
                <PaginationNextTrigger />
              </HStack>
            </PaginationRoot>
          </Center>
          {/* 가맹점 등록 버튼 */}
          <Flex justify="flex-end">
            <Button size={"lg"} mt={"-58px"} onClick={handleAddFranchiseClick}>
              가맹점 등록
            </Button>
          </Flex>
          {/* 다이얼로그 */}
          <FranchiseDialog
            franchiseKey={franchiseKey}
            isOpen={isDialogOpen || isAddDialogOpen}
            isAddDialogOpen={isAddDialogOpen}
            onSave={handleSave}
            onDelete={handleDelete}
            onClose={handleDialogClose}
          />
        </Stack>
      </HStack>
    </Box>
  );
}
