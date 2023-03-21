import { EditLecturerInput } from "~~/server/modules/lecturer/lecturer.schema"
import {
  ILecturer,
  LecturerStoreState,
  QueryLecturerInput
} from "~~/types/lecturer"

export const useLecturerStore = defineStore("LecturerStore", {
  state: (): LecturerStoreState => ({
    lecturerList: []
  }),

  getters: {
    getLecturerList: (s: LecturerStoreState) => s.lecturerList
  },

  actions: {
    async createNewLecturer(input: QueryLecturerInput) {
      const res = await useApi.post<ILecturer[]>("lecturers/create", input)
      if (res.error) return Promise.reject(res.message)

      this.lecturerList = res.data
      return Promise.resolve(res.data)
    },

    async editLecturerInfo(id: string, input: EditLecturerInput) {
      const res = await useApi.put<ILecturer[]>(`lecturers/${id}`, input)
      if (res.error) return Promise.reject(res.message)

      this.lecturerList = res.data
      return Promise.resolve(res.data)
    },

    async deleteLecturer(id: string) {
      const res = await useApi.delete<ILecturer[]>(`lecturers/${id}`)
      if (res.error) return Promise.reject(res.message)

      this.lecturerList = res.data
      return Promise.resolve(res.data)
    },

    async fetchLecturers(query: QueryLecturerInput) {
      const res = await useApi.post<ILecturer[]>("lecturers/query", query)
      if (res.error) return Promise.reject(res.message)

      this.lecturerList = res.data
      return Promise.resolve(res.data)
    },

    async fetchSingleLecturer(id: string) {
      const res = await useApi.get<ILecturer>(`lecturers/${id}`)
      if (res.error) return Promise.reject(res.message)
      return Promise.resolve(res.data)
    }
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLecturerStore, import.meta.hot))
