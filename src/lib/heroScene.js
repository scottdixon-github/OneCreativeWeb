export const heroScene = {
  vase: { x: null, y: null, radius: 0, active: false },
  pendingImpulse: 0,
}

export function publishVase(x, y, radius) {
  const v = heroScene.vase
  v.x = x
  v.y = y
  v.radius = radius
  v.active = true
}

export function clearVase() {
  heroScene.vase.active = false
}

export function hitVase(impulse) {
  heroScene.pendingImpulse += impulse
}

export function consumeImpulse() {
  const i = heroScene.pendingImpulse
  heroScene.pendingImpulse = 0
  return i
}
