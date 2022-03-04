import { SVGConfig, appendSVG, getRandomColor } from "../utils/SVGUtils";

type SVGInfo = Omit<SVGConfig, "id">;
export class Graphic {
  svgInfo: SVGInfo;
  private id: string;
  constructor({ id, ...rest }: SVGConfig, getContainer: () => HTMLElement) {
    this.id = id;
    this.svgInfo = {
      ...rest,
    };

    // this.svgInfo.styles.borderColor = getRandomColor();

    const container = getContainer();
    appendSVG(container, { id, ...this.svgInfo });
  }

  changeGraphic(options: SVGInfo) {
    const node = document.getElementById(this.id);
    if (node) {
      for (const key of Object.keys(options)) {
        if (key === "styles") {
          for (const styleName of Object.keys(options.styles)) {
            (node.style as any)[styleName] = options.styles[styleName as any];
          }
        } else {
          (node as any)[key] = (options as any)[key];
        }
      }
    } else {
      throw Error("graphic can not find element");
    }
  }

  get uniKey() {
    return this.id;
  }
}
