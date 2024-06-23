import { useEffect, useRef, useState } from "react";

import { Toast } from "primereact/toast";
// import { Button } from "primereact/button";

const ToastEle = (props) => {
  const toast = useRef(null);

  const {
    errorMessage,
    errorVisibility,
    setErrorVisibility,
    status,
    setStatus,
  } = props;

  // for success message add new prop status to take success or error string as indicator and use them to pass in severity
  const showError = () => {
    if (status === "success") {
      toast.current.show({
        severity: "success",
        detail: errorMessage,
        life: 3000,
      });
      return;
    }
    toast.current.show({ severity: "error", detail: errorMessage, life: 3000 });
  };

  useEffect(() => {
    if (errorVisibility === true) {
      showError();
      setErrorVisibility(false);
      setStatus("");
    }
  }, [errorVisibility]);

  return <Toast ref={toast} position="top-center" />;
};

export default ToastEle;
