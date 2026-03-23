import { Container, Sprite} from 'pixi.js'

export const flipCardPerspective = (
  container: Container,
  front: Sprite,
  back: Sprite,
  duration = 600,
  maxSkew = 0.15
) => {
  const start = performance.now()
  const half = duration / 2

  front.visible = false
  back.visible = true

  const animate = (now: number) => {
    const elapsed = now - start

    let progress, ease

    if (elapsed < half) {
      progress = elapsed / half
      ease = 1 - Math.pow(1 - progress, 3)
      container.scale.x = 1 - ease
    } else {
      if (!front.visible) {
        front.visible = true
        back.visible = false
      }
      progress = (elapsed - half) / half
      ease = Math.pow(progress, 3)
      container.scale.x = ease
    }

    // 3D эффект: легкий наклон
    container.skew.y = Math.sin(progress * Math.PI) * maxSkew

    if (elapsed < duration) {
      requestAnimationFrame(animate)
    } else {
      container.scale.x = 1
      container.skew.y = 0
    }
  }

  requestAnimationFrame(animate)
}