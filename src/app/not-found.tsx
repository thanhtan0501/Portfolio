export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-8">
      <section aria-labelledby="not-found-title" className="text-center">
        <p className="text-sm font-medium text-gray-500">404</p>
        <h1 id="not-found-title" className="mt-2 text-3xl font-semibold tracking-tight">
          Page not found
        </h1>
      </section>
    </main>
  )
}
