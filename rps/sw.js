
const resources = [
    "./index.html",
    "./Assets/Cairo",
    "./Assets/Cairo/static/Cairo-Medium.ttf",
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
    "./Assets/down.png",
    "./Assets/music/entry.mp3",
    "./Assets/music/fail.mp3",
    "./Assets/music/success.mp3",
    "./Assets/paper.png",
    "./Assets/rock.png",
    "./Assets/scissor.png",
    "./Assets/up.png",
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
)})

// activate event
self.addEventListener("activate", () => {
    
})

// fetch event 
self.addEventListener("fetch", (e) => {
    e.respondWith(caches.match(e.request))
})