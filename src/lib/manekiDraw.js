/**
 * Maneki-Neko (Japanese Lucky Cat / 招き猫) Canvas Renderer
 * 
 * Accurately models the iconic white porcelain figurine:
 * - Smooth porcelain white body with warm calico/gold spots
 * - Crimson red collar with shiny 3D golden bell
 * - Rosy pink decorative bib with heart patterns
 * - Large golden Koban coin (千万両) held in left paw
 * - Right arm raised high in a welcoming beckoning wave with red claw accents
 * - Smiling crescent eyes (^_^) with elegant winged lashes
 * - Cute pink nose, red cat smile, and red cheek whiskers
 */

export function drawManekiNeko(ctx, opts) {
  const {
    x = 0,
    y = 0,
    scale = 1,
    t = 0,
    isDark = false,
    lookDX = 0,
    lookDY = 0,
    earTwitch = 0,
    eyesOpen = true,
  } = opts

  ctx.save()
  ctx.translate(x, y)
  ctx.scale(scale, scale)

  // Subtle breathing and idle float
  const breathe = Math.sin(t * 2.2) * 0.015
  const bellJingle = Math.sin(t * 3.5) * 0.08
  const headBob = Math.sin(t * 2.2 + 0.4) * 0.8

  // ── 1. Soft Ambient Ground Shadow ───────────────────────────────────────
  ctx.beginPath()
  ctx.ellipse(0, 70, 56, 12, 0, 0, Math.PI * 2)
  ctx.fillStyle = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.12)'
  ctx.fill()

  // ── 2. Plump Porcelain Body ─────────────────────────────────────────────
  ctx.save()
  const bodyGrad = ctx.createRadialGradient(-8, 22, 12, 0, 28, 62)
  bodyGrad.addColorStop(0, '#ffffff')
  bodyGrad.addColorStop(0.65, '#fbf6f0')
  bodyGrad.addColorStop(0.9, isDark ? '#ded5ca' : '#ebe2d7')
  bodyGrad.addColorStop(1, isDark ? '#c8bdb0' : '#ddd1c2')

  ctx.fillStyle = bodyGrad
  ctx.beginPath()
  ctx.moveTo(-33, 60)
  ctx.bezierCurveTo(-52, 48, -48, -4, -28, -14) // left flank up to neck
  ctx.lineTo(28, -14)                           // neck line
  ctx.bezierCurveTo(48, -4, 52, 48, 33, 60)     // right flank down
  ctx.bezierCurveTo(22, 72, -22, 72, -33, 60)   // bottom rounded seat
  ctx.closePath()
  ctx.fill()

  // Subtle porcelain rim glaze
  ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(215,200,185,0.45)'
  ctx.lineWidth = 1.4
  ctx.stroke()
  ctx.restore()

  // Calico spot on lower left flank (viewer's left)
  ctx.save()
  const flankSpotGrad = ctx.createRadialGradient(-32, 38, 2, -32, 38, 18)
  flankSpotGrad.addColorStop(0, '#c96f18')
  flankSpotGrad.addColorStop(0.6, '#e0882e')
  flankSpotGrad.addColorStop(0.9, '#f4ad5c')
  flankSpotGrad.addColorStop(1, 'rgba(244, 173, 92, 0)')
  ctx.fillStyle = flankSpotGrad
  ctx.beginPath()
  ctx.ellipse(-32, 38, 16, 20, 0.25, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // ── 3. Bottom Sitting Paws ──────────────────────────────────────────────
  const drawFoot = (fx, fy) => {
    ctx.save()
    const footGrad = ctx.createRadialGradient(fx, fy - 2, 2, fx, fy, 11)
    footGrad.addColorStop(0, '#ffffff')
    footGrad.addColorStop(0.8, '#f4eee7')
    footGrad.addColorStop(1, '#dfd5c7')
    ctx.fillStyle = footGrad
    ctx.beginPath()
    ctx.ellipse(fx, fy, 11, 7.5, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = isDark ? 'rgba(180,165,150,0.3)' : 'rgba(190,175,160,0.5)'
    ctx.lineWidth = 1
    ctx.stroke()

    // 3 Red claw slits on paw tips
    ctx.strokeStyle = '#d62828'
    ctx.lineWidth = 1.6
    ctx.lineCap = 'round'
    for (const offset of [-4.5, 0, 4.5]) {
      ctx.beginPath()
      ctx.moveTo(fx + offset, fy + 2)
      ctx.lineTo(fx + offset, fy + 6.5)
      ctx.stroke()
    }
    ctx.restore()
  }
  drawFoot(-19, 65)
  drawFoot(19, 65)

  // ── 4. Golden Koban Coin (Held on Left Side / Viewer's Right) ─────────────
  ctx.save()
  const coinX = 23
  const coinY = 40
  ctx.translate(coinX, coinY)
  ctx.rotate(0.06)

  // Coin shadow on body
  ctx.beginPath()
  ctx.ellipse(-2, 2, 20, 28, 0, 0, Math.PI * 2)
  ctx.fillStyle = isDark ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.12)'
  ctx.fill()

  // Outer gold coin body
  const coinGrad = ctx.createLinearGradient(-18, -26, 18, 26)
  coinGrad.addColorStop(0, '#ffe57f')
  coinGrad.addColorStop(0.2, '#f5ba2a')
  coinGrad.addColorStop(0.5, '#e5a519')
  coinGrad.addColorStop(0.85, '#cc890c')
  coinGrad.addColorStop(1, '#9e6202')

  ctx.fillStyle = coinGrad
  ctx.beginPath()
  ctx.ellipse(0, 0, 19, 27, 0, 0, Math.PI * 2)
  ctx.fill()

  // Embossed gold rim
  ctx.strokeStyle = '#8c5302'
  ctx.lineWidth = 2.2
  ctx.stroke()

  ctx.strokeStyle = '#fff2a8'
  ctx.lineWidth = 1.1
  ctx.beginPath()
  ctx.ellipse(0, 0, 17, 25, 0, 0, Math.PI * 2)
  ctx.stroke()

  // Embossed horizontal ribs (traditional Japanese Koban texture)
  ctx.strokeStyle = '#a86a04'
  ctx.lineWidth = 2
  ctx.lineCap = 'round'
  const ribY = [-20, -15, -10, 10, 15, 20]
  ribY.forEach((ry) => {
    const rx = Math.sqrt(Math.max(0, 1 - (ry / 26) ** 2)) * 14
    ctx.beginPath()
    ctx.moveTo(-rx, ry)
    ctx.lineTo(rx, ry)
    ctx.stroke()
  })

  // Embossed traditional Kanji "千万両" (Sen-man-ryo / 10 Million Gold Coins)
  ctx.strokeStyle = '#734400'
  ctx.fillStyle = '#734400'
  ctx.lineWidth = 1.8
  ctx.lineJoin = 'round'

  // Character '千' (Thousand)
  ctx.beginPath()
  ctx.moveTo(3, -6)
  ctx.lineTo(-4, -4)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(-6, -2)
  ctx.lineTo(6, -2)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(0, -6)
  ctx.lineTo(0, 2)
  ctx.stroke()

  // Character '両' (Ryo)
  ctx.beginPath()
  ctx.moveTo(-6, 4)
  ctx.lineTo(6, 4)
  ctx.stroke()
  ctx.beginPath()
  ctx.strokeRect(-5, 5, 10, 5)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(0, 5)
  ctx.lineTo(0, 10)
  ctx.stroke()

  ctx.restore()

  // ── 5. Cat's Left Arm Clasping the Coin ──────────────────────────────────
  ctx.save()
  // Plump white arm coming from shoulder down onto coin
  const armGrad = ctx.createLinearGradient(34, -4, 18, 22)
  armGrad.addColorStop(0, '#ffffff')
  armGrad.addColorStop(0.8, '#f7f1ea')
  armGrad.addColorStop(1, '#ded3c5')
  ctx.fillStyle = armGrad

  ctx.beginPath()
  ctx.moveTo(27, -8)
  ctx.bezierCurveTo(42, 6, 38, 22, 19, 21) // arm curves down to top of coin
  ctx.bezierCurveTo(15, 15, 18, 8, 22, -2)
  ctx.closePath()
  ctx.fill()
  ctx.strokeStyle = isDark ? 'rgba(180,165,150,0.3)' : 'rgba(190,175,160,0.5)'
  ctx.lineWidth = 1.2
  ctx.stroke()

  // Calico spot on the arm/elbow
  ctx.save()
  const armSpot = ctx.createRadialGradient(34, 12, 1, 34, 12, 9)
  armSpot.addColorStop(0, '#c96f18')
  armSpot.addColorStop(0.7, '#e0882e')
  armSpot.addColorStop(1, 'rgba(244, 173, 92, 0)')
  ctx.fillStyle = armSpot
  ctx.beginPath()
  ctx.ellipse(34, 12, 7, 9, 0.3, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // Rounded paw resting over top of coin with red claw slits
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.ellipse(19, 20, 7.5, 6, -0.2, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#d62828'
  ctx.lineWidth = 1.5
  ctx.lineCap = 'round'
  for (const clawOff of [-2.5, 0.5, 3.5]) {
    ctx.beginPath()
    ctx.moveTo(15 + clawOff, 19)
    ctx.lineTo(13 + clawOff, 23)
    ctx.stroke()
  }
  ctx.restore()

  // ── 6. Pink Decorative Bib (Maekake) ────────────────────────────────────
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(-22, -8)
  ctx.bezierCurveTo(-24, 18, 20, 22, 22, -8) // rounded scalloped bib
  ctx.closePath()
  ctx.fillStyle = '#ffb3c1'
  ctx.fill()
  ctx.strokeStyle = '#f4728f'
  ctx.lineWidth = 1.6
  ctx.stroke()

  // Cute red heart emblems on bib (as shown in reference image)
  const drawHeart = (hx, hy, hscale) => {
    ctx.save()
    ctx.translate(hx, hy)
    ctx.scale(hscale, hscale)
    ctx.fillStyle = '#e63946'
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(-4, -6, -8, -2, -8, 2)
    ctx.bezierCurveTo(-8, 6, -2, 9, 0, 11)
    ctx.bezierCurveTo(2, 9, 8, 6, 8, 2)
    ctx.bezierCurveTo(8, -2, 4, -6, 0, 0)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
  drawHeart(-12, 4, 0.65)
  drawHeart(10, 3, 0.65)
  ctx.restore()

  // ── 7. Red Collar Ribbon ────────────────────────────────────────────────
  ctx.save()
  const collarGrad = ctx.createLinearGradient(0, -17, 0, -5)
  collarGrad.addColorStop(0, '#f94144')
  collarGrad.addColorStop(0.5, '#e63946')
  collarGrad.addColorStop(1, '#a81822')
  ctx.fillStyle = collarGrad
  ctx.beginPath()
  ctx.ellipse(0, -11, 28, 6.2, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#850e17'
  ctx.lineWidth = 1.2
  ctx.stroke()
  ctx.restore()

  // ── 8. Golden Bell (Suzu) Pendant ───────────────────────────────────────
  ctx.save()
  ctx.translate(0, -6 + bellJingle * 2)
  ctx.rotate(bellJingle)

  // Bell shadow
  ctx.beginPath()
  ctx.ellipse(0, 3, 8.5, 3, 0, 0, Math.PI * 2)
  ctx.fillStyle = isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.18)'
  ctx.fill()

  // Golden sphere
  const bellGrad = ctx.createRadialGradient(-3, -3, 1, 0, 0, 8.5)
  bellGrad.addColorStop(0, '#fff4b8')
  bellGrad.addColorStop(0.35, '#f5c542')
  bellGrad.addColorStop(0.8, '#d89b14')
  bellGrad.addColorStop(1, '#8c5903')
  ctx.fillStyle = bellGrad
  ctx.beginPath()
  ctx.arc(0, 0, 8.5, 0, Math.PI * 2)
  ctx.fill()

  // Bell horizontal slit and bottom cutout
  ctx.strokeStyle = '#5a3800'
  ctx.lineWidth = 1.3
  ctx.beginPath()
  ctx.moveTo(-7.5, 1)
  ctx.lineTo(7.5, 1)
  ctx.stroke()

  ctx.fillStyle = '#5a3800'
  ctx.beginPath()
  ctx.arc(0, 3.2, 1.4, 0, Math.PI * 2)
  ctx.fill()

  // Golden shine glint
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
  ctx.beginPath()
  ctx.ellipse(-3, -3.5, 2.5, 1.5, -0.6, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // ── 9. Porcelain Head ───────────────────────────────────────────────────
  ctx.save()
  ctx.translate(0, -42 + headBob)
  ctx.rotate(lookDX * 0.02)

  // Head shape
  const headGrad = ctx.createRadialGradient(-8, -10, 10, 0, 0, 42)
  headGrad.addColorStop(0, '#ffffff')
  headGrad.addColorStop(0.7, '#fcf7f1')
  headGrad.addColorStop(0.92, isDark ? '#ded5ca' : '#ebe2d7')
  headGrad.addColorStop(1, isDark ? '#c8bdb0' : '#ddd1c2')

  ctx.fillStyle = headGrad
  ctx.beginPath()
  ctx.ellipse(0, 0, 37, 31, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(215,200,185,0.45)'
  ctx.lineWidth = 1.3
  ctx.stroke()

  // Calico spot on forehead / right ear base
  ctx.save()
  const headSpot = ctx.createRadialGradient(14, -20, 2, 14, -20, 18)
  headSpot.addColorStop(0, '#c96f18')
  headSpot.addColorStop(0.65, '#e0882e')
  headSpot.addColorStop(0.95, '#f4ad5c')
  headSpot.addColorStop(1, 'rgba(244, 173, 92, 0)')
  ctx.fillStyle = headSpot
  ctx.beginPath()
  ctx.ellipse(14, -20, 16, 11, -0.3, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // ── 10. Cute Rounded Ears ───────────────────────────────────────────────
  const drawManekiEar = (side, twitch) => {
    ctx.save()
    ctx.translate(side * 23, -20)
    ctx.rotate(side * 0.28 + twitch)

    // Outer ear
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.moveTo(-11, 0)
    ctx.quadraticCurveTo(-7, -24, 0, -26)
    ctx.quadraticCurveTo(7, -24, 11, 0)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = isDark ? 'rgba(210,195,180,0.3)' : 'rgba(210,195,180,0.5)'
    ctx.lineWidth = 1
    ctx.stroke()

    // Inner pink ear
    const innerEarGrad = ctx.createLinearGradient(0, 0, 0, -22)
    innerEarGrad.addColorStop(0, '#fecdd3')
    innerEarGrad.addColorStop(0.7, '#fb7185')
    innerEarGrad.addColorStop(1, '#e11d48')
    ctx.fillStyle = innerEarGrad
    ctx.beginPath()
    ctx.moveTo(-6, -2)
    ctx.quadraticCurveTo(-4, -18, 0, -20)
    ctx.quadraticCurveTo(4, -18, 6, -2)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  drawManekiEar(-1, earTwitch) // Left ear
  drawManekiEar(1, 0)          // Right ear

  // ── 11. Joyful Smiling Face Features ────────────────────────────────────
  // Rosy cheek blush
  ctx.fillStyle = 'rgba(255, 110, 140, 0.25)'
  ctx.beginPath()
  ctx.ellipse(-20, 4, 7, 4, 0, 0, Math.PI * 2)
  ctx.ellipse(20, 4, 7, 4, 0, 0, Math.PI * 2)
  ctx.fill()

  // Smiling Eyes (^_^) with elegant winged lashes (from reference photo!)
  ctx.strokeStyle = '#1f130e'
  ctx.lineWidth = 2.6
  ctx.lineCap = 'round'

  // Left Eye (viewer's left)
  ctx.beginPath()
  ctx.arc(-15, -4, 8, 1.15 * Math.PI, 1.85 * Math.PI) // crescent arc
  ctx.stroke()
  // 2 Winged eyelashes sweeping up-left
  ctx.lineWidth = 2.1
  ctx.beginPath()
  ctx.moveTo(-21, -8)
  ctx.quadraticCurveTo(-26, -11, -28, -10)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(-20, -5)
  ctx.quadraticCurveTo(-24, -6, -27, -5)
  ctx.stroke()

  // Right Eye (viewer's right)
  ctx.lineWidth = 2.6
  ctx.beginPath()
  ctx.arc(15, -4, 8, 1.15 * Math.PI, 1.85 * Math.PI)
  ctx.stroke()
  // 2 Winged eyelashes sweeping up-right
  ctx.lineWidth = 2.1
  ctx.beginPath()
  ctx.moveTo(21, -8)
  ctx.quadraticCurveTo(26, -11, 28, -10)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(20, -5)
  ctx.quadraticCurveTo(24, -6, 27, -5)
  ctx.stroke()

  // Dainty pink nose
  ctx.fillStyle = '#e63946'
  ctx.beginPath()
  ctx.moveTo(0, 1)
  ctx.lineTo(3.2, 4.5)
  ctx.quadraticCurveTo(0, 6, -3.2, 4.5)
  ctx.closePath()
  ctx.fill()

  // Cheerful Cat Smile (ω) in warm crimson
  ctx.strokeStyle = '#c1121f'
  ctx.lineWidth = 2
  ctx.lineCap = 'round'
  // Left curve
  ctx.beginPath()
  ctx.moveTo(0, 5.5)
  ctx.quadraticCurveTo(-5, 11, -10, 8.5)
  ctx.stroke()
  // Right curve
  ctx.beginPath()
  ctx.moveTo(0, 5.5)
  ctx.quadraticCurveTo(5, 11, 10, 8.5)
  ctx.stroke()

  // 3 Fine Red Whisker Strokes on Each Cheek
  ctx.strokeStyle = '#d62828'
  ctx.lineWidth = 1.3
  ctx.lineCap = 'round'
  const whiskerAngles = [-0.18, 0, 0.18]
  whiskerAngles.forEach((ang, idx) => {
    const wy = 4 + idx * 4.5
    // Left cheek
    ctx.beginPath()
    ctx.moveTo(-20, wy)
    ctx.lineTo(-33, wy + ang * 16)
    ctx.stroke()
    // Right cheek
    ctx.beginPath()
    ctx.moveTo(20, wy)
    ctx.lineTo(33, wy + ang * 16)
    ctx.stroke()
  })

  ctx.restore() // Restore head

  // ── 12. Iconic Raised Beckoning Waving Paw (Viewer's Left / Cat's Right) ──
  // Traditional Maneki-Neko beckoning motion:
  // Pivots smoothly forward and back, welcoming good luck & visitors!
  const waveCycle = Math.sin(t * 3.6)
  const waveAngle = waveCycle * 0.22      // ~13 degrees waving oscillation
  const pawFlex = Math.sin(t * 3.6 + 0.3) * 0.15

  const shoulderX = -26
  const shoulderY = -12

  ctx.save()
  ctx.translate(shoulderX, shoulderY)
  // Arm raised high up beside head (angle pointing up-left)
  ctx.rotate(2.35 + waveAngle * 0.4)

  // Upper arm extending from shoulder up-left
  const upperArmGrad = ctx.createLinearGradient(-10, 0, 10, 22)
  upperArmGrad.addColorStop(0, '#ffffff')
  upperArmGrad.addColorStop(0.75, '#f5eee5')
  upperArmGrad.addColorStop(1, '#ddd1c0')
  ctx.fillStyle = upperArmGrad

  ctx.beginPath()
  ctx.ellipse(0, 11, 10.5, 15, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = isDark ? 'rgba(210,195,180,0.3)' : 'rgba(200,185,170,0.45)'
  ctx.lineWidth = 1.1
  ctx.stroke()

  // Golden calico spot on the waving arm (matching reference photo!)
  ctx.save()
  const wavingSpot = ctx.createRadialGradient(-1, 11, 1, -1, 11, 9)
  wavingSpot.addColorStop(0, '#c96f18')
  wavingSpot.addColorStop(0.65, '#e0882e')
  wavingSpot.addColorStop(1, 'rgba(244, 173, 92, 0)')
  ctx.fillStyle = wavingSpot
  ctx.beginPath()
  ctx.ellipse(-1, 11, 7.5, 9.5, 0.15, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // Elbow to Forearm joint
  ctx.translate(0, 20)
  ctx.rotate(0.55 + waveAngle + pawFlex)

  // Forearm extending upward towards paw
  ctx.fillStyle = upperArmGrad
  ctx.beginPath()
  ctx.ellipse(0, 8, 9.5, 12, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = isDark ? 'rgba(210,195,180,0.3)' : 'rgba(200,185,170,0.45)'
  ctx.lineWidth = 1.1
  ctx.stroke()

  // Wrist to Paw
  ctx.translate(0, 16)
  ctx.rotate(pawFlex * 0.8)

  // Front-facing rounded porcelain paw
  const pawGrad = ctx.createRadialGradient(0, -2, 2, 0, 0, 11)
  pawGrad.addColorStop(0, '#ffffff')
  pawGrad.addColorStop(0.8, '#f7f1ea')
  pawGrad.addColorStop(1, '#e3d7c9')
  ctx.fillStyle = pawGrad
  ctx.beginPath()
  ctx.ellipse(0, 0, 11, 10, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = isDark ? 'rgba(210,195,180,0.3)' : 'rgba(200,185,170,0.45)'
  ctx.lineWidth = 1.1
  ctx.stroke()

  // 4 Red claw marks on the top of the waving paw (exact match to reference photo!)
  ctx.strokeStyle = '#d62828'
  ctx.lineWidth = 1.8
  ctx.lineCap = 'round'
  const clawOffsets = [-6, -2, 2, 6]
  clawOffsets.forEach((co) => {
    ctx.beginPath()
    ctx.moveTo(co, -4.5)
    ctx.lineTo(co, -9)
    ctx.stroke()
  })

  ctx.restore() // Restore waving arm

  ctx.restore() // Restore whole Maneki-Neko
}
