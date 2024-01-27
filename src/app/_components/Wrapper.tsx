const Wrapper = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <>
      <div className={`mx-auto w-full max-w-screen-xl px-2 md:px-20 mt-2 ${className}`}>
        <div className="container">
          <div className="w-content max-w-full mv-0 mx-auto flex flex-col justify-center gap-8">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Wrapper
