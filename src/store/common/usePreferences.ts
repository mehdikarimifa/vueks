import { defineStore } from 'pinia'

export const usePreferences = defineStore('usePreferences', {
  state: () => {
    return {
      sidebarExpanded: true,
      sidebarPinned: true,
      themeMode: 'lightMode' as 'lightMode' | 'darkMode'
    }
  },
  actions: {
    toggleSidebar(status: boolean) {
      this.sidebarExpanded = status
    },
    toggleSidebarPinned() {
      this.sidebarPinned = !this.sidebarPinned
    },
    toggleDarkMode() {
      this.themeMode = this.themeMode === 'lightMode' ? 'darkMode' : 'lightMode'
      this.setDOMThemeData()
    },
    setDOMThemeData() {
      document.documentElement.setAttribute('data-theme', this.themeMode)
    }
  },
  getters: {
    isSidebarExpanded: state => state.sidebarExpanded,
    isSidebarPinned: state => state.sidebarPinned,
    isThemeDarkMode: state => state.themeMode === 'darkMode',
    getThemeMode: state => state.themeMode
  },
  persist: {
    key: 'store-key',
    paths: ['themeMode'],
  },
})
