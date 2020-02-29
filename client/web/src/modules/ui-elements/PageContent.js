import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  pageContent: {
    padding: '40px 0 40px',
  },
});

const PageContent = ({ children, small, loading }) => (
  <div className={css(styles.pageContent)}>
    <div className="container" style={{ maxWidth: small && '980px' }}>
      {loading ? <h5>Загрузка...</h5> : children}
    </div>
  </div>
);

PageContent.defaultProps = {
  loading: false,
};

export default PageContent;
