"use client";
import clsx from "clsx";
import React, { ReactNode, useCallback, useRef } from "react";

interface TiltComponentProps {
  children: ReactNode;
  className?: string;
}

function TiltComponent({ children, className }: TiltComponentProps) {
  const elRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = elRef.current;
    if (!el) return;

    const { clientWidth: width, clientHeight: height } = el;
    const { clientX, clientY } = e;

    const rect = el.getBoundingClientRect();
    const xVal = clientX - rect.left;
    const yVal = clientY - rect.top;

    const maxRotation = 30; // Define a rotação máxima em graus

    // Calcula a rotação com base na posição do mouse
    const yRotation = ((xVal - width / 2) / width) * maxRotation;
    const xRotation = (-(yVal - height / 2) / height) * maxRotation;

    // Aplica a transformação com rotação suave
    el.style.transform = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
  }, []);

  const handleMouseOut = useCallback(() => {
    const el = elRef.current;
    if (!el) return;

    el.style.transform = "perspective(500px) scale(1) rotateX(0) rotateY(0)";
  }, []);

  const handleMouseDown = useCallback(() => {
    const el = elRef.current;
    if (!el) return;

    el.style.transform = "perspective(500px) scale(1) rotateX(0) rotateY(0)";
  }, []);

  const handleMouseUp = useCallback(() => {
    const el = elRef.current;
    if (!el) return;

    el.style.transform = "perspective(500px) scale(1.1) rotateX(0) rotateY(0)";
  }, []);

  return (
    <div
      className={clsx("tilt", className)}
      ref={elRef}
      onMouseMove={handleMove}
      onMouseOut={handleMouseOut}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
}

export default TiltComponent;
