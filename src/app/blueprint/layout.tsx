// src/app/blueprint/layout.tsx
import React from "react";
import "./blueprint.css"; // This is the only style import needed here.

export default function BlueprintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}