import { useEffect, useState, useCallback } from 'react';
import { asyncLoader, getCachedModule, ExposedScalprumModule } from '@scalprum/core';

export function useModule(
  scope: string,
  module: string,
  defaultState: any,
  options: {
    skipCache?: boolean;
  } = {}
): ExposedScalprumModule | undefined {
  const defaultOptions = {
    skipCache: false,
    ...options,
  };
  const [data, setData] = useState<ExposedScalprumModule>(defaultState);
  const fetchModule = useCallback(async () => {
    const { cachedModule } = getCachedModule(scope, module, defaultOptions.skipCache);
    let Module: ExposedScalprumModule;
    if (!cachedModule) {
      try {
        Module = await asyncLoader(scope, module);
      } catch {
        console.error(
          `Module not initialized! Module "${module}" was not found in "${scope}" webpack scope. Make sure the remote container is loaded?`
        );
      }
    } else {
      Module = cachedModule;
    }
    setData(() => Module);
  }, [scope, module]);

  useEffect(() => {
    fetchModule();
  }, [scope, module]);

  return data;
}
