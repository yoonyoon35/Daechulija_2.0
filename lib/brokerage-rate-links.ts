export interface BrokerageRateLinkItem {
  region: string;
  href: string;
}

/**
 * 지자체 공식 중개보수 요율표 링크를 여기에 입력하세요.
 * - href가 비어 있으면 UI에서 "링크 준비중"으로 표시됩니다.
 * - 예: "https://www.seoul.go.kr/..."
 */
export const brokerageRateLinks: BrokerageRateLinkItem[] = [
  { region: "서울특별시", href: "https://land.seoul.go.kr:444/land/broker/brokerageCommission.do" },
  { region: "경기도", href: "https://www.gg.go.kr/bbs/boardView.do?bsIdx=656&bIdx=83794&menuId=2082" },
  { region: "인천광역시", href: "https://www.incheon.go.kr/build/BU060102/274" },
  { region: "부산광역시", href: "https://www.busan.go.kr/depart/ahestateprice01-1" },
  { region: "대구광역시", href: "https://www.daegu.go.kr/build/index.do?menu_id=00001346" },
  { region: "대전광역시", href: "https://www.djjunggu.go.kr/kr/sub02_06_05_01.do" },
  { region: "광주광역시", href: "https://www.gwangju.go.kr/build/contentsView.do?pageId=build25" },
  { region: "울산광역시", href: "https://www.ulsannamgu.go.kr/fieldInfo/realestateInfo03.jsp" },
  { region: "세종특별자치시", href: "https://www.sejong.go.kr/bbs/R0071/view.do?nttId=B000000152318Nv9qS1u" },
  { region: "강원특별자치도", href: "https://state.gwd.go.kr/portal/partinfo/landHousing/realEstate/calculation" },
  { region: "충청북도", href: "https://www.chungbuk.go.kr/www/contents.do?key=4582" },
  { region: "충청남도", href: "https://viewstory.net/external/resources/upload/chn/convert/2026/04/21/7a0359be-34ae-43f2-9839-12c08d09f6ce.jpg" },
  { region: "전북특별자치도", href: "https://www.jeonbuk.go.kr/board/SynapViewer.jeonbuk?boardId=BBS_0000037&menuCd=DOM_000000104002011000&paging=ok&startPage=1&dataSid=334939&command=update&fileSid=273380" },
  { region: "전라남도", href: "https://www.jeonnam.go.kr/contentsView.do?menuId=jeonnam0505060000" },
  { region: "경상북도", href: "https://www.gb.go.kr/Main/economy/page.do?mnu_uid=15370&LARGE_CODE=1070&MEDIUM_CODE=10&SMALL_CODE=30&SMALL_CODE2=10" },
  { region: "경상남도", href: "https://gis.gyeongnam.go.kr/srp/brokerageFee.do" },
  { region: "제주특별자치도", href: "https://www.jeju.go.kr/city/land/tariff.htm" },
];
