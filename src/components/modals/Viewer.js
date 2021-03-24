import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.min.css';

export default forwardRef((props, ref) => {
  const [viewerRef, setViewerRef] = useState(null); // viewer实例
  const rviewer = useCallback((node) => {
    if (node !== null) {
      setViewerRef(new Viewer(node));
    }
  }, []);

  useImperativeHandle(ref, () => ( { // 将方法通过ref传递给父组件
    show(index) {
      viewerRef.view(index);
    },
  } ));
  return (
      <div style={{display: 'none'}}>
        <ul id="images" ref={rviewer}>
          {
            props.list.map((item, index) => {
              return (
                  <li key={index}><img src={item} style={{width: 0, height: 0}} alt="" /></li>
              );
            })
          }
        </ul>
      </div>
  );
});

