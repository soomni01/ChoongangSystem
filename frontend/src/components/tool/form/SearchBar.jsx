import React, { useEffect, useState } from "react";
import { HStack, IconButton, Input } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../ui/select.jsx";
import { Button } from "../../ui/button.jsx";
import { useLocation, useSearchParams } from "react-router-dom";
import { BsArrowCounterclockwise } from "react-icons/bs";

export function SearchBar({ onSearchChange, searchOptions }) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams("");
  const [search, setSearch] = useState({
    type: "all",
    keyword: "",
  });

  useEffect(() => {
    const type = searchParams.get("type") ?? "all";
    const keyword = searchParams.get("keyword") ?? "";
    setSearch({ type, keyword });
  }, [searchParams]);

  // 검색 조건에 맞는 URL 파라미터 설정
  const buildSearchParams = () => {
    const nextSearchParam = new URLSearchParams();
    if (search.keyword.trim().length > 0) {
      nextSearchParam.set("type", search.type);
      nextSearchParam.set("keyword", search.keyword);
    } else {
      nextSearchParam.delete("type");
      nextSearchParam.delete("keyword");
    }

    // 경로별로 다른 파라미터 추가
    if (location.pathname.startsWith("/item")) {
      const active = searchParams.get("active") ?? "false";
      nextSearchParam.set("active", active);
    } else if (location.pathname.startsWith("/commonCode")) {
      const active = searchParams.get("active") ?? "false";
      nextSearchParam.set("active", active);
      const filter = searchParams.get("filter") ?? "all";
      nextSearchParam.set("filter", filter);
    } else if (location.pathname.startsWith("/purchase")) {
      const state = searchParams.get("state") ?? "all";
      nextSearchParam.set("state", state);
    } else if (location.pathname.startsWith("/install")) {
      const state = searchParams.get("state") ?? "all";
      nextSearchParam.set("state", state);
    } else if (location.pathname.startsWith("/instk")) {
      const state = searchParams.get("state") ?? "all";
      nextSearchParam.set("state", state);
    } else if (location.pathname.startsWith("/return")) {
      const state = searchParams.get("state") ?? "all";
      nextSearchParam.set("state", state);
    }

    const sort = searchParams.get("sort") ?? "";
    const order = searchParams.get("order") ?? "desc";
    nextSearchParam.set("sort", sort);
    nextSearchParam.set("order", order);
    nextSearchParam.set("page", "1"); // 페이지는 1로 리셋
    return nextSearchParam;
  };

  // 검색 파라미터가 변경되면 URL 업데이트
  const handleSearchClick = () => {
    const nextSearchParam = buildSearchParams();
    setSearchParams(nextSearchParam);
    onSearchChange(nextSearchParam); // 부모에게 전달
  };

  const handleResetClick = () => {
    setSearchParams("");
    setSearch({ type: "all", keyword: "" });
  };

  return (
    <HStack justifyContent="center" w={"100%"} mt={-2}>
      <SelectRoot
        collection={searchOptions}
        width="160px"
        position="relative"
        value={[search.type]}
        onValueChange={(e) => {
          setSearch({ ...search, type: e.value[0] });
        }}
      >
        <SelectTrigger>
          <SelectValueText />
        </SelectTrigger>
        <SelectContent>
          {searchOptions?.items.map((option) => (
            <SelectItem item={option} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      <Input
        placeholder="검색어를 입력해 주세요."
        width="50%"
        value={search.keyword}
        onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchClick();
          }
        }}
      />
      <IconButton
        transform="translateX(-130%) "
        style={{ cursor: "pointer" }}
        variant={"none"}
        onClick={handleResetClick}
      >
        <BsArrowCounterclockwise size="25px" />
      </IconButton>
      <Button onClick={handleSearchClick} transform="translateX(-75%)">
        검색
      </Button>
    </HStack>
  );
}
