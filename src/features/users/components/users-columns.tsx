// import { ColumnDef } from '@tanstack/react-table'
// import { cn } from '@/lib/utils'
// import { Badge } from '@/components/ui/badge'
// import { Checkbox } from '@/components/ui/checkbox'
// // Asumo que tienes un tipo 'User' que coincide con tu nueva estructura de datos
// import { User } from '../data/schema'
// import { DataTableColumnHeader } from './data-table-column-header'
// import { DataTableRowActions } from './data-table-row-actions'
// export const columns: ColumnDef<User>[] = [
//   {
//     id: 'select',
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && 'indeterminate')
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label='Select all'
//         className='translate-y-[2px]'
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label='Select row'
//         className='translate-y-[2px]'
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   // CAMBIO: Adaptado de 'username' a 'usuario'
//   {
//     accessorKey: 'usuario',
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title='Usuario' />
//     ),
//     cell: ({ row }) => <div>{row.getValue('usuario')}</div>,
//   },
//   // CAMBIO: Creada para combinar nombre, paterno y materno
//   {
//     id: 'nombreCompleto',
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title='Nombre Completo' />
//     ),
//     cell: ({ row }) => {
//       // Combina los campos, manejando el materno nulo
//       const fullName = `${row.original.nombre} ${row.original.paterno} ${
//         row.original.materno || ''
//       }`.trim()
//       return <div>{fullName}</div>
//     },
//   },
//   // Columna de Email (sin cambios en la lógica)
//   {
//     accessorKey: 'email',
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title='Email' />
//     ),
//     cell: ({ row }) => <div>{row.getValue('email')}</div>,
//   },
//   // CAMBIO: Creada para combinar código de país y whatsapp
//   {
//     id: 'telefono',
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title='Whatsapp' />
//     ),
//     cell: ({ row }) => {
//       const phone = `+${row.original.codigo_pais} ${row.original.whatsapp}`
//       return <div>{phone}</div>
//     },
//     enableSorting: false,
//   },
//   // CAMBIO: Adaptado de 'status' a 'estado'
//   {
//     accessorKey: 'estado',
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title='Estado' />
//     ),
//     cell: ({ row }) => {
//       const estado = row.getValue('estado') as string
//       // Lógica simple para el color del badge. Puedes expandirla.
//       const badgeColor =
//         estado.toLowerCase() === 'activo'
//           ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
//           : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
//       return (
//         <Badge variant='outline' className={cn('capitalize', badgeColor)}>
//           {estado}
//         </Badge>
//       )
//     },
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id))
//     },
//   },
//   {
//     id: 'actions',
//     cell: ({ row }) => <DataTableRowActions row={row} />,
//   },
// ]
import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { User } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

// Icono de advertencia

export const columns: ColumnDef<User>[] = [
  // Selección (igual)
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // Usuario
  {
    accessorKey: 'usuario',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Usuario' />
    ),
    cell: ({ row }) => <div>{row.getValue('usuario')}</div>,
  },

  // Nombre completo
  {
    id: 'nombreCompleto',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre Completo' />
    ),
    cell: ({ row }) => {
      const fullName =
        `${row.original.nombre} ${row.original.paterno} ${row.original.materno || ''}`.trim()
      return <div>{fullName}</div>
    },
  },

  // Email
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
  },

  // Whatsapp
  {
    id: 'telefono',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Whatsapp' />
    ),
    cell: ({ row }) => {
      const phone =
        row.original.whatsapp && row.original.codigo_pais
          ? `+${row.original.codigo_pais} ${row.original.whatsapp}`
          : '-'
      return <div>{phone}</div>
    },
    enableSorting: false,
  },

  // Roles
  {
    id: 'roles',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Roles' />
    ),
    cell: ({ row }) => {
      const roles: string[] = row.original.roles ?? []
      return (
        <div className='flex flex-wrap gap-1'>
          {roles.length > 0 ? (
            roles.map((role) => (
              <Badge key={role} variant='outline'>
                {role}
              </Badge>
            ))
          ) : (
            <span className='text-gray-400'>Sin rol</span>
          )}
        </div>
      )
    },
    enableSorting: false,
  },

  // Estado (badge de color)
  {
    accessorKey: 'estado',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Estado' />
    ),
    cell: ({ row }) => {
      const estado = row.getValue('estado') as string
      const badgeColor =
        estado.toLowerCase() === 'activo'
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'

      return (
        <Badge variant='outline' className={cn('capitalize', badgeColor)}>
          {estado}
        </Badge>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },

  {
    accessorKey: 'updated_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Actualizado' />
    ),
    cell: ({ row }) => {
      const date = row.original.updated_at
      return date ? new Date(date).toLocaleDateString() : '-'
    },
    sortingFn: 'datetime',
    enableSorting: true,
    filterFn: (row, id, value) => {
      const date = row.original.updated_at
      if (!date || !value) return false
      return new Date(date).toLocaleDateString().includes(value)
    },
  },

  // Acciones (sin cambios)
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
