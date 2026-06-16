/**
 * Router utility for handling paths with Vite base configuration
 */

const BASE_PATH = '/Karlancer/';

export function getBasePath() {
    return BASE_PATH;
}

export function resolveRoute(path) {
    // Remove leading ./ if present
    let cleanPath = path.startsWith('./') ? path.slice(2) : path;
    
    // Build full path with base
    return BASE_PATH + cleanPath;
}

export function resolveAsset(assetPath) {
    // For public assets (images, fonts, etc.)
    let cleanPath = assetPath.startsWith('./') ? assetPath.slice(2) : assetPath;
    cleanPath = cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath;
    return BASE_PATH + cleanPath;
}

// Fix all navigation links on page load
export function fixNavigation() {
    document.querySelectorAll('a[href^="./"]').forEach(link => {
        const href = link.getAttribute('href');
        link.setAttribute('href', resolveRoute(href));
    });
}

// Fix all image sources
export function fixAssets() {
    document.querySelectorAll('img[src^="./public"]').forEach(img => {
        const src = img.getAttribute('src');
        img.setAttribute('src', resolveAsset(src));
    });
    
    // Fix SVG sources in image tags
    document.querySelectorAll('img[src*=".svg"]').forEach(img => {
        const src = img.getAttribute('src');
        if (!src.startsWith('http') && !src.startsWith('/Karlancer')) {
            img.setAttribute('src', resolveAsset(src));
        }
    });
}

// Initialize router on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        fixNavigation();
        fixAssets();
    });
} else {
    fixNavigation();
    fixAssets();
}

export default {
    getBasePath,
    resolveRoute,
    resolveAsset,
    fixNavigation,
    fixAssets
};
