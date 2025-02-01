import React, { useEffect, useState } from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import { Box, Input } from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import axios from "axios";
import { Field } from "../../ui/field.jsx";
import Select from "react-select";

function LocationAdd({ isOpen, onClose, title }) {
  const [warehouseCode, setWarehouseCode] = useState("");
  const [row, setRow] = useState("");
  const [col, setCol] = useState("");
  const [shelf, setShelf] = useState("");
  const [locationNote, setLocationNote] = useState("");
  const [warehouseName, setWarehouseName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [warehouseList, setWarehouseList] = useState([]);
  const initialLocationAdd = {
    warehouseName: "",
    warehouseCode: "",
    warehouseNote: "",
    row: "",
    col: "",
    shelf: "",
    located: true,
  };
  const [locationAdd, setLocationAdd] = useState(initialLocationAdd);

  const resetState = () => {
    setWarehouseName("");
    setWarehouseCode("");
    setRow("");
    setCol("");
    setShelf("");
    setLocationNote("");
  };

  // 관리자 컬렉션 생성
  const handleWarehouseChange = (selectedOption) => {
    setWarehouseName(selectedOption.label);
    setWarehouseCode(selectedOption.value);
    setSelectedLocation(selectedOption);

    // 선택 즉시 warehouseAdd 업데이트
    setLocationAdd((prev) => ({
      ...prev,
      warehouseName: selectedOption.label,
      warehouseCode: selectedOption.value,
    }));
  };

  // 요청 창 닫히면 초기화
  const handleClose = () => {
    setLocationAdd(initialLocationAdd);
    onClose();
  };

  // 창고 정보 가져오기
  useEffect(() => {
    axios.get(`/api/location/warehouse`).then((res) => {
      const warehouseOptions = res.data.map((warehouse) => ({
        value: warehouse.warehouseCode,
        label: warehouse.warehouseName,
      }));
      setWarehouseList(warehouseOptions);
    });
  }, []);

  const handleSaveClick = () => {
    axios
      .post(`/api/location/add`, {
        warehouseCode,
        row,
        col,
        shelf,
        locationNote,
      })
      .then(handleClose);
    resetState();
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} size="lg">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box>
            <Field label="창고" orientation="horizontal" mb={15}>
              <Select
                options={warehouseList}
                value={warehouseList.find(
                  (opt) => opt.value === locationAdd.employeeName,
                )}
                onChange={handleWarehouseChange}
                placeholder="창고 선택"
                isSearchable
                styles={{
                  control: (base) => ({
                    ...base,
                    width: "538.5px", // 너비 고정
                    height: "40px",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 100, // 선택 목록이 다른 요소를 덮도록
                    width: "538.5px",
                  }),
                }}
              />
            </Field>
            <Box display="flex" gap={20}>
              <Field label="행" orientation="horizontal" mb={15}>
                <Input
                  type={"text"}
                  value={row}
                  onChange={(e) => setRow(e.target.value)}
                />
              </Field>
              <Field label="열" orientation="horizontal" mb={15}>
                <Input
                  type={"text"}
                  value={col}
                  onChange={(e) => setCol(e.target.value)}
                />
              </Field>
              <Field label="단" orientation="horizontal" mb={15}>
                <Input
                  type={"text"}
                  value={shelf}
                  onChange={(e) => setShelf(e.target.value)}
                />
              </Field>
            </Box>
            <Field label="비고" orientation="horizontal" mb={15}>
              <Input
                type={"text"}
                value={locationNote}
                onChange={(e) => setLocationNote(e.target.value)}
              />
            </Field>
          </Box>
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger onClick={handleClose} />
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={handleClose}>
              취소
            </Button>
          </DialogActionTrigger>
          <Button
            variant="solid"
            onClick={() => {
              handleSaveClick();
            }}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default LocationAdd;
