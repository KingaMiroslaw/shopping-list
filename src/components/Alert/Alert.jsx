import React from "react";
import { useEffect } from "react";
import classes from "./Alert.module.css";

const Alert = ({ type, msg, setAlert }) => {
  const classNames = [classes["alert"], classes[`alert-${type}`]];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert({ show: false, msg: "", type: "" });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [setAlert, msg]);

  return <p className={classNames.join(" ")}>{msg}</p>;
};

export default Alert;
