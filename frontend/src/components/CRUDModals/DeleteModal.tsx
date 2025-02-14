"use client"

import ArrowLeftIcon from "@/../public/assets/img/icons/blue-arrow-left.svg"
import DeleteIcon from "@/../public/assets/img/icons/trash.svg"
import PetService from "@/services/pet"
import Image from "next/image"
import { useModalContext } from "../../context/modalContext/index"
import Form from "../Form"
import Modal from "../Modal"
import Button from "../presentation/Button"
import { revalidateFetch } from "./actions"

export default function DeleteModal() {
  const [currentPet, deleteModalIsOpen, closeDeleteModal] = useModalContext(
    (s) => [s.currentPet, s.deleteModalIsOpen, s.closeDeleteModal]
  )

  const onSubmit = async () => {
    const res = await PetService.remove(currentPet.id)
    if (res.data) {
      revalidateFetch("get-all-pets")
      closeDeleteModal()
    } else {
      window.alert(res.message)
    }
  }

  return (
    <Modal.Root isOpen={deleteModalIsOpen} onClose={closeDeleteModal}>
      <Modal.Header
        src={DeleteIcon}
        alt="trash icon"
        onClose={closeDeleteModal}
      >
        Remover
      </Modal.Header>
      <Form onSubmit={onSubmit} defaultValues={currentPet} disabled>
        <h2 className="mb-7 mt-6 flex h-14 items-center justify-center text-center">
          Tem certeza que deseja remover esse pet?
        </h2>
        <div className="flex items-center justify-between">
          <Button
            height="md"
            width="lg"
            onClick={(e) => {
              e.preventDefault()
              closeDeleteModal()
            }}
          >
            <Image src={ArrowLeftIcon} alt="arrow left icon" />
            <span className="bg-gradient-to-r from-light_blue to-default_blue bg-clip-text font-bold text-transparent">
              Voltar
            </span>
          </Button>
          <Button height="md" width="lg" variant="danger">
            <Image src={DeleteIcon} alt="trash icon" />
            Remover
          </Button>
        </div>
      </Form>
    </Modal.Root>
  )
}
