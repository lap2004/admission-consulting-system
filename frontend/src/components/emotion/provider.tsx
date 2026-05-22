'use client';

import { CacheProvider } from '@emotion/react';
import { emotionCache } from './cache';
import { ToastContainer } from 'react-toastify';

export function EmotionProvider({ children }: { children: React.ReactNode }) {
    return <CacheProvider value={emotionCache}><ToastContainer /> {children}</CacheProvider>;
}