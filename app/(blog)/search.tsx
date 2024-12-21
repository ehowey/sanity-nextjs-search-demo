export default function Search() {
  return (
    <section className="my-16">
      <form className="mt-5 sm:flex sm:items-center">
        <div className="w-full sm:max-w-sm">
          <input
            id="search"
            name="search"
            type="search"
            placeholder="Search..."
            aria-label="search"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-lg text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>
        <button
          type="submit"
          className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-6 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
        >
          Search
        </button>
      </form>
    </section>
  );
}
