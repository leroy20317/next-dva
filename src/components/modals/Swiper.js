import React, { useEffect, useRef, useState } from 'react';
import Swiper from '@/components/modals/Swiper';
import 'swiper/dist/css/swiper.min.css';
import DynamicViewer from './Viewer';

export default ({
                    styles, requireUrl, maxLength, album, options,
                }) => {
    const [swiper, setSwiper] = useState(null);
    useEffect(() => {
        setSwiper(album.length && album.length > maxLength ? new Swiper('.swiper-container', options) : null);
    }, [album.length, maxLength, options]);
    const viewerModal = useRef();

    const showImg = (index) => { // 显示图片预览
        viewerModal.current.show(index);
    };

    return (
        <>
            <div className={`swiper-container ${styles.photoListBox}`}>
                <div
                    className={`swiper-wrapper ${album.length && album.length <= maxLength ? styles.photoListWrapper : ''}`}
                >
                    {
                        album.map((item, index) => {
                            return (
                                <div
                                    className={`swiper-slide ${styles.photoItem}`}
                                    key={index}
                                    onClick={() => showImg(index)}
                                >
                                    <img src={`${item}?x-oss-process=image/resize,m_mfit,w_226,h_170`} alt="" />
                                </div>
                            );
                        })
                    }
                </div>
                {
                    album.length && album.length > maxLength ?
                        <>
                            <div className="swiper-button-prev swiper-button-black" />
                            <div className="swiper-button-next swiper-button-black" />
                        </> : null
                }

            </div>
            <DynamicViewer list={album} ref={viewerModal} />
        </>

    );
};
