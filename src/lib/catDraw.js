export function furTufts(ctx, cx, cy, rx, ry, color, count, seed, alpha) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.globalAlpha = alpha
  ctx.lineWidth = 1.4
  ctx.lineCap = 'round'
  let s = seed
  const rand = () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2
    const jitter = (rand() - 0.5) * 0.15
    const len = 4 + rand() * 7
    const px = cx + Math.cos(a) * rx
    const py = cy + Math.sin(a) * ry
    ctx.beginPath()
    ctx.moveTo(px, py)
    ctx.lineTo(px + Math.cos(a + jitter) * len, py + Math.sin(a + jitter) * len)
    ctx.stroke()
  }
  ctx.restore()
}

export function fluffyEllipse(ctx, cx, cy, rx, ry, fill, seed) {
  ctx.save()
  ctx.fillStyle = fill
  ctx.beginPath()
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
  ctx.fill()
  furTufts(ctx, cx, cy, rx * 0.96, ry * 0.96, fill, Math.floor((rx + ry) * 0.8), seed, 0.8)
  ctx.restore()
}

export function drawEar(ctx, x, y, angle, outer, inner, twitch) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle + twitch)
  ctx.fillStyle = outer
  ctx.beginPath()
  ctx.moveTo(-13, 0)
  ctx.lineTo(0, -26)
  ctx.lineTo(13, 0)
  ctx.closePath()
  ctx.fill()
  furTufts(ctx, 0, -8, 11, 12, outer, 10, Math.floor(x + y), 0.7)
  ctx.fillStyle = inner
  ctx.beginPath()
  ctx.moveTo(-7, -2)
  ctx.lineTo(0, -18)
  ctx.lineTo(7, -2)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export function drawStripe(ctx, x, y, w, arc, color, alpha) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.globalAlpha = alpha
  ctx.lineWidth = 3.5
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(x - w, y)
  ctx.quadraticCurveTo(x, y + arc, x + w, y)
  ctx.stroke()
  ctx.restore()
}

export function catPalette(isDark) {
  return {
    orange: isDark ? '#e8a15c' : '#f2a65a',
    orangeLight: isDark ? '#f0b57a' : '#f7bd7d',
    stripe: isDark ? '#b06a28' : '#c97a2b',
    cream: isDark ? '#f7ecd9' : '#fdf3e0',
    innerEar: '#ee9f8f',
    pink: '#e8888a',
    amber: isDark ? '#e5b34d' : '#d9a13f',
    dark: '#2b1c10',
  }
}

/**
 * Draws the cat centred at (x, y) in canvas space.
 * All geometry is authored around a ~120px-tall cat at scale 1.
 */
