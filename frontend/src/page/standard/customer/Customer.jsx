import React, { useEffect, useState } from "react";
import CustomerList from "../../../components/standard/customer/CustomerList.jsx";
import axios from "axios";
import { Box, Heading, HStack, Stack } from "@chakra-ui/react";
import CustomerAdd from "../../../components/standard/customer/CustomerAdd.jsx";
import { StandardSideBar } from "../../../components/tool/sidebar/StandardSideBar.jsx";
import { useSearchParams } from "react-router-dom";
import { toaster } from "../../../components/ui/toaster.jsx";
import CustomerView from "../../../components/standard/customer/CustomerView.jsx";

function Customer() {
  const [customerList, setCustomerList] = useState([]);
  const [customerKey, setCustomerKey] = useState(null);
  const [count, setCount] = useState(0);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkedActive, setCheckedActive] = useState(false);
  const [search, setSearch] = useState({
    type: searchParams.get("type") ?? "all",
    keyword: searchParams.get("key") ?? "",
  });
  const [standard, setStandard] = useState({ sort: "", order: "ASC" });

  // 초기 데이터 불러오기
  const fetchInitialCustomerList = () => {
    axios
      .get(`/api/customer/list`, {
        params: {
          sort: "",
          order: "DESC",
          page: "1",
          type: "all",
          keyword: "",
          active: "true",
        },
      })
      .then((res) => {
        const { count, customerList } = res.data;
        setCustomerList(customerList);
        setCount(count);
        console.log("initial");
        // 초기 customerKey 설정
        // if (customerList.length > 0) {
        //   setCustomerKey(customerList[0].customerKey);
        // }
      })
      .catch((error) => {
        console.error("초기 고객 목록 불러오기 오류:", error);
      });
  };
  // console.log("p", customerList);
  // console.log("key", customerKey);

  // 컴포넌트가 마운트될 때 목록 불러오기 및 URL에서 customerKey 설정
  useEffect(() => {
    const keyFromURL = searchParams.get("customerKey");
    if (keyFromURL) {
      setCustomerKey(keyFromURL);
    }
    fetchUpdatedCustomerList();
  }, [searchParams]);

  // 리스트 행 클릭 시 동작
  const handleRowClick = (key) => {
    setCustomerKey(key);
    setEditDialogOpen(true);
  };

  //협력사 등록
  const handleSaveClick = (customerData) => {
    axios
      .post("api/customer/add", customerData)
      .then((res) => res.data)
      .then((data) => {
        fetchUpdatedCustomerList();
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
        setAddDialogOpen(false);
      })
      .catch((e) => {
        const data = e.response.data;
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      });
  };

  //수정 저장 버튼
  const handleEditClick = (customerData) => {
    // console.log(customer);
    axios
      .put("api/customer/edit", customerData)
      .then((res) => res.data)
      .then((data) => {
        fetchUpdatedCustomerList();
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      })
      .catch((e) => {
        const data = e.response.data;
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      });
  };

  // 삭제 내역 포함 체크박스 상태 토글 및 URL 업데이트
  const toggleCheckedActive = () => {
    setSearchParams((prev) => {
      const nextValue = !(prev.get("active") === "true");
      prev.set("active", nextValue.toString());
      return prev;
    });
  };

  // 검색 실행 처리 및 URL 업데이트
  const handleSearchClick = () => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (search.keyword.trim().length > 0) {
      nextSearchParams.set("type", search.type);
      nextSearchParams.set("keyword", search.keyword);
      nextSearchParams.set("page", 1);
    } else {
      nextSearchParams.delete("type");
      nextSearchParams.delete("keyword");
    }

    setSearchParams(nextSearchParams);
  };
  // console.log("out checkedActive", checkedActive);

  // 업데이트 데이터 불러오기
  const fetchUpdatedCustomerList = () => {
    // console.log("in checkedActive", checkedActive);

    axios
      .get(`/api/customer/list`, {
        params: {
          sort: searchParams.get("sort") || "customer_key",
          order: searchParams.get("order") || "DESC",
          page: searchParams.get("page") || "1",
          type: searchParams.get("type") || "all",
          keyword: searchParams.get("keyword") || "",
          active: checkedActive.toString(),
        },
      })
      .then((res) => {
        const { count, customerList } = res.data;
        setCustomerList(customerList);
        setCount(count);
        // update시 customerKey 설정
        // if (customerList.length > 0) {
        //   setCustomerKey(customerList[0].customerKey);
        // }
      })
      .catch((error) => {
        console.error("업데이트 고객 목록 불러오기 오류:", error);
      });
  };

  // 상태가 변경될 때만 업데이트된 데이터 불러오기
  useEffect(() => {
    if (
      searchParams.get("page") ||
      searchParams.get("type") ||
      searchParams.get("keyword")
    ) {
      fetchUpdatedCustomerList();
      // console.log("second");
    }
  }, [searchParams]);

  // checkbox 변화에 따라 표 업데이트
  useEffect(() => {
    fetchUpdatedCustomerList();
    // console.log("call", checkedActive);
  }, [checkedActive]);

  useEffect(() => {
    const nextSearch = { ...search };

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

  //pagination
  const pageParam = searchParams.get("page") ?? "1";
  const page = Number(pageParam);

  // 페이지 번호 변경 시 URL 의 쿼리 파라미터를 업데이트
  function handlePageChange(e) {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", e);
    setSearchParams(nextSearchParams);
  }

  // useEffect(() => {
  //   const pageParam = Number(searchParams.get("page") || "1");
  //   setCurrentPage(page);
  // }, [searchParams]);

  //정렬 기준
  function handleStandard(sort) {
    const currentSort = searchParams.get("sort");
    const currentOrder = searchParams.get("order") || "ASC";

    const newOrder =
      currentSort === sort && currentOrder === "ASC" ? "DESC" : "ASC";

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("sort", sort);
    nextSearchParams.set("order", newOrder);

    setSearchParams(nextSearchParams);
  }

  //정렬 기호 표시 변경
  useEffect(() => {
    const sort = searchParams.get("sort") || "customer_key";
    const order = searchParams.get("order") || "DESC";
    setStandard({ sort, order });
    setCheckedActive(searchParams.get("active") === "true");
  }, [searchParams]);

  // console.log("p", standard);

  const handleResetClick = () => {
    setSearchParams();
  };

  return (
    <Box>
      <HStack align={"flex-start"} w={"100%"}>
        <StandardSideBar />
        <Stack flex={1} p={5} pb={0}>
          <Heading size="xl" mb={3} p={2}>
            기준정보 관리 {">"} 협력업체 관리
          </Heading>

          <CustomerList
            customerList={customerList}
            standard={standard}
            onHeader={handleStandard}
            count={count}
            onRowClick={handleRowClick}
            handlePageChange={handlePageChange}
            setSearchParams={setSearchParams}
            checkedActive={checkedActive}
            toggleCheckedActive={toggleCheckedActive}
            search={search}
            setSearch={setSearch}
            handleSearchClick={handleSearchClick}
            onReset={handleResetClick}
            onNewClick={() => setAddDialogOpen(true)}
          />
        </Stack>
        {/*Dialog*/}
        <div>
          <CustomerAdd
            isOpen={addDialogOpen}
            onCancel={() => setAddDialogOpen(false)}
            onSave={handleSaveClick}
          />

          <CustomerView
            isOpen={editDialogOpen}
            customerKey={customerKey}
            onEdit={handleEditClick}
            onCancel={() => setEditDialogOpen(false)}
          />
        </div>
      </HStack>
    </Box>
  );
}

export default Customer;
