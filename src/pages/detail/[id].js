import React, { useEffect } from 'react';
import Link from 'next/link';
import WithDva from 'src/store/withDva';
import Header from 'src/components/layout/Header'
import { useRouter } from "next/router";
import TDK from "src/components/layout/TDK";

const Detail = ({home, dispatch, query}) => {
    const Router = useRouter();

    useEffect(() => {
        console.log("Router", Router)
    }, []);
    const {name, count} = home;
    console.log('rendered!!');
    return (
        <div>
            <TDK />
            <Header />
            Hi !! Detail
            <p>
                count:&nbsp;
                {count}
            </p>
            <p>
                <button onClick={() => {
                    dispatch({type: 'home/add'});
                }}
                >
                    plus
                </button>
            </p>
            <p>
                <button onClick={() => {
                    dispatch({type: 'home/minus'});
                }}
                >
                    minus
                </button>
            </p>
            <p>
                <Link href="/users">
                    <a>Go to /users</a>
                </Link>
            </p>
        </div>
    );
};

Detail.getInitialProps = async ({req, pathname, query, isServer, store}) => {
    console.log('get init props', {req, pathname, query, isServer, store});
    if (isServer) {
        await store.dispatch({type: 'home/init'});
    } else {
        store.dispatch({type: 'home/init'});
    }
    return {
        // dont use store as property name, it will confilct with initial store
        pathname, query, isServer, dvaStore: store,
    };
};

export default WithDva(state => ( {home: state.home} ))(Detail);
