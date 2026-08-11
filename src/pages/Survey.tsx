import { useSprigInit } from '../hooks/useSprigInit'

const SURVEY_URL =
  'https://a.sprig.com/SjJFRGFHZzEtX0ctfnNpZDplOWE1OGNiOS0zYmU4LTQ2ZWQtYWE4MS0zYmRmNzRkZWRkN2Q='

export function Survey() {
  useSprigInit()
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-stone-900">Survey</h1>
      <p className="mt-1 text-sm text-stone-500">
        A demo of embedding a survey's first question directly into a page. Clicking an option
        records that response and opens the full survey starting at the next question.
      </p>

      <div className="mt-8 rounded-lg border border-stone-200 bg-white p-6">
        <p className="text-sm font-medium text-stone-900">How was your experience with Flow?</p>
        <div className="mt-4 flex gap-3">
          <a
            href={`${SURVEY_URL}?r=great`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-stone-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            Great
          </a>
          <a
            href={`${SURVEY_URL}?r=not_great`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-stone-300 px-5 py-2 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-100"
          >
            Not Great
          </a>
        </div>
      </div>
    </div>
  )
}
