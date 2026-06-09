<template>
  <div class="container-fluid">
    <h2 class="mb-4 fw-bold text-success">Music Videos</h2>
    
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      <div class="col" v-for="mv in SongCatalogue" :key="mv.id">
        
        <div class="card p-3 shadow-sm border h-100 video-card" @click="goToMv(mv.id)">
          <div class="ratio ratio-16x9 mb-3 rounded overflow-hidden shadow-sm bg-dark">
            <img 
              :src="mv.cover" 
              alt="Video Thumbnail" 
              class="img-fluid object-fit-cover opacity-75"
              loading="lazy"
            >
            <div class="position-absolute top-50 start-50 translate-middle">
              <span class="text-white fs-1">▶</span>
            </div>
          </div>
          
          <div class="card-body p-0">
            <h5 class="card-title text-truncate mb-1 fw-semibold">{{ mv.title }}</h5>
            <p class="card-text text-muted small"> {{ mv.Artist }}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { SongCatalogue } from '../data' // Mengambil data katalog yang sama

const router = useRouter()

// Fungsi untuk pindah ke halaman detail Video Musik
const goToMv = (id) => {
  router.push(`/music-video/${id}`)
}
</script>

<style scoped>
.video-card {
  cursor: pointer;
  background-color: var(--bg-box);
  border-color: var(--border-color);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2) !important;
}

.video-card:hover img {
  opacity: 1 !important;
  transform: scale(1.05);
  transition: all 0.3s ease;
}
</style>