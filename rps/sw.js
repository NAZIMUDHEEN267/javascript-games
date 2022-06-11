
const resources = [
    "./Assets/Cairo",
    "./Assets/Cairo/static/Cairo-Medium.woff",
    "./Assets/icons/",
    "./Assets/icons/icon-72.jpg",
    "./Assets/icons/icon-96.jpg",
    "./Assets/icons/icon-128.jpg",
    "./Assets/icons/icon-144.jpg",
    "./Assets/icons/icon-144.png",
    "./Assets/icons/icon-152.jpg",
    "./Assets/icons/icon-192.jpg",
    "./Assets/icons/icon-384.jpg",
    "./Assets/icons/icon-512.jpg",
    "./Assets/icons/icon-512.png",
    "./Assets/music/entry.mp3",
    "./Assets/music/fail.mp3",
    "./Assets/music/success.mp3",
    "./Assets/button.png",
    "./Assets/down.png",
    "./Assets/favicon.png",
    "./Assets/name.png",
    "./Assets/paper.png",
    "./Assets/result.png",
    "./Assets/rock.png",
    "./Assets/scissor.png",
    "./Assets/score.png",
    "./Assets/up.png",
    "./index.html",
    "./game.html",
    "./manifest.json",
    "./script.js",
    "./style.css",
    "./sw.js",
]

// install event 
self.addEventListener("install", (e) => {
    e.waitUntil(caches.open("rps")
        .then(cache => cache.addAll(resources))
    )
})

// activate event
self.addEventListener("activate", () => {
    console.log("activating");
})

// fetch event 
self.addEventListener("fetch", (e) =>  e.respondWith(caches.match(e.request)))

