class Snow {
  constructor(options = {}) {
    this.setOptions(options)
    this.createCanvas()
    this.createSnow()
    this.drawSnow()
  }
  // 初始化参数
  setOptions(options) {
    this.snowList = [] // 雪花列表
    this.width = document.documentElement.clientWidth
    this.height = document.documentElement.clientHeight
    this.count = typeof options.count === 'undefined' ? 100 : options.count // 雪花数量，默认100
    // 雪花半径范围
    if (
      Array.isArray(options.radiusRange) &&
      options.radiusRange.length === 2
    ) {
      this.radiusRange = options.radiusRange
    } else {
      this.radiusRange = [1, 5]
    }
    this.color = options.color || '#fff' // 雪花颜色
    this.shadowColor = options.shadowColor || '#aaa' // 阴影颜色
    // 模糊阴影半径
    this.shadowBlur =
      typeof options.shadowBlur === 'undefined' ? 4 : options.shadowBlur
    this.speedRate = 100 // 调整速度的系数
    // 水平方向速度
    if (
      Array.isArray(options.horizontalSpeeds) &&
      options.horizontalSpeeds.length === 2
    ) {
      this.horizontalSpeeds = options.horizontalSpeeds
    } else {
      this.horizontalSpeeds = [0, 20]
    }
    // 下落速度
    if (Array.isArray(options.fallSpeeds) && options.fallSpeeds.length === 2) {
      this.fallSpeeds = options.fallSpeeds
    } else {
      this.fallSpeeds = [100, 200]
    }
  }
  // 创建画布
  createCanvas() {
    const canvas = document.createElement('canvas')
    canvas.width = this.width
    canvas.height = this.height
    document.body.appendChild(canvas)
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }
  // 初始化雪花
  createSnow() {
    const {
      count,
      snowList,
      width,
      height,
      radiusRange,
      horizontalSpeeds,
      fallSpeeds,
      speedRate
    } = this
    for (let i = 0; i < count; i++) {
      snowList.push({
        x: this.getRandom(0, width), // x坐标
        y: this.getRandom(0, height), // y坐标
        r: this.getRandom(radiusRange[0], radiusRange[1]), // 半径
        // 水平方向速度
        vx: this.getRandom(
          horizontalSpeeds[0] / speedRate,
          horizontalSpeeds[1] / speedRate,
          false
        ),
        // 下落速度
        vy: this.getRandom(
          fallSpeeds[0] / speedRate,
          fallSpeeds[1] / speedRate,
          false
        )
      })
    }
  }
  // 绘制雪花
  drawSnow() {
    const { ctx, width, height, snowList } = this
    ctx.clearRect(0, 0, width, height)
    ctx.beginPath()
    snowList.forEach((snow) => {
      ctx.fillStyle = this.color
      ctx.shadowBlur = this.shadowBlur
      ctx.shadowColor = this.shadowColor
      ctx.moveTo(snow.x, snow.y)
      ctx.arc(snow.x, snow.y, snow.r, 0, Math.PI * 2)
    })
    ctx.fill()
    this.setMove()
  }
  // 雪花动画
  setMove() {
    const {
      snowList,
      width,
      radiusRange,
      horizontalSpeeds,
      fallSpeeds,
      speedRate
    } = this
    snowList.forEach((snow) => {
      snow.x += snow.vx
      snow.y += snow.vy
      if (snow.y > this.height || snow.x < 0 || snow.x > this.width) {
        // 超过边界，重新从顶部下落
        snow.x = this.getRandom(0, width)
        snow.y = 0
        snow.r = this.getRandom(radiusRange[0], radiusRange[1])
        snow.vx = this.getRandom(
          horizontalSpeeds[0] / speedRate,
          horizontalSpeeds[1] / speedRate,
          false
        )
        snow.vy = this.getRandom(
          fallSpeeds[0] / speedRate,
          fallSpeeds[1] / speedRate,
          false
        )
      }
    })
    requestAnimationFrame(this.drawSnow.bind(this))
  }
  // 生成随机数
  getRandom(min, max) {
    return Math.random() * (max - min) + min
  }
}
