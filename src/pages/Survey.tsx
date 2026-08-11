export function Survey() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-stone-900">Survey</h1>
      <p className="mt-1 text-sm text-stone-500">
        Placeholder survey page — hook up after Google Tag Manager is installed.
      </p>

      <div className="mt-8 rounded-lg border border-stone-200 bg-white p-6">
        <p className="text-sm font-medium text-stone-900">How was your experience with Flow?</p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            disabled
            className="rounded-full bg-stone-900 px-5 py-2 text-sm font-medium text-white opacity-50"
          >
            Great
          </button>
          <button
            type="button"
            disabled
            className="rounded-full border border-stone-300 px-5 py-2 text-sm font-medium text-stone-900 opacity-50"
          >
            Not Great
          </button>
        </div>
      </div>
    </div>
  )
}
