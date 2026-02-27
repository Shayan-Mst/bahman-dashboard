import useDeleteProduct from '@/src/features/auth/hooks/useDeleteProduct';
import useDeleteUser from '@/src/features/auth/hooks/useDeleteUser';
import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import { Trash2 } from 'lucide-react'


interface DeleteProductDialogProps {
  id: number;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteProductDialog = ({id,open,setIsOpen} :DeleteProductDialogProps) => {
const {mutate} = useDeleteProduct()
    const handleDelete = (id: number) => {
         
        mutate(id)
        setIsOpen(false)
       
      };
    
  return (
      <Dialog.Root open={open} onOpenChange={(e)=>setIsOpen(e.open)}  placement="center" role="alertdialog">
      <Dialog.Trigger asChild>
      
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="brand.dashboard">
            <Dialog.Header>
              <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                This action cannot be undone. This will permanently delete the product
                and remove the data from our systems.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button  variant="outline" color="brand.dark" _hover={{bg:"unset"}}>Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={() => handleDelete(id)} colorPalette="red">Delete</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger color="brand.dark" _hover={{bg:"brand.dashboard"}} asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default DeleteProductDialog