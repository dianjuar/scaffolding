import React from 'react';
import { ScalprumProvider } from '@scalprum/react-core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RuntimeErrorRoute from './routes/RuntimeErrorRoute';
import LegacyModules from './routes/LegacyModules';
import RootLayout from './layouts/RootLayout';
import RootRoute from './routes/RootRoute';
import SDKModules from './routes/SDKModules';
import NotFoundError from './routes/NotFoundError';
import { AppsConfig } from '@scalprum/core';
import UseModuleLoading from './routes/UseModuleLoading';

const config: AppsConfig<{ assetsHost?: string }> = {
  notFound: {
    name: 'notFound',
    manifestLocation: '/assets/testPath/foo/bar/nonsense.json',
    assetsHost: 'http://localhost:8888',
  },
  testApp: {
    name: 'testApp',
    manifestLocation: '/assets/testPath/test-app-fed-mods.json',
  },
  testModule: {
    name: 'testModule',
    manifestLocation: '/assets/testPath/test-module-fed-mods.json',
  },
  preLoad: {
    name: 'preLoad',
    manifestLocation: '/assets/testPath/pre-load-module-fed-mods.json',
  },
  'sdk-plugin': {
    name: 'sdk-plugin',
    manifestLocation: '/plugin-manifest.json',
  },
};

const Entry = () => {
  return (
    <ScalprumProvider
      pluginSDKOptions={{
        pluginLoaderOptions: {
          postProcessManifest(manifest) {
            return {
              ...manifest,
              loadScripts: manifest.loadScripts.map((script) => `${script}`),
            };
          },
        },
      }}
      api={{
        chrome: {
          foo: 'bar',
          isBeta: () => true,
        },
      }}
      config={config}
    >
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<RootRoute />} />
            <Route path="/runtime-error" element={<RuntimeErrorRoute />} />
            <Route path="/not-found-error" element={<NotFoundError />} />
            <Route path="/legacy" element={<LegacyModules />} />
            <Route path="/sdk" element={<SDKModules />} />
            <Route path="/use-module" element={<UseModuleLoading />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ScalprumProvider>
  );
};

export default Entry;
