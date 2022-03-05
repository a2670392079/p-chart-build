import { curry } from "lodash-es";
import * as d3 from 'd3';

export interface ElementConfig {
  id: string;
  className?: string;
  styles: CSSStyleDeclaration
}


export interface SVGConfig extends ElementConfig {
  version?: string;
}

export const createSVG = ({
  styles: { width = '100', height = '100', ...rest },
  version = "1.1",
  className = "",
  id,
}: SVGConfig) => {
  const element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  element.setAttribute("id", id);
  element.setAttribute("width", width);
  element.setAttribute("height", height);
  element.setAttribute("version", version);
  element.setAttribute("class", className);

  for(const key of Object.keys(rest)){
    (element.style as any)[key] = (rest as any)[key];
    console.log(element.style.borderColor)
  }
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


const colorScales = d3.scaleSequential(d3.interpolateWarm);
export const getRandomColor = () => {
  return colorScales(Math.random());
}
