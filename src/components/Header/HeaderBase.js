import React, { useState, useEffect } from 'react';

import { Box } from 'grommet';

const HeaderBase = props => {

  return (
    <Box
      align="center" as="header" direction="row" flex={false}
      justify="between" pad="small" background="light-4"
      margin={{"bottom": "medium"}}
      >
      {props.children}
    </Box>
  )
}

export default HeaderBase;
