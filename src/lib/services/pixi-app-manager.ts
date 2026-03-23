import { Application } from 'pixi.js'

export class PixiAppManager {
  private static instance: PixiAppManager
  private appInstances = new Map<string, Application>()
  private containerRefs = new Map<string, HTMLDivElement>()

  static getInstance(): PixiAppManager {
    if (!PixiAppManager.instance) {
      PixiAppManager.instance = new PixiAppManager()
    }
    return PixiAppManager.instance
  }

  hasApp(containerId: string): boolean {
    return this.appInstances.has(containerId)
  }

  getApp(containerId: string): Application | undefined {
    return this.appInstances.get(containerId)
  }

  setApp(containerId: string, app: Application, containerRef: HTMLDivElement): void {
    if (this.appInstances.has(containerId)) {
      this.removeApp(containerId)
    }

    this.appInstances.set(containerId, app)
    this.containerRefs.set(containerId, containerRef)
  }

  removeApp(containerId: string): void {
    const app = this.appInstances.get(containerId)
    const container = this.containerRefs.get(containerId)

    if (!app) {
      this.appInstances.delete(containerId)
      this.containerRefs.delete(containerId)
      return
    }

    try {
      // 1. Безопасно получаем canvas / view (Pixi v7 + старые версии)
      const view =
        (app as any)?.canvas ||
        (app as any)?.view ||
        (app as any)?.renderer?.view ||
        null

      // 2. Удаляем canvas из DOM только если он реально есть
      if (view && container && container.contains(view)) {
        container.removeChild(view)
      }

      // 3. Чистим сцену (без повторного destroy)
      if (app.stage && !app.stage.destroyed) {
        app.stage.removeChildren()
      }

      // 4. Отменяем resize listener (если он есть)
      const appAny = app as any
      if (typeof appAny._cancelResize === 'function') {
        try {
          appAny._cancelResize()
        } catch (e) {
          console.warn('[PixiAppManager] cancelResize error:', e)
        }
      }

      // 5. Уничтожаем Pixi App (идемпотентно)
      if (!appAny._destroyed) {
        app.destroy(true)
      }
    } catch (e) {
      console.warn('[PixiAppManager] safe removeApp error:', e)
    } finally {
      // 6. ВСЕГДА чистим ссылки
      this.appInstances.delete(containerId)
      this.containerRefs.delete(containerId)
    }
  }

  getActiveAppsCount(): number {
    return this.appInstances.size
  }

  cleanup(): void {
    Array.from(this.appInstances.keys()).forEach((id) => {
      this.removeApp(id)
    })
  }
}



