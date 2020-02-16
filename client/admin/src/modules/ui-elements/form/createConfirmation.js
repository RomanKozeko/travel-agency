import React from 'react';
import ReactDOM from 'react-dom';

const createConfirmation = Component => {
  return props => {
    const wrapper = document.body.appendChild(document.createElement('div'));
    const promise = new Promise((resolve, reject) => {
      try {
        ReactDOM.render(
          <Component
            show={true}
            reject={reject}
            resolve={resolve}
            {...props}
          />,
          wrapper
        );
      } catch (e) {
        throw e;
      }
    });

    function dispose() {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(wrapper);
        setTimeout(() => wrapper.remove());
      }, 1000);
    }

    return promise.then(
      res => {
        dispose();
        return res;
      },
      res => {
        dispose();
        return Promise.reject(res);
      }
    );
  };
};

export default createConfirmation;
