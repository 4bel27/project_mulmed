import { reactive, watch } from 'vue'


const savedProfile = localStorage.getItem('spojedy_profile')

const defaultProfile = {
  username: 'Spojedy User',
  theme: 'dark',
  avatar: ''
}


export const store = reactive({
  profile: savedProfile ? JSON.parse(savedProfile) : defaultProfile,
  
  
  save() {
    localStorage.setItem('spojedy_profile', JSON.stringify(this.profile))
  }
})


watch(
  () => store.profile.theme,
  (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme)
  },
  { immediate: true } 
)