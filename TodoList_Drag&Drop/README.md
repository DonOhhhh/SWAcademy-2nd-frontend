# To do list Drag & Drop

## (1)

- 기본적으로 완료된 일과 완료되지 않은 일 목록을 불러오는 기능
- Drag&Drop
  - Drag를 시작했을 때 dataTransfer에 정의된 요소를 꺼내와서 어떤 요소가 drag됐는지를 판단해서 쓴다.
  - dragstart event는 drag가 시작됐을 때 해당 요소를 가져온다.
- drag할 요소와 drop할 요소를 정의한다.
- Drag했을 때 어떤 요소가 Drag 되어지고 있는지 확인


## (2)

- 드롭 지역 정의하기
  - 기본적으로 브라우저는 HTML 요소에 뭔가를 드롭했을 때 해당 요소에서 어떠한 이벤트(`dragover`, `drop`)도 일어나지 않도록 해야한다(`event.preventDefault()`). 특정 요소을 droppable로 만들기 위해서는 ondragover와 ondrop 이벤트에 대한 핸들러 정의해야 한다.
- drop 했을 때 실제로 목록이 update되고 update된 목록이 화면에 보여지는 기능
- 낙관적 업데이트 추가