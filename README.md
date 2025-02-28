# 중앙시스템

## ⚙️ 프로젝트 소개
<img src="https://github.com/user-attachments/assets/e2503ed9-a9ab-4751-8da0-ef85a5e664d9" width="600" height="300"/>

**중앙시스템**은 편의점 자산관리 시스템입니다.

자산의 이동 과정을 체계적으로 구축하여 본사와 협력업체가 보다 효율적으로 자산 관리 업무를 할 수 있도록 돕는 것을적인 자산관리 업무를 하는 것을 목표로 합니다. 
<br></br>
 ## 📆 프로젝트 기간
 2021/01/06 ~ 2025/02/10

 - 기획 및 설계: 25.01.06~25.01.13
 - 구현: 25.01.14~25.02.02
 - 디자인 및 오류 테스트 25.02.03~25.02.10
<br></br>
 ## 👩🏻‍💻 팀원
| **이름**   | **담당** |
|:-----------------:|:------------------------------|
|**민재원L**|창고 관리, 로케이션 관리, 물품 입출내역, 재고 실사<br>|
|**김민경**|가맹점 관리, 구매 관리|
|**김수민**|품목 관리, 공통 코드 관리, 설치 관리 및 상태<br> 공통 컴포넌트(검색, 정렬, 페이지네이션, 상태) 관리|
|**김용수**|인사 관리(회원 등록), 입고 관리|
|**김지민**|협력 업체 관리, 반품(회수) 관리|
|**윤병관**|로그인, 메인페이지, 사업장 관리, 공통 코드 관리, 위치별 재고 현황|

<br>

## 📚 기술스택
 ### frontend
 <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/chakra--ui-319795?style=for-the-badge&logo=chakra-ui&logoColor=white"> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">

 
 ### backend
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> <img src="https://img.shields.io/badge/mariaDB-003545?style=for-the-badge&logo=mariaDB&logoColor=white"> <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white"> <img src="https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=amazon-ec2&logoColor=white"> <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"> <img src="https://img.shields.io/badge/MyBatis-000000?style=for-the-badge&logo=MyBatis&logoColor=white">
 
 ### tools
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/IntelliJ%20IDEA-000000?style=for-the-badge&logo=intellij-idea&logoColor=white">

<details><summary><b>버전</b></summary>
 
| **기술스택**   | **버전** |
|-----------------|-------------------------|
| Java | 21 |
| SpringBoot| 3.3.6 |
| React  | 18.3.1 |
| MariaDB  | 11.5.2 |
| Docker  | 27.2.0 |
| ChakraUI  | 3.2.1 |
| MyBatis  | 3.0.3 |
| IntelliJ  | 24.2.2 |

</details>

<br>

 ## 🗂️ ERD
![ERD](https://github.com/user-attachments/assets/040f2483-78ec-4f0d-91f5-5aa3ee308325)
<br></br>
## 🖇 작품 흐름도
![Image](https://github.com/user-attachments/assets/a42a7de4-5925-4b66-9c94-180eab6a9d0d)
<br></br>
## 📑 메인 업무 흐름도
![Image](https://github.com/user-attachments/assets/abf54fc4-c818-4fde-a2c6-4cec70117c25)
<br></br>
 ## 🖥 화면구현(맡은 부분)
<details><summary><b>품목</b></summary> 
 
![품목](https://github.com/user-attachments/assets/5c73fa8d-f18b-4023-a627-bff19a85ed3f)

#### 품목 등록
 ##### 협력업체가 사용하는 품목만 등록 가능
![품목 등록](https://github.com/user-attachments/assets/27343233-b49f-482c-89ad-d5d625d67f3b)

#### 품목 상세
![품목 상세](https://github.com/user-attachments/assets/97c1d9ee-2cd2-4122-be70-ec26100dd4a7)
</details>
<details><summary><b>공통 코드</b></summary>
 
#### 코드 등록
![코드 등록](https://github.com/user-attachments/assets/8373c83f-309a-43a8-8f75-f81d3e4b1c85)

#### 코드 상세
![코드 상세](https://github.com/user-attachments/assets/66cff49b-42e6-44ab-b725-deb3ef8067e9)
</details>
<details><summary><b>설치 관리</b></summary>
 
![설치](https://github.com/user-attachments/assets/a8f868c7-374e-446c-8fe2-f325ae752030)

#### 설치 요청
 ##### 해당 품목이 창고에 존재하는 수 이하로 요청 가능
![설치 요청](https://github.com/user-attachments/assets/31d7380f-164d-4ca7-9343-35dd1d5496f2)

#### 설치 승인
 ##### 설치 기사, 예정일 지정 후 승인 가능
![설치 승인](https://github.com/user-attachments/assets/42e6c937-53a6-4523-b73f-56fd135c7928)

#### 설치 완료
 ##### 최종적으로 설치 기사가 설치 후 완료 
![설치 완료](https://github.com/user-attachments/assets/faab1143-2e00-4453-b692-7805b9774767)

#### 설치 반려
 ##### 설치 요청 반려 시
![설치 반려](https://github.com/user-attachments/assets/7cad7460-8ef2-46c7-a55d-6526499f3346)
</details>

🎬 [시연 영상 보기](https://youtu.be/zweG9Zr0dIo)

## 🛠 트러블 슈팅
<details><summary><b>도메인 지식 부족</b></summary>
 <br>
<b>1. 문제 식별</b><br>
자산관리 시스템에 대한 개념 이해도가 낮아 프로젝트를 구현할 때 초반 설계 부분에 시간 소요가 예정보다 길었음.<br>
 <br>
<b>2. 문제 해결 접근 방법</b><br>
피드백을 통한 자재관리 업무 프로세스에 대한 인식을 확립하고 팀원들간의 매일 정기적인 회의를 통해 의견을 하나로 통일 <br>
  <br>
<b>3. 결과 및 교훈</b><br>
다양한 방식을 하나의 해결 방법으로 결정하는 것이 생각보다 시간 소요가 있던 것에 아쉬움이 남았지만 모두가 이해하고 납득하는 결과를 얻은 부분이 좋았던 것 같다.
</details>
<details><summary><b>ERD 테이블의 구조</b></summary>
<b>1. 문제 식별</b><br>
 
  ##### ERD 초안
 ![Image](https://github.com/user-attachments/assets/9b4dbe04-03f5-4b67-944d-e3424e7af0c3)
 ##### ERD 최종
 ![Image](https://github.com/user-attachments/assets/9034e38e-3286-4b0e-ad68-534eee058964)
 
 위와 같이 개념 이해도가 부족한 상태에서 ERD를 설계하다보니까 프로젝트를 수행하면서 ERD 수정이 많았음<br> 
 <br>
<b>2. 문제 해결 접근 방법</b><br>
 피드백을 통한 테이블 구조에 대한 인식을 재정립 및 테이블 구조의 재구성<br>
 <br>
<b>3. 결과 및 교훈</b><br>
 프로젝트를 할 때마다 ERD의 중요성을 느끼는데, 이번에도 여전히 프로젝트를 수행하면서 ERD 수정이 많아서 아쉬웠다. 좀 더 업무에 맞는 ERD 구조도를 생각했으면 빠르게 ERD 구조를 설정한 후 많은 기능을 넣을 수 있었을 거라는 아쉬움이 남았다.
</details>
