'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "c12528a0761d022e39249a67c730c487",
"assets/assets/fonts/Montserrat-Bold.ttf": "ade91f473255991f410f61857696434b",
"assets/assets/fonts/Montserrat-Italic.ttf": "a7063e0c0f0cb546ad45e9e24b27bd3b",
"assets/assets/fonts/Montserrat-Regular.ttf": "ee6539921d713482b8ccd4d0d23961bb",
"assets/assets/fonts/Montserrat-SemiBold.ttf": "c641dbee1d75892e4d88bdc31560c91b",
"assets/assets/images/app_logo.png": "d98bfaa8c9694692709f68e2e5d640c3",
"assets/assets/images/Facebook.png": "6d40dcf914fc59ae698351fa3691ffdb",
"assets/assets/images/Google.png": "f6d11d8e9ee9d9d5c0f151ac5d8284eb",
"assets/assets/images/Image.png": "a139fdb42c274a75f33958b0d2051741",
"assets/assets/images/img1.jpeg": "c1aa241fef475b1c29d8c3a3303f279d",
"assets/assets/images/otp_icon.png": "9715ee43b92653e0a171db4fa05864c2",
"assets/assets/images/phone_icon.png": "ddfb8a269b97501bcb6ac5fbd3ef59df",
"assets/assets/images/sliderImage1.png": "20a5892be359a455dfaf603884776f6f",
"assets/assets/images/sliderImage2.png": "70cf0ec95123e8cefda3c2b255c15be1",
"assets/assets/images/square.png": "ed73eafa313d6398a5283674bd7f475a",
"assets/assets/images/Twitter.png": "a313de71813aa8f2b6745e1e47735eb3",
"assets/assets/svg/app_logo.svg": "2c5cfb203865f8a2b15f21e105b27c9e",
"assets/assets/svg/Avatar.svg": "3bb8d54d13ceff59632166f8a1dafc5f",
"assets/assets/svg/Cart.svg": "7e8ff3915f8d40e2638f4c52cad415f9",
"assets/assets/svg/Facebook.svg": "0d7d74e01527bfd1cd49a81fe1438610",
"assets/assets/svg/Feed.svg": "65f9d99f0527304aad038bb186f8bee7",
"assets/assets/svg/Filter.svg": "7b39035dfc26ab6b644d77ec11bd6c3c",
"assets/assets/svg/Google.svg": "3694b85436b69931b244fed869fd2ced",
"assets/assets/svg/Grid.svg": "459106ac9599afc9dc3dc1113d53113d",
"assets/assets/svg/grid_layout.svg": "a24f4bbfb920030eb49bfeae44471493",
"assets/assets/svg/Home.svg": "aaae21c455075de52639da27a50881a0",
"assets/assets/svg/list_layout.svg": "d6e087ce9f81e2629f87749ff9de2c38",
"assets/assets/svg/Love.svg": "971f4de34aa131b4fafad97def8bbae3",
"assets/assets/svg/search_icon.svg": "7d0c630720f5249fc699a545b6affefb",
"assets/assets/svg/single_layout.svg": "0cf939b5cb67b61ca3aa288f707ad42a",
"assets/assets/svg/Twitter.svg": "764b85520646929fb1705ac94354be20",
"assets/FontManifest.json": "bcd85862a7ca022f8ea1689d2a4592be",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/NOTICES": "da3ebf63c79b6d1eea60c3c1afdce21c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/flutter_credit_card/font/halter.ttf": "4e081134892cd40793ffe67fdc3bed4e",
"assets/packages/flutter_credit_card/icons/amex.png": "dad771da6513cec63005d2ef1271189f",
"assets/packages/flutter_credit_card/icons/discover.png": "ea70c496dfa0169f6a3e59412472d6c1",
"assets/packages/flutter_credit_card/icons/mastercard.png": "7e386dc6c169e7164bd6f88bffb733c7",
"assets/packages/flutter_credit_card/icons/visa.png": "9db6b8c16d9afbb27b29ec0596be128b",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "c6dd33c67708654d88bbf1947468bd54",
"/": "c6dd33c67708654d88bbf1947468bd54",
"main.dart.js": "59319d771006972d1866c74490907b0b",
"manifest.json": "4c640ad9dbee2e368068d08cf9ca2596",
"version.json": "99317842e6c5aae58cfa66ff434e1c7f"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
