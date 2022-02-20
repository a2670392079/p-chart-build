import { curry } from "lodash-es";

export interface ElementConfig {
  id: string;
  className?: string;
  width?: number;
  height?: number;
}

export interface SVGConfig extends ElementConfig {
  version?: string;
}

export const createSVG = ({
  width = 100,
  height = 100,
  version = "1.1",
  className = "",
  id,
}: SVGConfig) => {
  const element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  element.setAttribute("id", id);
  element.setAttribute("width", width.toString());
  element.setAttribute("height", height.toString());
  element.setAttribute("version", version);
  element.setAttribute("class", className);
  return element;
};

export const appendChild = (
  create: (arg: any) => Element,
  ref: HTMLElement,
  config: ElementConfig
) => {
  ref.appendChild(create(config));
};

export const appendSVG = curry(appendChild)(createSVG);
