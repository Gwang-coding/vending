import React, { useState, useEffect } from "react";
import Head from "next/head";
import theme from "../Styles/theme";
import { ThemeProvider } from "styled-components";
function Layout({ children }) {
  // 모든 children에 login 상태를 props로 전달
  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, {})
  );

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width"
        />
      </Head>
      {childrenWithProps}
    </ThemeProvider>
  );
}

export default Layout;
