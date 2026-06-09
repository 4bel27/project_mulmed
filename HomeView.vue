<template>
  <div class="container-fluid">
    <h2 class="mb-4 fw-bold text-success"> Discover Songs</h2>
    
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      <div class="col" v-for="song in SongCatalogue" :key="song.id">
        
        <div class="card p-3 shadow-sm border h-100 song-card" @click="goToSong(song.id)">
          
          <div class="ratio ratio-1x1 mb-3 rounded overflow-hidden shadow-sm">
            <img :src="song.cover" alt="Song Cover" class="img-fluid object-fit-cover" loading="lazy">
          </div>
          
          <div class="card-body p-0">
            <h5 class="card-title text-truncate mb-1 fw-semibold">{{ song.title }}</h5>
            <p class="card-text text-muted small">{{ song.Artist }}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
// Mengimport SongCatalogue (sesuai nama variabel baru di data.js kamu)
import { SongCatalogue } from '../data' 

const router = useRouter()

// Fungsi untuk pindah ke halaman detail lagu saat kartu diklik
const goToSong = (id) => {
  router.push(`/song/${id}`)
}
</script>

<style scoped>
/* Style kustom khusus halaman ini untuk efek hover kartu */
.song-card {
  cursor: pointer;
  background-color: var(--bg-box);
  border-color: var(--border-color);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.song-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
}
</style>