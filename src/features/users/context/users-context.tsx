import React, { useState } from 'react'
import apiService from '@/lib/apiService'
import useDialogState from '@/hooks/use-dialog-state'
import { User } from '../data/schema'

type UsersDialogType = 'add' | 'edit' | 'delete' | 'invite'

interface UsersContextType {
  open: UsersDialogType | null
  setOpen: (str: UsersDialogType | null) => void
  currentRow: User | null
  setCurrentRow: React.Dispatch<React.SetStateAction<User | null>>
  fetchData: () => Promise<void>
  data: User[]
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
    console.log('Fetched users:', response)
    if (response.ok) {
      setData(response.data)
    } else {
      console.error('Error fetching users:', response.message)
    }
  }

  // Initial fetch
  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <UsersContext
      value={{ open, setOpen, currentRow, setCurrentRow, fetchData, data }}
    >
      {children}
    </UsersContext>
  )
}

export const useUsers = () => {
  const usersContext = React.useContext(UsersContext)

  if (!usersContext) {
    throw new Error('useUsers has to be used within <UsersContext>')
  }

  return usersContext
}
