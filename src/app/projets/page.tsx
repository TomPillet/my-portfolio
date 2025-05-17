import React from "react";

export default function Projets() {
  return <div>Projets</div>;
}

export interface Projet {
  title: string;
  slug: string;
  description: string;
  image: string;
  link: string;
}
