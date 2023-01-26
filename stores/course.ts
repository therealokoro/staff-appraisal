import { EditCourseInput } from "~~/server/modules/course/course.schema"
import { ICourse, CourseStoreState, QueryCourseInput } from "~~/types/course"

export const useCourseStore = defineStore("CourseStore", {
  state: (): CourseStoreState => ({
    courseList: []
  }),

  getters: {
    getCourseList: (s: CourseStoreState) => s.courseList
  },

  actions: {
    async createNewCourse(input: QueryCourseInput) {
      const res = await useApi.post<ICourse[]>("courses/create", input)
      if (res.error) return Promise.reject(res.message)

      this.courseList = res.data
      return Promise.resolve(res.data)
    },

    async editCourseInfo(id: string, input: EditCourseInput) {
      const res = await useApi.put<ICourse[]>(`courses/${id}`, input)
      if (res.error) return Promise.reject(res.message)

      this.courseList = res.data
      return Promise.resolve(res.data)
    },

    async deleteCourse(id: string) {
      const res = await useApi.delete<ICourse[]>(`courses/${id}`)
      if (res.error) return Promise.reject(res.message)

      this.courseList = res.data
      return Promise.resolve(res.data)
    },

    async fetchCourses(query: QueryCourseInput) {
      const res = await useApi.post<ICourse[]>("courses/query", query)
      if (res.error) return Promise.reject(res.message)

      this.courseList = res.data
      return Promise.resolve(res.data)
    },

    async fetchSingleCourse(id: string) {
      const res = await useApi.get<ICourse>(`courses/${id}`)
      if (res.error) return Promise.reject(res.message)
      return Promise.resolve(res.data)
    }
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCourseStore, import.meta.hot))
