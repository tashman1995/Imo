import React from "react";
import { CenterModal } from "react-spring-modal";
import "react-spring-modal/dist/index.css";
import { animated, useTransition } from "react-spring";


const Modal = ({openModal,modal,closeModal, children}) => {

      const transitionConfig = {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
      };

      const fade = useTransition(
        openModal,
        null,
        transitionConfig
      );

  return (
    <CenterModal isOpen={modal} onRequestClose={closeModal}>
      {fade.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
             {children}
            </animated.div>
          )
      )}
    </CenterModal>
  );
};



export default Modal;
