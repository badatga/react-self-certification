import logo from './logo.svg';
/* global IMP */

import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthResultPage from './components/AuthResultPage';



function App() {

    useEffect(() => {
        if (window.IMP) {
            window.IMP.init('IMP 벨류');
            console.log('done');
        } else {
            console.error('아임포트 라이브러리가 로드되지 않았습니다.');
        }
    }, []);

  const handleAuthButtonClick = async () => {
      // 다날 본인인증 API 호출 로직을 여기에 구현합니다.
      // 예시로, window.open을 사용하여 다날 본인인증 페이지를 새 탭에서 열도록 설정할 수 있습니다.
      // window.open('다날 본인인증 페이지 URL');

      if (!window.IMP) {
          alert('아임포트 라이브러리가 로드되지 않았습니다. 페이지를 새로고침 해주세요.');
          return;
      }


      // IMP.certification(param, callback) 호출
      IMP.certification({ // param
          // 주문 번호
          pg:'danal.{value}',//본인인증 설정이 2개이상 되어 있는 경우 필
          merchant_uid: `mid_${new Date().getTime()}`,
          // 모바일환경에서 popup:false(기본값) 인 경우 필수
          m_redirect_url: 'http://localhost:3000/auth-result', // 본인인증 완료 후 리디렉션될 URL
          // PC환경에서는 popup 파라미터가 무시되고 항상 true 로 적용됨
          popup: false
      }, rsp => { // callback
          // console.log(rsp);
          if (rsp.success) {
              // 인증 성공 시 로직,
              console.log('인증 성공', rsp);
              // alert('본인인증이 성공적으로 완료되었습니다.');
          } else {
              // 인증 실패 시 로직,
              console.error('인증 실패', rsp);
              // alert('본인인증에 실패하였습니다.');
          }
      });
  };

  return (
      <Router>
          <div>
              <button onClick={handleAuthButtonClick}>본인인증</button>

              <Routes>
                  <Route path="/auth-result" element={<AuthResultPage />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
