import React from 'react';
import styles from 'src/styles/common/error.scss';
import TDK from 'src/components/layout/TDK';

const NoFound = ({statusCode}) => {
    return (
        <div className={styles.errorPage}>
            <TDK />
            <img src="/static/image/404.png" alt="404" />
            <p>页面出错</p>
            <p>
                错误代码：
                {statusCode || 404}
            </p>
        </div>
    );
};
NoFound.getInitialProps = async ({res, err}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return {statusCode};
};

export default NoFound;
