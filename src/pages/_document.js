import React from "react";
import Document, { Head, Main, NextScript } from "next/document";

import 'src/styles/common/init.scss';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {...initialProps};
    }

    render() {
        return (
            <html lang="zh">
            <Head>
                <meta name="baidu-site-verification" content="uGgzMZ4ZfV" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta httpEquiv="cleartype" content="on" />
                <meta name="HandheldFriENDly" content="True" />
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
                <meta content="yes" name="apple-mobile-web-app-capable" />
                <meta content="yes" name="apple-touch-fullscreen" />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
            </html>
        );
    }
}
