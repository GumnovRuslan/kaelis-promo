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
    
    if (app) {
      try {
        const canvas = (app as any).canvas || (app as any)?.view
        
        if (canvas && container && container.contains(canvas)) {
          container.removeChild(canvas)
        }
        
        if (app.stage) {
          app.stage.destroy({ children: true })
        }
        
        if ((app as any)._destroyed) {
          return
        }
        
        const appAny = app as any
        if (appAny._cancelResize && typeof appAny._cancelResize === 'function') {
          try {
            appAny._cancelResize()
          } catch (e) {
            console.warn('Error canceling resize:', e)
          }
        }
        
        app.destroy({
          removeView: false
        })
      } catch (e) {
        console.error('Error destroying PIXI app:', e)
      } finally {
        this.appInstances.delete(containerId)
        this.containerRefs.delete(containerId)
      }
    }
  }

  getActiveAppsCount(): number {
    return this.appInstances.size
  }

  cleanup(): void {
    this.appInstances.forEach((app, id) => {
      this.removeApp(id)
    })
  }
}


