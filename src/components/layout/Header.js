import React from 'react';
import { connect } from "dva-no-router";

import styles from 'src/styles/common/header.scss';

export default connect(({home}) => ( {home} ))(({home}) => {
  console.log("home", home);
  return (
      <header className={styles.header} />
  );
});
