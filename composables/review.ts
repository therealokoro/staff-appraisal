import { ICourse } from "~~/types/course"
import { IReview } from "~~/types/review"

export interface CourseResult {
  courseId: string
  course: ICourse
  totalScore: number
  reviewCount: number
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
    } else {
      const newResult: CourseResult = {
        courseId,
        course,
        totalScore: results.reduce((acc, result) => acc + result.score, 0),
        reviewCount: 1
      }
      courseResults.set(courseId, newResult)
    }
  }

  return Array.from(courseResults.values()).sort(
    (a, b) => b.totalScore - a.totalScore
  )
}
