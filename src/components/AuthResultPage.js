// src/components/AuthResultPage.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function AuthResultPage() {
    const location = useLocation();
    const [authResult, setAuthResult] = useState(null);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const success = query.get('success');
        const message = query.get('message');

        setAuthResult({ success, message });
    }, [location]);

    if (!authResult) {
        return <div>본인인증 결과를 로딩 중입니다...</div>;
    }

    return (
        <div>
            <h2>본인인증 결과</h2>
            {authResult.success === 'true' ? (
                <p>본인인증이 성공적으로 완료되었습니다.</p>
            ) : (
                <p>본인인증에 실패했습니다: {authResult.message}</p>
            )}
        </div>
    );
}

export default AuthResultPage;
