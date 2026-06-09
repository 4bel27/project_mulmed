<template>
  <div class="d-flex app-layout">
    
    <div class="sidebar d-flex flex-column flex-shrink-0 p-3 border-end text-white">
      <a href="/" class="d-flex align-items-center mb-4 me-md-auto text-decoration-none text-success">
        <span class="fs-4 fw-bold tracking-wider"> SpoJeDy</span>
      </a>
      <hr class="opacity-20 mb-4">
      
      <ul class="nav nav-pills flex-column mb-auto gap-1">
        <li class="nav-item">
          <router-link to="/" class="nav-link d-flex align-items-center gap-2 rounded-3 px-3 py-2">
            <span></span> Discover Songs
          </router-link>
        </li>
        <li>
          <router-link to="/music-video" class="nav-link d-flex align-items-center gap-2 rounded-3 px-3 py-2">
            <span></span> Music Videos
          </router-link>
        </li>
        <li>
          <router-link to="/profile" class="nav-link d-flex align-items-center gap-2 rounded-3 px-3 py-2">
            <span></span> Profile Settings
          </router-link>
        </li>
      </ul>
      
      <hr class="opacity-20 mt-auto">
      <div class="d-flex align-items-center gap-2 px-2 py-1">
        <img 
          :src="store.profile.avatar || defaultAvatar" 
          alt="User Avatar" 
          class="rounded-circle object-fit-cover bg-secondary"
          width="32" 
          height="32"
          style="border: 2px solid #1ed760;"
        >
        <span class="text-truncate small fw-medium" style="max-width: 150px;">
          {{ store.profile.username }}
        </span>
      </div>
    </div>

    <div class="flex-grow-1 p-4 overflow-y-auto" style="height: 100vh;">
      <router-view />
    </div>

  </div>
</template>

<script setup>
import { store } from './store' // Menghubungkan ke state global profil & tema

// Avatar cadangan jika user belum upload foto
const defaultAvatar = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23888'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>"
</script>

<style>
/* Catatan: Kita sengaja tidak memakai 'scoped' di App.vue ini 
   agar layout pembungkus utama bisa merespon variabel CSS global dengan baik */
</style>