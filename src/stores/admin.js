import { defineStore } from 'pinia'
import { ref } from 'vue'

// 管理员状态管理
export const useAdminStore = defineStore('admin', () => {
    const isCollapsed = ref(false) 
    
    const toggleCollapsed = () => {
        isCollapsed.value = !isCollapsed.value
    }

    return {
        isCollapsed,
        toggleCollapsed
    }
})

