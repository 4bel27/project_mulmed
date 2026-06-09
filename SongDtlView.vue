<template>
  <div class="container d-flex justify-content-center align-items-center" style="min-height: 70vh;" v-if="song">
    <div class="p-4 rounded border text-center shadow-sm w-100" style="max-width: 450px; background: var(--bg-box); border-color: var(--border-color) !important;">
      
      <div class="ratio ratio-1x1 rounded mb-4 overflow-hidden shadow-sm mx-auto shadow" style="max-width: 280px; cursor: zoom-in;" @click="isFullscreen = true">
        <img :src="song.cover" alt="Cover Art" class="img-fluid object-fit-cover">
      </div>
      
      <h3 class="fw-bold mb-1 text-truncate">{{ song.title }}</h3>
      <p class="text-muted mb-4">{{ song.Artist }}</p>

      <audio ref="audioPlayer" :src="song.audio" @ended="changeTrack(1)"></audio>

      <div class="d-flex align-items-center justify-content-center gap-3 mb-4">
        <button class="btn btn-outline-secondary rounded-circle py-2" @click="changeTrack(-1)">⏮</button>
        <button class="btn btn-success rounded-pill px-5 py-2 fw-bold" @click="togglePlay">
          {{ isPlaying ? ' PAUSE' : ' PLAY' }}
        </button>
        <button class="btn btn-outline-secondary rounded-circle py-2" @click="changeTrack(1)">⏭</button>
      </div>

      <div class="d-flex align-items-center gap-2 w-100 px-3 mb-4">
        <span class="small"><</span>
        <input type="range" min="0" max="1" step="0.05" v-model="volume" @input="syncVolume" class="form-range">
        <span class="small">></span>
      </div>

      <button class="btn btn-outline-primary w-100 rounded-pill fw-semibold" @click="router.push(`/music-video/${song.id}`)">
        Watch Official Video
      </button>
    </div>

    <div v-if="isFullscreen" class="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-95 d-flex flex-column align-items-center justify-content-center" style="z-index: 2000;">
      <button class="btn btn-light position-absolute top-0 end-0 m-4 rounded-circle fw-bold" @click="isFullscreen = false; zoom = 1">&times;</button>
      
      <div class="position-absolute bottom-0 mb-4 d-flex gap-2 bg-dark p-2 rounded-pill border border-secondary">
        <button class="btn btn-sm btn-light rounded-pill" @click="zoom = Math.max(0.5, zoom - 0.25)">Zoom Out</button>
        <button class="btn btn-sm btn-light rounded-pill px-3" @click="zoom = 1">Reset</button>
        <button class="btn btn-sm btn-light rounded-pill" @click="zoom = Math.min(3, zoom + 0.25)">Zoom In</button>
      </div>
      
      <img :src="song.cover" alt="Zoomed Cover" :style="{ transform: 'scale(' + zoom + ')' }" style="max-width:80%; max-height:80%; transition: transform 0.2s ease-out; user-select:none;">
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SongCatalogue } from '../data' // Mengambil basis data dari data.js kamu

const route = useRoute()
const router = useRouter()

// Reaktif Variabel & Reference Elemen DOM
const audioPlayer = ref(null)
const isPlaying = ref(false)
const volume = ref(0.8)
const isFullscreen = ref(false)
const zoom = ref(1)

const currentId = ref(route.params.id)

// Komputasi untuk mencari data lagu yang cocok dengan ID di URL parameter
const song = computed(() => SongCatalogue.find(item => item.id === currentId.value))

// Fungsi Play dan Pause Audio
const togglePlay = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause()
    isPlaying.value = false
  } else {
    audioPlayer.value.play().catch(() => {})
    isPlaying.value = true
  }
}

// Fungsi sinkronisasi volume slider ke elemen audio
const syncVolume = () => {
  if (audioPlayer.value) audioPlayer.value.volume = volume.value
}

// Fungsi ganti lagu (Maju/Mundur index array)
const changeTrack = (direction) => {
  let idx = SongCatalogue.findIndex(item => item.id === currentId.value)
  idx = (idx + direction + SongCatalogue.length) % SongCatalogue.length
  currentId.value = SongCatalogue[idx].id
  
  // Mengganti rute URL tanpa menumpuk history back browser
  router.replace(`/song/${currentId.value}`)
  isPlaying.value = false
  
  // Menunggu siklus render DOM Vue selesai (nextTick) baru memuat lagu baru
  nextTick(() => {
    if (audioPlayer.value) {
      audioPlayer.value.load()
      syncVolume()
      togglePlay()
    }
  })
}
</script>