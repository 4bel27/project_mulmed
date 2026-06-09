<template>
  <div class="container d-flex justify-content-center align-items-center" style="min-height: 75vh;" v-if="mv">
    <div class="p-4 rounded border shadow-sm w-100" style="max-width: 700px; background: var(--bg-box); border-color: var(--border-color) !important;">
      
      <div 
        ref="videoContainer" 
        class="ratio ratio-16x9 rounded mb-4 overflow-hidden shadow bg-black"
        :class="{ 'css-fullscreen-mode': isCustomFullscreen }"
      >
        <video ref="videoPlayer" :src="mv.video" @ended="changeMv(1)" muted></video>
        
        <button 
          v-if="isCustomFullscreen" 
          class="btn btn-danger position-absolute top-0 end-0 m-3 fw-bold rounded-pill shadow-lg"
          @click="exitCustomFullscreen"
          style="z-index: 99999;"
        >
           Exit Fullscreen
        </button>
      </div>

      <audio ref="audioPlayer" :src="mv.audio" @ended="changeMv(1)"></audio>
      
      <h3 class="fw-bold mb-1 text-center text-truncate">{{ mv.title }}</h3>
      <p class="text-muted text-center mb-4">Official Video by {{ mv.Artist }}</p>

      <div class="d-flex align-items-center justify-content-center gap-3 mb-4">
        <button class="btn btn-outline-secondary rounded-pill px-3" @click="changeMv(-1)">⏮ Prev</button>
        <button class="btn btn-success rounded-pill px-5 fw-bold" @click="togglePlay">
          {{ isPlaying ? '⏸ PAUSE' : '▶ PLAY' }}
        </button>
        <button class="btn btn-outline-secondary rounded-pill px-3" @click="changeMv(1)">Next ⏭</button>
      </div>

      <div class="d-flex align-items-center gap-2 w-50 mx-auto mb-4">
        <span class="small">🔈</span>
        <input type="range" min="0" max="1" step="0.05" v-model="volume" @input="syncVolume" class="form-range">
        <span class="small">🔊</span>
      </div>

      <div class="text-center mb-4">
        <button class="btn btn-sm btn-secondary rounded-pill px-4 fw-semibold" @click="goCustomFullscreen">
          🖥 Native Fullscreen
        </button>
      </div>

      <button class="btn btn-outline-primary w-100 rounded-pill fw-semibold" @click="router.push(`/song/${mv.id}`)">
        Back to Audio Track 🎧
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SongCatalogue } from '../data'

const route = useRoute()
const router = useRouter()

const videoPlayer = ref(null)
const audioPlayer = ref(null)
const videoContainer = ref(null)

const isPlaying = ref(false)
const isCustomFullscreen = ref(false) // Status pengecekan layar penuh kustom
const volume = ref(0.7)
const currentId = ref(route.params.id)

const mv = computed(() => SongCatalogue.find(item => item.id === currentId.value))

const togglePlay = () => {
  if (isPlaying.value) {
    videoPlayer.value.pause()
    audioPlayer.value.pause()
    isPlaying.value = false
  } else {
    if (audioPlayer.value && videoPlayer.value) {
      audioPlayer.value.currentTime = videoPlayer.value.currentTime
    }
    syncVolume()
    videoPlayer.value.play().catch(() => {})
    audioPlayer.value.play().catch(() => {})
    isPlaying.value = true
  }
}

const syncVolume = () => {
  if (audioPlayer.value) audioPlayer.value.volume = volume.value
}

// Fungsi memaksa elemen mengambil alih seluruh layar browser
const goCustomFullscreen = () => {
  isCustomFullscreen.value = true
}

// Fungsi mengembalikan ukuran ke bentuk kartu normal
const exitCustomFullscreen = () => {
  isCustomFullscreen.value = false
}

const changeMv = (direction) => {
  let idx = SongCatalogue.findIndex(item => item.id === currentId.value)
  idx = (idx + direction + SongCatalogue.length) % SongCatalogue.length
  currentId.value = SongCatalogue[idx].id
  
  isCustomFullscreen.value = false // Reset mode fullscreen saat ganti lagu
  router.replace(`/music-video/${currentId.value}`)
  isPlaying.value = false
  
  nextTick(() => {
    if (videoPlayer.value && audioPlayer.value) {
      videoPlayer.value.load()
      audioPlayer.value.load()
      syncVolume()
      togglePlay()
    }
  })
}
</script>

<style scoped>
/* Hanya memaksa kontainer kotak video yang meluas penuh */
.css-fullscreen-mode {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  max-width: none !important;
  z-index: 99999 !important; /* Menutup sidebar App.vue */
  margin: 0 !important;
  border-radius: 0 !important;
}

/* Memastikan elemen video di dalamnya ikut memenuhi kontainer */
.css-fullscreen-mode video {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain; /* Menjaga video tidak gepeng */
}

/* Mengunci tombol Exit agar ukurannya tetap normal dan tidak ikut melar */
.css-fullscreen-mode button {
  width: auto !important;
  height: auto !important;
  white-space: nowrap;
}
</style>