import { create } from 'zustand'

export const useSettingStore = create(
    (set) => ({
        settingNameToToggle: false,

        toggleSetting: () => set((state) => ({
            settingNameToToggle: !state.settingNameToToggle,
        }))
    })
)