"use strict";
(() => {
    // Number of images in the images/ directory, change if adding more images
    const numImages = 98;
    // See whether overlays are even enabled
    chrome.storage.local.get(['overlayEnabled'], (result) => {
        // Result is an object that contains the data retrieved from chrome.storage.local.get
        // OverlayEnabled is an attribute of result
        const enabled = result.overlayEnabled !== false; // default to true if not set
        const opacity = enabled ? '1' : '0';
        // Get all YouTube thumbnails
        function getThumbnails() {
            // Update YouTube thumbnail getting, works with TS now
            const thumbnails = document.querySelectorAll("yt-thumbnail-view-model img.ytCoreImageHost, .ytp-videowall-still-image:not([style*='extension:'])");
            // For each image in the thumbnails array (which is thumbnail), get its image index, its base url, and then send it to 
            // apply thumbnails for a merge
            thumbnails.forEach((thumbnail) => {
                const index = getRandomImageIndex();
                // Get the URL of the random image
                let OverlayUrl = getOverlayUrl(index);
                if (!(thumbnail instanceof HTMLElement))
                    return;
                changeThumbnail(thumbnail, OverlayUrl);
            });
        }
        // Apply new (and improved) thumbnails
        function changeThumbnail(thumbnail, OverlayUrl) {
            if (thumbnail.dataset.overlayApplied)
                return;
            // Create the overlay image
            const overlay = document.createElement("img");
            overlay.src = OverlayUrl;
            overlay.style.position = "absolute";
            overlay.style.top = overlay.style.left = "0";
            overlay.style.width = overlay.style.height = "100%";
            overlay.style.zIndex = "0";
            overlay.style.opacity = opacity; // Apply opacity here
            // Overlay is appended as a child of the original image's parent element (the thing we did query select), making it go on top
            thumbnail.parentElement?.appendChild(overlay);
            thumbnail.dataset.overlayApplied = "true";
        }
        // Get random image index
        function getRandomImageIndex() {
            return Math.floor(Math.random() * (numImages) + 1);
        }
        // Get URL of the overlay image
        function getOverlayUrl(index) {
            return chrome.runtime.getURL(`assets/images/${index}.PNG`);
        }
        // Observe the entire body of the document for changes
        const observer = new MutationObserver(() => {
            getThumbnails();
        });
        observer.observe(document.body, {
            // Types of mutations to observe
            childList: true,
            subtree: true,
        });
        // Initial call to set thumbnails on page load
        getThumbnails();
    });
})();
//# sourceMappingURL=main.js.map