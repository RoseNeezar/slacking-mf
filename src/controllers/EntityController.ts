interface IEntity {
  x: number;
  y: number;
  size: number;
  attributes: any;
}
export default class EntityController {
  x: number;
  y: number;
  size: number;
  attributes: any;
  constructor({ attributes, size, x, y }: IEntity) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.attributes = { ...attributes };
  }
  action(verb: string, world: any) {
    console.log("Verb--", verb);
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.attributes.color || "white";
    context.textBaseline = "hanging";
    context.font = "16px Helvetica";
    context.fillText(
      this.attributes.ascii,
      this.x * this.size +
        (this.attributes.offset.x ? this.attributes.offset.x : 0),
      this.y * this.size +
        (this.attributes.offset.y ? this.attributes.offset.y : 0)
    );
  }
}
