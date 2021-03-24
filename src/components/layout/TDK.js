import Head from "next/head";
import React from "react";

export default ({title, keywords, description}) => {
    return (
        <Head>
            <meta name="keywords" content={keywords || "111"} />
            <meta name="description" content={description || "1111"} />
            <title>{title || "11111"}</title>
        </Head>
    );
}