export function drawCatBody(ctx, opts) {
  const {
    x,
    y,
    scale,
    t,
    isDark,
    walkProgress = 1,
    walking = false,
    lookDX = 0,
    lookDY = 0,
    eyesOpen = true,
    earTwitch = 0,
    shadow = true,
    pawReach = 0,
  } = opts

  const { orange, orangeLight, stripe, cream, innerEar, pink, amber, dark } = catPalette(isDark)

  const breathe = 1 + Math.sin(t * 1.8) * 0.018
  const headBob = Math.sin(t * 1.8 + 0.6) * 1.5
  const tailSway = Math.sin(t * 2) * (0.12 + walkProgress * 0.3)
  const tailLift = walking ? Math.sin(t * 1.6 + 1) * walkProgress * 0.5 : 0

  ctx.save()
  ctx.translate(x, y)
  ctx.scale(scale, scale)

  if (shadow) {
    ctx.beginPath()
    ctx.ellipse(0, 62, 58, 10, 0, 0, Math.PI * 2)
    ctx.fillStyle = isDark ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.12)'
    ctx.fill()
  }

  ctx.save()
  ctx.translate(42, 42 - tailLift * 20)
  ctx.rotate(tailSway * 0.5)
  for (let i = 0; i < 7; i++) {
    const a = -0.3 + i * 0.28
    const r = 32 - i * 2.2
    const tx = Math.cos(a + tailSway * (i * 0.1)) * r * 0.55
    const ty = 12 - i * 7 - tailLift * (i * 2.5)
    fluffyEllipse(ctx, tx, ty, 10 - i * 0.6, 8 - i * 0.5, i % 2 === 0 ? orange : stripe, 100 + i)
  }
  ctx.restore()

  fluffyEllipse(ctx, -28, 30, 26, 26 * breathe, orange, 5)
  fluffyEllipse(ctx, 28, 30, 26, 26 * breathe, orange, 9)

  drawStripe(ctx, -34, 18, 9, 10, stripe, 0.55)
  drawStripe(ctx, -36, 30, 8, 9, stripe, 0.5)
  drawStripe(ctx, 34, 18, 9, 10, stripe, 0.55)
  drawStripe(ctx, 36, 30, 8, 9, stripe, 0.5)

  fluffyEllipse(ctx, 0, 8, 26, 34 * breathe, cream, 13)

  const walkFreq = 4 + walkProgress * 10
  const stepAmp = walking ? walkProgress * 8 : 0
  const stepL = Math.sin(t * walkFreq) * stepAmp
  const stepR = Math.sin(t * walkFreq + Math.PI) * stepAmp

  // Left leg/paw with optional pawing reach animation
  const pawL_x = -11 - pawReach * 35
  const pawL_y = 40 + stepL - pawReach * 32
  const pawTipL_x = -12 - pawReach * 46
  const pawTipL_y = 56 + stepR * 0.6 - pawReach * 38

  fluffyEllipse(ctx, pawL_x, pawL_y, 9, 20, orangeLight, 17)
  fluffyEllipse(ctx, 11, 40 + stepR, 9, 20, orangeLight, 21)
  drawStripe(ctx, pawL_x, 30 + stepL - pawReach * 20, 6, 5, stripe, 0.45)
  drawStripe(ctx, 11, 30 + stepR, 6, 5, stripe, 0.45)

  fluffyEllipse(ctx, pawTipL_x, pawTipL_y, 11, 7, cream, 25)
  fluffyEllipse(ctx, 12, 56 + stepL * 0.6, 11, 7, cream, 29)

  ctx.save()
  ctx.translate(0, -48 + headBob)
  ctx.rotate(Math.sin(t * 0.7) * 0.04)

  drawEar(ctx, -22, -18, -0.28, orange, innerEar, earTwitch)
  drawEar(ctx, 22, -18, 0.28, orange, innerEar, 0)

  fluffyEllipse(ctx, 0, 0, 34, 32, orange, 43)

  drawStripe(ctx, 0, -22, 5, 5, stripe, 0.6)
  drawStripe(ctx, -8, -24, 4, 4, stripe, 0.5)
  drawStripe(ctx, 8, -24, 4, 4, stripe, 0.5)
  drawStripe(ctx, -26, -6, 6, 6, stripe, 0.45)
  drawStripe(ctx, 26, -6, 6, 6, stripe, 0.45)

  fluffyEllipse(ctx, 0, 10, 13, 9, cream, 57)

  if (eyesOpen) {
    for (const side of [-1, 1]) {
      ctx.fillStyle = amber
      ctx.beginPath()
      ctx.ellipse(side * 13, -6, 7.5, 7, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = dark
      ctx.beginPath()
      ctx.ellipse(side * 13 + lookDX * 0.85, -6 + lookDY * 0.85, 2, 5.5, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,0.85)'
      ctx.beginPath()
      ctx.arc(side * 13 + lookDX - 2, -8.5 + lookDY, 1.6, 0, Math.PI * 2)
      ctx.fill()
    }
  } else {
    ctx.strokeStyle = dark
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    for (const side of [-1, 1]) {
      ctx.beginPath()
      ctx.arc(side * 13, -8, 6, 0.15 * Math.PI, 0.85 * Math.PI)
      ctx.stroke()
    }
  }

  ctx.fillStyle = pink
  ctx.beginPath()
  ctx.moveTo(0, 5)
  ctx.lineTo(4.5, 9.5)
  ctx.quadraticCurveTo(0, 12, -4.5, 9.5)
  ctx.closePath()
  ctx.fill()

  ctx.strokeStyle = dark
  ctx.lineWidth = 1.6
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(0, 11)
  ctx.quadraticCurveTo(0, 15, -5, 16)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(0, 11)
  ctx.quadraticCurveTo(0, 15, 5, 16)
  ctx.stroke()

  ctx.strokeStyle = isDark ? 'rgba(247, 236, 217, 0.75)' : 'rgba(90, 70, 50, 0.55)'
  ctx.lineWidth = 1
  const whiskerSway = Math.sin(t * 2.2) * 1.5
  for (const side of [-1, 1]) {
    for (let w = 0; w < 3; w++) {
      const wy = 6 + w * 4
      const spread = (w - 1) * 5 + whiskerSway
      ctx.beginPath()
      ctx.moveTo(side * 10, wy)
      ctx.quadraticCurveTo(side * 26, wy + spread * 0.4, side * 40, wy + spread)
      ctx.stroke()
    }
  }

  ctx.fillStyle = 'rgba(244, 114, 182, 0.2)'
  ctx.beginPath()
  ctx.ellipse(-22, 6, 6, 3.5, 0, 0, Math.PI * 2)
  ctx.ellipse(22, 6, 6, 3.5, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
  ctx.restore()
}
