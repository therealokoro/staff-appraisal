import { ICourse } from "~~/types/course"
import { IReview } from "~~/types/review"

export interface ICourseResultDetail {
  id: string
  body: string
  totalScore: number
}

export interface CourseResult {
  courseId: string
  course: ICourse
  totalScore: number
  reviewCount: number
  details: ICourseResultDetail[]
}

export interface SafeIReview extends IReview {
  results: {
    id: string
    body: string
    score: number
  }[]
}

export const useeReviewCalculator = (
  reviews: SafeIReview[]
): CourseResult[] => {
  const courseResults = new Map<string, CourseResult>()

  for (const review of reviews) {
    const { courseId, results, course } = review

    if (courseResults.has(courseId)) {
      const existingResult = courseResults.get(courseId)!

      existingResult.totalScore += results.reduce(
        (acc, result) => acc + result.score,
        0
      )
      existingResult.reviewCount++

      // Update details array for existing result
      for (const result of results) {
        const existingDetail = existingResult.details.find(
          (detail) => detail.id === result.id
        )
        if (existingDetail) {
          existingDetail.totalScore += result.score
        } else {
          existingResult.details.push({
            id: result.id,
            body: result.body,
            totalScore: result.score
          })
        }
      }
    } else {
      const newResult: CourseResult = {
        courseId,
        course,
        totalScore: results.reduce((acc, result) => acc + result.score, 0),
        reviewCount: 1,
        details: results.map(({ id, body, score }) => ({
          id,
          body,
          totalScore: score
        }))
      }
      courseResults.set(courseId, newResult)
    }
  }

  return Array.from(courseResults.values()).sort(
    (a, b) => b.totalScore - a.totalScore
  )
}
