'use client';

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Assets, Cache } from 'pixi.js';
import { AssetType, atlasArray, skeletonArray, textureArray } from './helpers';

type PreloadingContextType = {
  isPreloadingFinish: boolean;
  atlasArray: AssetType[];
  skeletonArray: AssetType[];
  textureArray: AssetType[];
};

const Context = createContext<PreloadingContextType>({} as PreloadingContextType);

const PreloadingContext = ({ children }: PropsWithChildren) => {
  const [isPreloadingFinish, setIsPreloadingFinish] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadAssets = async () => {
      try {
        const allAssets = [...atlasArray, ...skeletonArray];

        const assetsToLoad = allAssets.filter((asset) => !Cache.has(asset.alias));

        if (assetsToLoad.length > 0) {
          Assets.add(assetsToLoad);

          await Assets.load(assetsToLoad.map((asset) => asset.alias));
        }

        if (mounted) {
          setIsPreloadingFinish(true);
        }
      } catch (error) {
        console.error('Error loading assets:', error);

        if (mounted) {
          setIsPreloadingFinish(true);
        }
      }
    };

    loadAssets();

    return () => {
      mounted = false;
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      isPreloadingFinish,
      atlasArray,
      skeletonArray,
      textureArray,
    }),
    [isPreloadingFinish],
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const usePreloadingContext = () => {
  return useContext(Context);
};

export default PreloadingContext;
