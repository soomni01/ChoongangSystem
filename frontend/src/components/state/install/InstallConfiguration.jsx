import React, { useContext, useEffect, useState } from "react";
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
import { Button } from "../../ui/button.jsx";
import { Field } from "../../ui/field.jsx";
import {
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Separator,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";

export function InstallConfiguration({
  installKey,
  isOpen,
  onClose,
  setChange,
}) {
  const { id, name } = useContext(AuthenticationContext);
  const [installData, setInstallData] = useState(null);
  const [inoutHistoryNote, setInoutHistoryNote] = useState("");

  const handleClose = () => {
    setInoutHistoryNote("");
    onClose();
  };

  // 설치 승인 정보와 시리얼 번호 정보를 병렬로 가져오기
  useEffect(() => {
    if (installKey) {
      axios
        .get(`/api/install/approve/${installKey}`)
        .then((res) => {
          const data = res.data || [];
          setInstallData(data);
        })
        .catch((error) => {
          console.error("설치 요청 정보 오류 발생: ", error);
        });
    }
  }, [installKey]);

  const handleConfigurationClick = () => {
    // 설치 확인 요청
    const configurationData = {
      outputNo: installData.outputNo,
      // 협력일체 직원(승인자), 본사 직원(신청자), 가맹점 코드,
      customerEmployeeNo: id,
      businessEmployeeNo: installData.businessEmployeeNo,
      franchiseCode: installData.franchiseCode,
      inoutHistoryNote,
    };
    axios
      .post("/api/install/configuration", configurationData)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        setChange((prev) => !prev);
        handleClose();
      })
      .catch((e) => {
        const message = e.response?.data?.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  // installData의 serialNumbers를 split하여 serialList로 설정
  const serialList = installData?.serialNumbers?.split(",") || [];

  // installData가 null 또는 undefined일 때 렌더링을 막기 위한 처리
  if (!installData) {
    return null; // 데이터가 없으면 아무것도 렌더링하지 않음
  }
  console.log(installData);
  return (
    <DialogRoot open={isOpen} onOpenChange={handleClose} size="lg">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>설치 완료</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={"15px"}>
            <Field label={"가맹점"} orientation="horizontal">
              <Input value={installData.franchiseName} readOnly />
            </Field>
            <Field label={"가맹점 주소"} orientation="horizontal">
              <Input value={installData.franchiseAddress} readOnly />
            </Field>
            <Field label={"품목"} orientation="horizontal">
              <Input value={installData.itemCommonName} readOnly />
            </Field>
            <HStack>
              <Field label={"신청자"} orientation="horizontal">
                <Input value={installData.businessEmployeeName} readOnly />
              </Field>
              <Field label={"사번"} orientation="horizontal">
                <Input value={installData.businessEmployeeNo} readOnly />
              </Field>
            </HStack>
            <HStack>
              <Field label={"설치 기사"} orientation="horizontal">
                <Input value={installData.customerInstallerName} readOnly />
              </Field>
              <Field label={"사번"} orientation="horizontal">
                <Input value={installData.customerInstallerNo} readOnly />
              </Field>
            </HStack>
            <Field label={"승인 날짜"} orientation="horizontal">
              <Input value={installData.installRequestDate} readOnly />
            </Field>
            <Field label={"승인 비고"} orientation="horizontal">
              <Input value={installData.installApproveNote} readOnly />
            </Field>
            <Separator />
            <HStack>
              <Field label={"출고 번호"} orientation="horizontal">
                <Input value={installData.outputNo} readOnly />
              </Field>
              <Field label={"시리얼 번호"} orientation="horizontal">
                <SelectRoot>
                  <SelectTrigger>
                    <SelectValueText>{serialList[0]}</SelectValueText>
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      width: "220px",
                      top: "40px",
                      position: "absolute",
                    }}
                  >
                    {serialList.map((serial) => (
                      <SelectItem key={serial} item={serial}>
                        {serial}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>
            </HStack>
            <Field label={"완료 비고"} orientation="horizontal">
              <Textarea
                value={inoutHistoryNote}
                placeholder="최대 50자"
                onChange={(e) => setInoutHistoryNote(e.target.value)}
              />
            </Field>
            {installData.consent && (
              <Field label={"설치 날짜"} orientation="horizontal">
                <Input
                  value={"test"}
                  onChange={(e) => setSerialNote(e.target.value)}
                />
              </Field>
            )}
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">취소</Button>
          </DialogActionTrigger>
          <Button onClick={handleConfigurationClick}>완료</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
