<template>
  <div class="container d-flex justify-content-center align-items-center" style="min-height: 75vh;">
    <div class="p-4 rounded border shadow-sm w-100" style="max-width: 480px; background: var(--bg-box); border-color: var(--border-color) !important;">
      <h3 class="fw-bold mb-4 text-center">Profile Settings</h3>

      <div class="text-center mb-4">
        <div class="avatar-container mx-auto mb-3" :class="{ 'shimmer-effect': isProcessing }">
          <img 
            :src="store.profile.avatar || defaultAvatar" 
            alt="Profile Avatar" 
            class="w-100 h-100 rounded-circle object-fit-cover" 
            style="border: 3px solid #1ed760;"
          >
        </div>
        
        <div class="position-relative mx-auto shadow-sm" style="max-width: 180px;">
          <button class="btn btn-sm btn-outline-secondary w-100 rounded-pill fw-semibold">Upload Photo</button>
          <input 
            type="file" 
            accept="image/*" 
            @change="handleImageUpload" 
            class="position-absolute top-0 start-0 w-100 h-100 opacity-0" 
            style="cursor:pointer;"
          >
        </div>
        
      </div>

      <div class="mb-4">
        <label class="form-label fw-bold small text-muted text-uppercase tracking-wider">Profile Name</label>
        <input 
          type="text" 
          class="form-control px-3 py-2 rounded-3 text-white bg-dark border-secondary" 
          v-model="store.profile.username" 
          @input="store.save()"
          placeholder="Enter username..."
        >
      </div>

      <div>
        <label class="form-label fw-bold small text-muted text-uppercase tracking-wider">Interface Theme</label>
        <div class="d-flex gap-2">
          <button 
            class="btn w-100 rounded-pill py-2 fw-semibold" 
            :class="store.profile.theme === 'light' ? 'btn-success text-white shadow-sm' : 'btn-outline-secondary'" 
            @click="changeTheme('light')"
          >
            ☀️ Light Mode
          </button>
          <button 
            class="btn w-100 rounded-pill py-2 fw-semibold" 
            :class="store.profile.theme === 'dark' ? 'btn-success text-white shadow-sm' : 'btn-outline-secondary'" 
            @click="changeTheme('dark')"
          >
            🌙 Dark Mode
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { store } from '../store' // Mengambil status global store dari store.js

const isProcessing = ref(false)

// gambar default profil
const defaultAvatar = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23888'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>"

// Fungsi untuk mengganti tema global aplikasi
const changeTheme = (mode) => {
  store.profile.theme = mode
  store.save()
}

// Fungsi utama unggah gambar, resize, dan kompresi otomatis di bawah 1MB
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  isProcessing.value = true
  const reader = new FileReader()
  reader.readAsDataURL(file)
  
  reader.onload = (e) => {
    const img = new Image()
    img.src = e.target.result
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      let width = img.width
      let height = img.height

      // Batasi resolusi maksimal lebar gambar ke 800px untuk menghemat ruang memori
      if (width > 800) {
        height *= 800 / width
        width = 800
      }
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      // Algoritma penurunan kualitas JPEG berulang sampai ukuran file di bawah 1MB (1,048,576 bytes)
      let quality = 0.9
      let dataUrl = ''
      do {
        dataUrl = canvas.toDataURL('image/jpeg', quality)
        quality -= 0.1
      } while (dataUrl.length > 1048576 && quality > 0.1)

      // Simpan hasil kompresi berwujud Base64 String ke Global State & LocalStorage
      store.profile.avatar = dataUrl
      store.save()
      
      // Memberikan jeda waktu simulasi efek animasi shimmer sebelum foto resmi ditampilkan
      setTimeout(() => { 
        isProcessing.value = false 
      }, 700)
    }
  }
}
</script>

<style scoped>
/* Frame lingkaran profil*/
.avatar-container {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  background: #2a2a2a;
}

/* Kerangka Animasi Efek Shimmering Skeleton */
.shimmer-effect::after {
  content: "";
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg, 
    rgba(255,255,255,0) 0%, 
    rgba(255,255,255,0.15) 30%, 
    rgba(255,255,255,0.3) 60%, 
    rgba(255,255,255,0) 100%
  );
  animation: waveShimmer 1.2s infinite;
}

@keyframes waveShimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>