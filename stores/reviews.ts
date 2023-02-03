import { CreateReviewInput } from "~~/server/modules/review/review.schema"
import { IReview, QueryReviewsInput, ReviewStoreState } from "~~/types/review"

export const useReviewStore = defineStore("ReviewStore", {
  state: (): ReviewStoreState => ({
    currReview: null,
    reviewList: []
  }),

  getters: {
    getReviewList: (s: ReviewStoreState) => s.reviewList
  },

  actions: {
    async createNewReview(input: CreateReviewInput) {
      const res = await useApi.post<IReview>("reviews/create", input)
      if (res.error) return Promise.reject(res.message)

      this.currReview = res.data
      return Promise.resolve(res.data)
    },

    async fetchAllReviews() {
      const res = await useApi.get<IReview[]>("reviews")
      if (res.error) return Promise.reject(res.message)

      this.reviewList = res.data
      return Promise.resolve(res.data)
    },

    async queryReviews(input: QueryReviewsInput) {
      const query = useQueryString(input)
      const res = await useApi.get<IReview[]>(`reviews/query${query}`)
      if (res.error) return Promise.reject(res.message)

      this.reviewList = res.data
      return Promise.resolve(res.data)
    }
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useReviewStore, import.meta.hot))
