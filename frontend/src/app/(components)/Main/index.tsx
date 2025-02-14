import PetService from "@/services/pet"
import Cards from "./Cards"
import Pagination from "./Pagination"

export default async function Main() {
  const res = await PetService.getAll()

  const data = res?.data || []

  return (
    <main className="relative max-w-7xl">
      <Cards data={data} />
      <Pagination />
    </main>
  )
}
