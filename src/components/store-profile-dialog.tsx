import { useMutation, useQuery } from "@tanstack/react-query"
import { Button } from "./ui/button"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { getManagedRestaurant } from "@/api/get-managed-restaurante"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod"
import { updateProfile } from "@/api/update-profile"
import { toast } from "sonner"

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
})


type StoreProfileShcema = z.infer<typeof storeProfileSchema>

const StoreProfileDialog = () => {
  const { data: managedRestaurant, } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })


  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile
  })

  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm<StoreProfileShcema>({
    resolver: zodResolver(storeProfileSchema),
    values
      : {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    }
  })

  async function handleUpdateProfile(data: StoreProfileShcema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })

      toast.success('Perfil atualizado com sucesso')
    } catch (error) {
      toast.error('Falha ao atualizar o perfil, tente novamente')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Nome</Label>
            <Input id="name" className="col-span-3"  {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Descrição</Label>
            <Textarea id="description" className="col-span-3" {...register('description')} rows={6} />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={"ghost"}>Cancelar</Button>
          </DialogClose>
          <Button type="submit" variant={"success"} disabled={isSubmitting} >Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

export default StoreProfileDialog
