import { useState, useEffect } from "react";

export const useDrag = (element) => {
  const isMouseDown = false;

  let mouseX;
  let mouseY;

  let elementX = 0;
  let elementY = 0;

  element.addEventListener("mousedown", onMouseDown);

  function onMouseDown(event) {
    isMouseDown = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
  }

  element.addEventListener("mousemove", onMouseUp);

  function onMouseUp(event) {
    isMouseDown = false;
    elementX = parseInt(element.style.left) || 0;
    elementY = parseInt(element.style.top) || 0;
  }

  element.addEventListener("mousemove", onMouseMove);

  function onMouseMove(event) {
    if (!isMouseDown) return;
    var deltaX = event.clientX - mouseX;
    var deltaY = event.clientY - mouseY;
    element.style.left = elementX + deltaX + "px";
    element.style.top = elementY + deltaY + "px";
  }
};
