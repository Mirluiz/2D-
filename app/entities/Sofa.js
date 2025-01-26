class Sofa extends Object2D {
  image;

  draw(ctx) {
    if (!this.image) {
      return;
    }

    const centerX = this.position.x - this.dimension.width / 2;
    const centerY = this.position.y - this.dimension.height / 2;

    ctx.drawImage(
      this.image,
      centerX,
      centerY,
      this.dimension.width,
      this.dimension.height
    );
  }

  loadImage() {
    const img = new Image();
    img.src = "public/sofa.png";

    img.onload = (res) => {
      this.dimension = { width: img.naturalWidth, height: img.naturalHeight };

      this.image = img;
    };
  }
}
