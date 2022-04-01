import React from "react";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";

export function ErrorPage() {
  return (
    <div>
      <ErrorAlert
        msg="Ups! Algo salio mal al cargar la informacion."
        code="404"
      />
    </div>
  );
}
