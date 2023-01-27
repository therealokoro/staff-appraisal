import {
  EditQuestionInput,
  CreateQuestionInput
} from "~~/server/modules/question/question.schema"
import { IQuestion, QuestionStoreState } from "~~/types/question"

export const useQuestionStore = defineStore("QuestionStore", {
  state: (): QuestionStoreState => ({
    questionList: []
  }),

  getters: {
    getQuestionList: (s: QuestionStoreState) => s.questionList
  },

  actions: {
    async createNewQuestion(input: CreateQuestionInput) {
      const res = await useApi.post<IQuestion[]>("questions/create", input)
      if (res.error) return Promise.reject(res.message)

      this.questionList = res.data
      return Promise.resolve(res.data)
    },

    async editQuestionInfo(id: string, input: EditQuestionInput) {
      const res = await useApi.put<IQuestion[]>(`questions/${id}`, input)
      if (res.error) return Promise.reject(res.message)

      this.questionList = res.data
      return Promise.resolve(res.data)
    },

    async deleteQuestion(id: string) {
      const res = await useApi.delete<IQuestion[]>(`questions/${id}`)
      if (res.error) return Promise.reject(res.message)

      this.questionList = res.data
      return Promise.resolve(res.data)
    },

    async fetchAllQuestions() {
      const res = await useApi.get<IQuestion[]>("questions")
      if (res.error) return Promise.reject(res.message)
      return Promise.resolve(res.data)
    }
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useQuestionStore, import.meta.hot))
