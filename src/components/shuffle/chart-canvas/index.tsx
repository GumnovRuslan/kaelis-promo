'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Application, Container, Sprite, Assets, Texture } from 'pixi.js'
import { Spine } from '@pixi/spine-pixi'
import { shuffleActions, useAppDispatch, useAppSelector } from '@/store'
import { PixiAppManager } from '@/lib/services/pixi-app-manager'
import { usePreloadingContext } from '@/contexts/animation'
import { ANIMATION_ALIASES } from '@/contexts/animation/helpers'
import { ChartCanvasProps, CardInfo } from './types'
import styles from './styles.module.scss'

const MIN_CARD_WIDTH = 60
const MIN_CARD_HEIGHT = 110
const CARD_PADDING = 20

export const ChartCanvas = ({ matrix, cards }: ChartCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<Application | null>(null)
  const cardsContainerRef = useRef<Container | null>(null)
  const [selectedCard, setSelectedCard] = useState<CardInfo | null>(null)
  const [showCards, setShowCards] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isAppReady, setIsAppReady] = useState(false)
  const [isCardsLoading, setIsCardsLoading] = useState(true)
  const [shufflePosition, setShufflePosition] = useState({ x: 0, y: 0 })
  const isFirstAnimationDone = useAppSelector(state => state.shuffle.isFirstAnimationDone)
  const dispatch = useAppDispatch()
  const containerIdRef = useRef<string>('')
  const shuffleRef = useRef<Spine | null>(null)
  const reading = useAppSelector(state => state.shuffle.response?.reading)
  const { atlasArray, skeletonArray, isPreloadingFinish } = usePreloadingContext()

  useEffect(() => {
    if (containerRef.current && !containerIdRef.current) {
      containerIdRef.current = `chart-canvas-${Date.now()}-${Math.random().toString(36)}`
    }
  }, [])

  const calculateMaxCoordinates = useCallback(() => {
    let maxX = 0
    let maxY = 0
    let minX = 0
    let minY = 0

    matrix.forEach((cardPos) => {
      const cardPosX = cardPos.x * (MIN_CARD_WIDTH + CARD_PADDING)
      const cardPosY = cardPos.y * (MIN_CARD_HEIGHT + CARD_PADDING)

      maxX = Math.max(maxX, cardPosX)
      maxY = Math.max(maxY, cardPosY)
      minX = Math.min(minX, cardPosX)
      minY = Math.min(minY, cardPosY)
    })
    return { maxX, maxY, minX, minY }
  }, [matrix])

  const calculateOptimalView = useCallback(() => {
    if (!containerRef.current) return { scale: 1, offsetX: 0, offsetY: 0 }

    const containerWidth = containerRef.current.clientWidth
    const containerHeight = containerRef.current.clientHeight

    const { maxX, maxY, minX, minY } = calculateMaxCoordinates()

    const totalWidth = maxX - minX + MIN_CARD_WIDTH
    const totalHeight = maxY - minY + MIN_CARD_HEIGHT

    const padding = 40
    const scaleX = (containerWidth - padding) / totalWidth
    const scaleY = (containerHeight - padding) / totalHeight
    const optimalScale = Math.min(scaleX, scaleY, 1)

    const centerX = containerWidth / 2
    const centerY = containerHeight / 2
    const spreadCenterX = (maxX + minX) / 2
    const spreadCenterY = (maxY + minY) / 2

    const offsetX = centerX - spreadCenterX * optimalScale
    const offsetY = centerY - spreadCenterY * optimalScale

    return { scale: optimalScale, offsetX, offsetY }
  }, [calculateMaxCoordinates])

  const initPixiApp = useCallback(async () => {
    if (!containerRef.current || !containerIdRef.current) return
    if (appRef.current) return

    const pixiManager = PixiAppManager.getInstance()

    if (pixiManager.hasApp(containerIdRef.current)) {
      const existingApp = pixiManager.getApp(containerIdRef.current)
      if (existingApp) {
        appRef.current = existingApp
        setIsAppReady(true)
        return
      }
    }

    if (containerRef.current.children.length > 0) {
      containerRef.current.innerHTML = ''
    }

    const app = new Application()
    await app.init({
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      backgroundAlpha: 0,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    })

    const cardsC = new Container()
    cardsC.label = 'cardsContainer'
    cardsC.visible = false
    app.stage.addChild(cardsC)

    containerRef.current.appendChild((app as any).canvas || (app as any).view)
    appRef.current = app
    cardsContainerRef.current = cardsC

    pixiManager.setApp(containerIdRef.current, app, containerRef.current)

    setIsAppReady(true)
  }, [])

  const getCardPosition = useCallback((x: number, y: number) => {
    const cardPosX = x * (MIN_CARD_WIDTH + CARD_PADDING)
    const cardPosY = y * (MIN_CARD_HEIGHT + CARD_PADDING)
    return { x: cardPosX, y: cardPosY }
  }, [])

  const createCard = useCallback(async (cardKey: string) => {
    if (!cardsContainerRef.current) return

    const cardGraphics = new Container()

    try {
      const cardData = cards[cardKey]
      if (!cardData) {
        throw new Error(`Card data not found for key: ${cardKey}`)
      }

      const cardTexture = await Assets.load(cardData.image)
      const backTexture = Texture.WHITE

      const cardSprite = new Sprite(cardTexture)
      const backSprite = new Sprite(backTexture)

      const scaleX = MIN_CARD_WIDTH / cardTexture.width
      const scaleY = MIN_CARD_HEIGHT / cardTexture.height
      const scale = Math.min(scaleX, scaleY)

      cardSprite.scale.set(scale)
      backSprite.width = MIN_CARD_WIDTH
      backSprite.height = MIN_CARD_HEIGHT
      backSprite.tint = 0x4A4A4A

      cardSprite.anchor.set(0.5)
      backSprite.anchor.set(0.5)

      cardGraphics.addChild(backSprite)
      cardGraphics.addChild(cardSprite)

      cardSprite.visible = false

      cardsContainerRef.current.addChild(cardGraphics)

      const handleClickOnCard = () => {
        const selectedCard = reading?.cards?.find(card => card.position.toString() == cardKey)

        setSelectedCard({
          image: cardData.image,
          label: selectedCard?.label || '',
          description: selectedCard?.description || ''
        })
      }

      cardSprite.eventMode = 'static'
      cardSprite.cursor = 'pointer'
      cardSprite.on('pointertap', handleClickOnCard)

      return { container: cardGraphics, front: cardSprite, back: backSprite }
    } catch (error) {
      const cardSprite = new Sprite(Texture.WHITE)
      const backSprite = new Sprite(Texture.WHITE)

      cardSprite.width = MIN_CARD_WIDTH
      cardSprite.height = MIN_CARD_HEIGHT
      cardSprite.tint = 0x8B4513
      backSprite.width = MIN_CARD_WIDTH
      backSprite.height = MIN_CARD_HEIGHT
      backSprite.tint = 0x4A4A4A

      cardGraphics.addChild(backSprite)
      cardGraphics.addChild(cardSprite)

      cardSprite.visible = false

      cardsContainerRef.current.addChild(cardGraphics)
      return { container: cardGraphics, front: cardSprite, back: backSprite }
    }
  }, [cards, reading])

  const createAllCards = useCallback(async () => {
    if (!cardsContainerRef.current) return

    if (!isFirstAnimationDone) {
      return
    }

    await new Promise(resolve => setTimeout(resolve, 100))

    cardsContainerRef.current.visible = true
    cardsContainerRef.current.alpha = 0
    cardsContainerRef.current.removeChildren()

    const { scale, offsetX, offsetY } = calculateOptimalView()

    cardsContainerRef.current.scale.set(scale)
    cardsContainerRef.current.position.x = offsetX
    cardsContainerRef.current.position.y = offsetY

    const containerWidth = appRef.current?.screen.width || 800
    const containerHeight = appRef.current?.screen.height || 800
    const startX = containerWidth / 2 - 90
    const startY = containerHeight / 2 + 75

    const fadeInDuration = 500
    const fadeInStartTime = Date.now()

    const fadeIn = () => {
      const elapsed = Date.now() - fadeInStartTime
      const progress = Math.min(elapsed / fadeInDuration, 1)

      if (cardsContainerRef.current) {
        cardsContainerRef.current.alpha = progress
      }

      if (progress < 1) {
        requestAnimationFrame(fadeIn)
      }
    }

    const startCardCreation = () => {
      requestAnimationFrame(fadeIn)

      for (let index = 0; index < matrix.length; index++) {
        const cardKeys = Object.keys(cards)
        const cardKey = cardKeys[index] || index.toString()

        createCard(cardKey).then((cardData) => {
          if (cardData) {
            const { container, front, back } = cardData

            container.position.x = containerWidth / 2 + 85
            container.position.y = (containerHeight - 75) / 2

            container.alpha = 0
            front.visible = false
            back.visible = true

            const delayPerCard = 300
            setTimeout(() => {
              const fadeInStart = Date.now()
              const fadeInDuration = 500

              const fadeInCard = () => {
                const elapsed = Date.now() - fadeInStart
                const progress = Math.min(elapsed / fadeInDuration, 1)

                container.alpha = progress

                if (progress < 1) {
                  requestAnimationFrame(fadeInCard)
                }
              }

              requestAnimationFrame(fadeInCard)
            }, delayPerCard * index)
          }
        })
      }

      setTimeout(() => {
      const startTime = Date.now()
      const moveDuration = 400
      const flipDelay = 200

      const animateAllCards = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / moveDuration, 1)

        const easeOut = 1 - Math.pow(1 - progress, 3)

        if (cardsContainerRef.current) {
          cardsContainerRef.current.children.forEach((container, index) => {
            const cardPos = matrix[index]
            const finalPosition = getCardPosition(cardPos.x, cardPos.y)

            container.position.x = startX + (finalPosition.x - startX) * easeOut
            container.position.y = startY + (finalPosition.y - startY) * easeOut
          })
        }

        if (progress < 1) {
          requestAnimationFrame(animateAllCards)
        } else {
          setTimeout(() => {
            const flipStartTime = Date.now()
            const flipDuration = 1000

            const animateAllFlips = () => {
              const flipElapsed = Date.now() - flipStartTime
              const flipProgress = Math.min(flipElapsed / flipDuration, 1)

              const flipEase = 1 - Math.pow(1 - flipProgress, 3)

              if (cardsContainerRef.current) {
                cardsContainerRef.current.children.forEach((container) => {
                  const scaleX = 1.2 - flipEase * 0.4
                  container.scale.x = scaleX

                  if (flipProgress >= 0.5) {
                    const front = container.children[1]
                    const back = container.children[0]
                    if (front && back) {
                      front.visible = true
                      back.visible = false
                    }
                  }
                })
              }

              if (flipProgress < 1) {
                requestAnimationFrame(animateAllFlips)
              } else {
                if (cardsContainerRef.current) {
                  cardsContainerRef.current.children.forEach((container) => {
                    container.scale.x = 1
                  })
                }
              }
            }

            requestAnimationFrame(animateAllFlips)
          }, flipDelay)
        }
      }

      requestAnimationFrame(animateAllCards)
    }, 250)
    }

    startCardCreation()
  }, [matrix, createCard, getCardPosition, calculateOptimalView, isFirstAnimationDone, dispatch, shufflePosition, cards])

  const loadShuffle = useCallback(async (retryCount = 0) => {
    if (retryCount > 5) {
      console.warn('Max retry attempts reached for shuffle animation')
      return
    }

    if (!skeletonArray || !atlasArray || skeletonArray.length === 0 || atlasArray.length === 0) {
      console.warn('Skeleton or atlas arrays are not ready')
      return
    }

    if (!appRef.current || shuffleRef.current) {
      return
    }

    if (!appRef.current.stage || !appRef.current.renderer) {
      console.warn('PIXI app is not fully initialized yet')
      return
    }

    const skeletonItem = skeletonArray.find(item => item.alias === 'shuffle')
    const atlasItem = atlasArray.find(item => item.alias === 'shuffle_atlas')

    if (!skeletonItem || !atlasItem) {
      console.warn('Required skeleton or atlas not found for shuffle animation')
      return
    }

    const skeletonAlias = skeletonItem.alias
    const atlasAlias = atlasItem.alias

    if (!skeletonAlias || !atlasAlias) {
      console.warn('Skeleton or atlas aliases are undefined')
      return
    }

    try {
      if (!skeletonAlias || !atlasAlias) {
        console.warn('Skeleton or atlas aliases are not ready yet, retrying in 100ms')
        setTimeout(() => {
          if (!shuffleRef.current) {
            loadShuffle(retryCount + 1)
          }
        }, 100)
        return
      }

      const preloadCards = async () => {
        if (!cards) return

        const cardKeys = Object.keys(cards)
        const preloadPromises = cardKeys.map(async (cardKey) => {
          try {
            const cardData = cards[cardKey]
            if (cardData?.image) {
              await Assets.load(cardData.image)
            }
          } catch (error) {
            console.warn(`Failed to preload card ${cardKey}:`, error)
          }
        })

        await Promise.all(preloadPromises)
        setIsCardsLoading(false)
      }

      preloadCards()

      const { scale } = calculateOptimalView()

      if (!skeletonAlias || !atlasAlias) return

      const spine = Spine.from({
        skeleton: skeletonAlias,
        atlas: atlasAlias,
        scale: scale,
      })

      shuffleRef.current = spine

      const startTime = Date.now()
      const duration = 1000

      const animateZoomOut = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        if (shuffleRef.current) {
          shuffleRef.current.scale.set(scale * progress)
        }

        if (progress < 1) {
          requestAnimationFrame(animateZoomOut)
        }
      }

      if (shuffleRef.current && shuffleRef.current.skeleton) {
        if (appRef.current) {
          const shuffleX = appRef.current.screen.width / 2
          const shuffleY = appRef.current.screen.height / 2
          shuffleRef.current.x = shuffleX
          shuffleRef.current.y = shuffleY
          setShufflePosition({
            x: shuffleX,
            y: shuffleY
          })
        }

        shuffleRef.current.skeleton.setSlotsToSetupPose()
        shuffleRef.current.visible = true

        if (appRef.current?.stage) {
          appRef.current.stage.addChild(shuffleRef.current)

          if (shuffleRef.current.state) {
            shuffleRef.current.state.setAnimation(0, 'animation3', false)

            const animationDuration = 2900

            setTimeout(() => {
              dispatch(shuffleActions.setIsFirstAnimationDone(true))
            }, animationDuration)
          }
        }
      }
    } catch (error) {
      console.error('Error creating spine animation:', error)

      if (cards) {
        const preloadCards = async () => {
          const cardKeys = Object.keys(cards)
          const preloadPromises = cardKeys.map(async (cardKey) => {
            try {
              const cardData = cards[cardKey]
              if (cardData?.image) {
                await Assets.load(cardData.image)
              }
            } catch (error) {
              console.warn(`Failed to preload card ${cardKey}:`, error)
            }
          })

          await Promise.all(preloadPromises)
          setIsCardsLoading(false)
        }
        preloadCards()
      }
    }
  }, [skeletonArray, atlasArray, dispatch, cards, calculateOptimalView])

  useEffect(() => {
    if (!isAppReady) {
      const initializeApp = async () => {
        await initPixiApp()
      }
      initializeApp()
    }
  }, [isAppReady, initPixiApp])

  useEffect(() => {
    setShowCards(false)
    setIsCardsLoading(true)
    setIsAppReady(false)

    const initializeApp = async () => {
      await initPixiApp()
    }
    initializeApp()
  }, [matrix, cards, initPixiApp])

  useEffect(() => {
    if (isPreloadingFinish && isAppReady && !isFirstAnimationDone && !shuffleRef.current) {
      const timeout = setTimeout(() => {
        if (!shuffleRef.current) {
          loadShuffle(0)
        }
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [isPreloadingFinish, isAppReady, isFirstAnimationDone, loadShuffle])

  useEffect(() => {
    if (isFirstAnimationDone && shuffleRef.current && appRef.current?.stage) {
      const fadeOutDuration = 250
      const startTime = Date.now()

      const fadeOut = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / fadeOutDuration, 1)

        if (shuffleRef.current) {
          shuffleRef.current.alpha = 1 - progress
        }

        if (progress < 1) {
          requestAnimationFrame(fadeOut)
        } else {
          if (shuffleRef.current && appRef.current?.stage) {
            appRef.current.stage.removeChild(shuffleRef.current)
            shuffleRef.current.destroy()
            shuffleRef.current = null
          }
        }
      }

      requestAnimationFrame(fadeOut)
    }
  }, [isFirstAnimationDone])

  useEffect(() => {
    if (isAppReady && matrix.length > 0 && !isCardsLoading && !showCards) {
      if (!isFirstAnimationDone) {
        return
      }
      
      const checkShuffleRemoved = () => {
        if (shuffleRef.current) {
          setTimeout(checkShuffleRemoved, 50)
          return
        }
        
        const delayAfterShuffle = 200
        setTimeout(async () => {
          await createAllCards()
          setShowCards(true)
        }, delayAfterShuffle)
      }
      
      checkShuffleRemoved()
    }
  }, [isFirstAnimationDone, matrix, createAllCards, isCardsLoading, showCards, isAppReady])

  useEffect(() => {
    const handleResize = () => {
      if (appRef.current && containerRef.current) {
        appRef.current.renderer.resize(
          containerRef.current.clientWidth,
          containerRef.current.clientHeight
        )
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    return () => {
      if (shuffleRef.current) {
        try {
          if (appRef.current?.stage) {
            appRef.current.stage.removeChild(shuffleRef.current)
          }
          shuffleRef.current.destroy()
          shuffleRef.current = null
        } catch (e) {
          console.error(e)
        }
      }

      if (appRef.current) {
        try {
          appRef.current.stage.removeChildren()
          appRef.current.destroy()
        } catch (err) {
          console.error('Error destroying Pixi app', err)
        }
        appRef.current = null
      }
      cardsContainerRef.current = null
      shuffleRef.current = null
      setShowCards(false)
    }
  }, [])

  const handleCloseCard = () => {
    setSelectedCard(null)
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${isDragging ? styles.dragging : styles.grab}`}
      onMouseDown={(e) => {
        setIsDragging(true)
        if (cardsContainerRef.current) {
          setDragStart({
            x: e.clientX - cardsContainerRef.current.position.x,
            y: e.clientY - cardsContainerRef.current.position.y
          })
        }
      }}
      onMouseMove={(e) => {
        if (isDragging && cardsContainerRef.current) {
          const newX = e.clientX - dragStart.x
          const newY = e.clientY - dragStart.y
          cardsContainerRef.current.position.set(newX, newY)
        }
      }}
      onMouseUp={() => {
        setIsDragging(false)
      }}
      onMouseLeave={() => {
        setIsDragging(false)
      }}
      style={{
        touchAction: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
      }}
    >
      {selectedCard && (
        <div className={styles.modal} onClick={handleCloseCard}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.close} onClick={handleCloseCard}>X</button>
            <img src={selectedCard.image} alt={selectedCard.label} />
            <h3>{selectedCard.label}</h3>
            <p>{selectedCard.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

