import React from "react";
import Link from 'next/link';

export default function() {
    return (
        <div>
            Users
            <br />
            <br />
            <Link href={{pathname: "/home", query: {id: 11}}}>
                <a>
                    Back
                </a>
            </Link>
        </div>
    );
}
