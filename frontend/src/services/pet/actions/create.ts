"use server"

import { PetSchema } from "@/types/zod/PetSchema"
import fetchData from "@/utils/fetchData"

export default async function create(pet: PetSchema) {
  try {
    const res = await fetchData(`${process.env.BASE_URL_API}/pets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pet)
    })
    return res.json()
  } catch (error) {
    return error
  }
}
