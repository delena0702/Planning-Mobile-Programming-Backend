# Planning-Mobile-Programming-Backend
모바일 프로그래밍 팀 프로젝트의 Backend 서버입니다. 일정 데이터를 서버에 저장하고, 일정 시간이 지나면 삭제되는 Timeout 기능이 있습니다.
[https://ku-planning-2022.herokuapp.com/](https://ku-planning-2022.herokuapp.com/connect?code=777777) 에서 호스팅 중입니다.

 - POST `/request`  
data(String) : 스케쥴들의 JSON String.  
서버에 데이터를 저장하고 5분간 접근 가능한 6자리 코드를 반환한다.(XML 반환)  
 - GET `/connect?code=`  
code(String) : 6자리 코드로 서버에 저장된 데이터를 지정한다.  
서버에 저장된 데이터를 불러온다.(XML 반환)
