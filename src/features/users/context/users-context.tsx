import React, { useState, useMemo } from 'react'
// ✅ Se importa useMemo
import apiService from '@/lib/apiService'
import useDialogState from '@/hooks/use-dialog-state'
import { User, NewUser } from '../data/schema'

type UsersDialogType = 'add' | 'edit' | 'delete' | 'invite'

interface UsersContextType {
  open: UsersDialogType | null
  setOpen: (str: UsersDialogType | null) => void
  currentRow: User | null
  setCurrentRow: React.Dispatch<React.SetStateAction<User | null>>
  fetchData: () => Promise<void>
  data: User[]
  createUser: (user: NewUser) => Promise<void>
  updateUser: (
    userId: string | number,
    partialData: Partial<User> & { password_confirmation?: string }
  ) => Promise<boolean>
}

const UsersContext = React.createContext<UsersContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function UsersProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<UsersDialogType>(null)
  const [currentRow, setCurrentRow] = useState<User | null>(null)
  const [data, setData] = useState<User[]>([])

  const fetchData = async () => {
    const response = await apiService.get<User[]>('/users')
    if (response.ok) {
      // Nota: Es mejor si el servidor ordena los datos por defecto.
      setData(response.data.reverse())
    } else {
      console.error('Error fetching users:', response.message)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const createUser = async (user: NewUser) => {
    const response = await apiService.post<User>('/users', user)
    if (response.ok) {
      // ✅ Se añade al principio para ser consistente con .reverse()
      setData((prev) => [response.data, ...prev])
    } else {
      console.error('Error creating user:', response.message)
    }
  }

  const updateUser = async (
    userId: string | number,
    partialData: Partial<User> & { password_confirmation?: string }
  ) => {
    // ✅ Se usa el método PATCH para mayor claridad semántica
    const response = await apiService.patch<User>(
      `/users/${userId}`,
      partialData
    )

    if (response.ok) {
      // ✅ Se actualiza el estado localmente para una UI más rápida
      setData((prevData) =>
        prevData.map((user) =>
          user.id === String(userId) ? { ...user, ...response.data } : user
        )
      )
      fetchData()
      return true
    } else {
      console.error('Error updating user:', response.message)
      return false
    }
  }

  const uploadAvatar = async (userId: number, file: File) => {
    const formData = new FormData()
    formData.append('avatar', file)
    const response = await apiService.post<User>(
      `/users/${userId}/avatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    if (response.ok) {
      setData((prev) =>
        prev.map((item) => (item.id === String(userId) ? response.data : item))
      )
    } else {
      console.error('Error uploading avatar:', response.message)
    }
  }

  // ✅ Se memoiza el valor del contexto para evitar re-renders innecesarios
  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      currentRow,
      setCurrentRow,
      fetchData,
      data,
      createUser,
      updateUser,
    }),
    [open, currentRow, data] // Dependencias del useMemo
  )

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  )
}

export const useUsers = () => {
  const usersContext = React.useContext(UsersContext)

  if (!usersContext) {
    throw new Error('useUsers tiene que ser usado dentro de un <UsersProvider>')
  }

  return usersContext
}
