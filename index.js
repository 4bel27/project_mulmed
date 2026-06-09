import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SongDtlView from '../views/SongDtlView.vue'
import VideoMusicView from '../views/VideoMusicView.vue'
import MyDtlView from '../views/MyDtlView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/song/:id', component: SongDtlView },
  { path: '/music-video', component: VideoMusicView },
  { path: '/music-video/:id', component: MyDtlView },
  { path: '/profile', component: ProfileView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router