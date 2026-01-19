export type AssetType = {
  alias: string
  src: string
}

export enum ANIMATION_ALIASES {
  SHUFFLE = 'shuffle',
}

export const atlasArray: AssetType[] = [
  {
    alias: 'shuffle_atlas',
    src: '/animations/shuffle/shuffle.atlas',
  },
]

export const skeletonArray: AssetType[] = [
  {
    alias: 'shuffle',
    src: '/animations/shuffle/shuffle.json',
  },
]

export const textureArray: AssetType[] = [
  {
    alias: 'shuffle_texture',
    src: '/animations/shuffle/shuffle.png',
  },
]

