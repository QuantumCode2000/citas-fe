// // import { z } from 'zod'
// // import { useForm } from 'react-hook-form'
// // import { zodResolver } from '@hookform/resolvers/zod'
// // import { showSubmittedData } from '@/utils/show-submitted-data'
// // import { Button } from '@/components/ui/button'
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// // } from '@/components/ui/dialog'
// // import {
// //   Form,
// //   FormControl,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from '@/components/ui/form'
// // import { Input } from '@/components/ui/input'
// // import { PasswordInput } from '@/components/password-input'
// // import { SelectDropdown } from '@/components/select-dropdown'
// // import { userTypes } from '../data/data'
// // import { User } from '../data/schema'
// // const formSchema = z
// //   .object({
// //     firstName: z.string().min(1, { message: 'First Name is required.' }),
// //     lastName: z.string().min(1, { message: 'Last Name is required.' }),
// //     username: z.string().min(1, { message: 'Username is required.' }),
// //     phoneNumber: z.string().min(1, { message: 'Phone number is required.' }),
// //     email: z
// //       .string()
// //       .min(1, { message: 'Email is required.' })
// //       .email({ message: 'Email is invalid.' }),
// //     password: z.string().transform((pwd) => pwd.trim()),
// //     role: z.string().min(1, { message: 'Role is required.' }),
// //     confirmPassword: z.string().transform((pwd) => pwd.trim()),
// //     isEdit: z.boolean(),
// //   })
// //   .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
// //     if (!isEdit || (isEdit && password !== '')) {
// //       if (password === '') {
// //         ctx.addIssue({
// //           code: z.ZodIssueCode.custom,
// //           message: 'Password is required.',
// //           path: ['password'],
// //         })
// //       }
// //       if (password.length < 8) {
// //         ctx.addIssue({
// //           code: z.ZodIssueCode.custom,
// //           message: 'Password must be at least 8 characters long.',
// //           path: ['password'],
// //         })
// //       }
// //       if (!password.match(/[a-z]/)) {
// //         ctx.addIssue({
// //           code: z.ZodIssueCode.custom,
// //           message: 'Password must contain at least one lowercase letter.',
// //           path: ['password'],
// //         })
// //       }
// //       if (!password.match(/\d/)) {
// //         ctx.addIssue({
// //           code: z.ZodIssueCode.custom,
// //           message: 'Password must contain at least one number.',
// //           path: ['password'],
// //         })
// //       }
// //       if (password !== confirmPassword) {
// //         ctx.addIssue({
// //           code: z.ZodIssueCode.custom,
// //           message: "Passwords don't match.",
// //           path: ['confirmPassword'],
// //         })
// //       }
// //     }
// //   })
// // type UserForm = z.infer<typeof formSchema>
// // interface Props {
// //   currentRow?: User
// //   open: boolean
// //   onOpenChange: (open: boolean) => void
// // }
// // export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
// //   const isEdit = !!currentRow
// //   const form = useForm<UserForm>({
// //     resolver: zodResolver(formSchema),
// //     defaultValues: isEdit
// //       ? {
// //           ...currentRow,
// //           password: '',
// //           confirmPassword: '',
// //           isEdit,
// //         }
// //       : {
// //           firstName: '',
// //           lastName: '',
// //           username: '',
// //           email: '',
// //           role: '',
// //           phoneNumber: '',
// //           password: '',
// //           confirmPassword: '',
// //           isEdit,
// //         },
// //   })
// //   const onSubmit = (values: UserForm) => {
// //     form.reset()
// //     showSubmittedData(values)
// //     onOpenChange(false)
// //   }
// //   const isPasswordTouched = !!form.formState.dirtyFields.password
// //   return (
// //     <Dialog
// //       open={open}
// //       onOpenChange={(state) => {
// //         form.reset()
// //         onOpenChange(state)
// //       }}
// //     >
// //       <DialogContent className='sm:max-w-lg'>
// //         <DialogHeader className='text-left'>
// //           <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
// //           <DialogDescription>
// //             {isEdit ? 'Update the user here. ' : 'Create new user here. '}
// //             Click save when you&apos;re done.
// //           </DialogDescription>
// //         </DialogHeader>
// //         <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
// //           <Form {...form}>
// //             <form
// //               id='user-form'
// //               onSubmit={form.handleSubmit(onSubmit)}
// //               className='space-y-4 p-0.5'
// //             >
// //               <FormField
// //                 control={form.control}
// //                 name='firstName'
// //                 render={({ field }) => (
// //                   <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
// //                     <FormLabel className='col-span-2 text-right'>
// //                       First Name
// //                     </FormLabel>
// //                     <FormControl>
// //                       <Input
// //                         placeholder='John'
// //                         className='col-span-4'
// //                         autoComplete='off'
// //                         {...field}
// //                       />
// //                     </FormControl>
// //                     <FormMessage className='col-span-4 col-start-3' />
// //                   </FormItem>
// //                 )}
// //               />
// //               <FormField
// //                 control={form.control}
// //                 name='lastName'
// //                 render={({ field }) => (
// //                   <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
// //                     <FormLabel className='col-span-2 text-right'>
// //                       Last Name
// //                     </FormLabel>
// //                     <FormControl>
// //                       <Input
// //                         placeholder='Doe'
// //                         className='col-span-4'
// //                         autoComplete='off'
// //                         {...field}
// //                       />
// //                     </FormControl>
// //                     <FormMessage className='col-span-4 col-start-3' />
// //                   </FormItem>
// //                 )}
// //               />
// //               <FormField
// //                 control={form.control}
// //                 name='username'
// //                 render={({ field }) => (
// //                   <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
// //                     <FormLabel className='col-span-2 text-right'>
// //                       Username
// //                     </FormLabel>
// //                     <FormControl>
// //                       <Input
// //                         placeholder='john_doe'
// //                         className='col-span-4'
// //                         {...field}
// //                       />
// //                     </FormControl>
// //                     <FormMessage className='col-span-4 col-start-3' />
// //                   </FormItem>
// //                 )}
// //               />
// //               <FormField
// //                 control={form.control}
// //                 name='email'
// //                 render={({ field }) => (
// //                   <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
// //                     <FormLabel className='col-span-2 text-right'>
// //                       Email
// //                     </FormLabel>
// //                     <FormControl>
// //                       <Input
// //                         placeholder='john.doe@gmail.com'
// //                         className='col-span-4'
// //                         {...field}
// //                       />
// //                     </FormControl>
// //                     <FormMessage className='col-span-4 col-start-3' />
// //                   </FormItem>
// //                 )}
// //               />
// //               <FormField
// //                 control={form.control}
// //                 name='phoneNumber'
// //                 render={({ field }) => (
// //                   <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
// //                     <FormLabel className='col-span-2 text-right'>
// //                       Phone Number
// //                     </FormLabel>
// //                     <FormControl>
// //                       <Input
// //                         placeholder='+123456789'
// //                         className='col-span-4'
// //                         {...field}
// //                       />
// //                     </FormControl>
// //                     <FormMessage className='col-span-4 col-start-3' />
// //                   </FormItem>
// //                 )}
// //               />
// //               <FormField
// //                 control={form.control}
// //                 name='role'
// //                 render={({ field }) => (
// //                   <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
// //                     <FormLabel className='col-span-2 text-right'>
// //                       Role
// //                     </FormLabel>
// //                     <SelectDropdown
// //                       defaultValue={field.value}
// //                       onValueChange={field.onChange}
// //                       placeholder='Select a role'
// //                       className='col-span-4'
// //                       items={userTypes.map(({ label, value }) => ({
// //                         label,
// //                         value,
// //                       }))}
// //                     />
// //                     <FormMessage className='col-span-4 col-start-3' />
// //                   </FormItem>
// //                 )}
// //               />
// //               <FormField
// //                 control={form.control}
// //                 name='password'
// //                 render={({ field }) => (
// //                   <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
// //                     <FormLabel className='col-span-2 text-right'>
// //                       Password
// //                     </FormLabel>
// //                     <FormControl>
// //                       <PasswordInput
// //                         placeholder='e.g., S3cur3P@ssw0rd'
// //                         className='col-span-4'
// //                         {...field}
// //                       />
// //                     </FormControl>
// //                     <FormMessage className='col-span-4 col-start-3' />
// //                   </FormItem>
// //                 )}
// //               />
// //               <FormField
// //                 control={form.control}
// //                 name='confirmPassword'
// //                 render={({ field }) => (
// //                   <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
// //                     <FormLabel className='col-span-2 text-right'>
// //                       Confirm Password
// //                     </FormLabel>
// //                     <FormControl>
// //                       <PasswordInput
// //                         disabled={!isPasswordTouched}
// //                         placeholder='e.g., S3cur3P@ssw0rd'
// //                         className='col-span-4'
// //                         {...field}
// //                       />
// //                     </FormControl>
// //                     <FormMessage className='col-span-4 col-start-3' />
// //                   </FormItem>
// //                 )}
// //               />
// //             </form>
// //           </Form>
// //         </div>
// //         <DialogFooter>
// //           <Button type='submit' form='user-form'>
// //             Save changes
// //           </Button>
// //         </DialogFooter>
// //       </DialogContent>
// //     </Dialog>
// //   )
// // }
// import { z } from 'zod'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { showSubmittedData } from '@/utils/show-submitted-data'
// import { Button } from '@/components/ui/button'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { PasswordInput } from '@/components/password-input'
// import { SelectDropdown } from '@/components/select-dropdown'
// import { useUsers } from '../context/users-context'

// /* ──────────────────────────────────────────────
//    1.  ESQUEMA ZOD (sin avatar)
//    ────────────────────────────────────────────── */
// const formSchema = z
//   .object({
//     nombre: z.string().min(1, { message: 'El nombre es obligatorio.' }),
//     paterno: z
//       .string()
//       .min(1, { message: 'El apellido paterno es obligatorio.' }),
//     materno: z
//       .string()
//       .min(1, { message: 'El apellido materno es obligatorio.' }),
//     usuario: z.string().min(1, { message: 'El usuario es obligatorio.' }),
//     email: z
//       .string()
//       .min(1, { message: 'El email es obligatorio.' })
//       .email({ message: 'Email inválido.' }),
//     password: z.string().transform((v) => v.trim()),
//     password_confirm: z.string().transform((v) => v.trim()),
//     sexo: z.enum(['Femenino', 'Masculino'], {
//       message: 'El sexo es obligatorio.',
//     }),
//     ci: z.string().min(1, { message: 'El CI es obligatorio.' }),
//     isEdit: z.boolean().optional(),
//   })
//   .superRefine(({ isEdit, password, password_confirm }, ctx) => {
//     if (!isEdit || (isEdit && password !== '')) {
//       if (password === '') {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ['password'],
//           message: 'La contraseña es obligatoria.',
//         })
//       }
//       if (password.length < 8) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ['password'],
//           message: 'Mínimo 8 caracteres.',
//         })
//       }
//       if (!/\d/.test(password)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ['password'],
//           message: 'Debe contener al menos un número.',
//         })
//       }
//       if (password !== password_confirm) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ['password_confirm'],
//           message: 'Las contraseñas no coinciden.',
//         })
//       }
//     }
//   })

// export type UserForm = z.infer<typeof formSchema>

// interface Props {
//   currentRow?: Partial<UserForm>
//   open: boolean
//   onOpenChange: (open: boolean) => void
// }

// /* ──────────────────────────────────────────────
//    2.  COMPONENTE
//    ────────────────────────────────────────────── */
// export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
//   const { createUser } = useUsers()
//   const isEdit = !!currentRow

//   const form = useForm<UserForm>({
//     resolver: zodResolver(formSchema),
//     defaultValues: isEdit
//       ? { ...currentRow, password: '', password_confirm: '', isEdit }
//       : {
//           nombre: '',
//           paterno: '',
//           materno: '',
//           usuario: '',
//           email: '',
//           password: '',
//           password_confirm: '',
//           sexo: 'Femenino',
//           ci: '',
//           isEdit,
//         },
//   })

//   /* ───────────── SUBMIT ───────────── */
//   const onSubmit = async (values: UserForm) => {
//     await createUser(values) // ← usa el contexto
//     showSubmittedData(values) // ← toast
//     form.reset()
//     onOpenChange(false)
//   }

//   const pwdTouched = !!form.formState.dirtyFields.password

//   /* ───────────── UI ───────────── */
//   return (
//     <Dialog
//       open={open}
//       onOpenChange={(state) => {
//         form.reset()
//         onOpenChange(state)
//       }}
//     >
//       <DialogContent className='sm:max-w-lg'>
//         <DialogHeader className='text-left'>
//           <DialogTitle>
//             {isEdit ? 'Editar usuario' : 'Nuevo usuario'}
//           </DialogTitle>
//           <DialogDescription>
//             {isEdit
//               ? 'Actualiza los datos y guarda.'
//               : 'Completa el formulario y guarda.'}
//           </DialogDescription>
//         </DialogHeader>

//         <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
//           <Form {...form}>
//             <form
//               id='user-form'
//               onSubmit={form.handleSubmit(onSubmit)}
//               className='space-y-4 p-0.5'
//             >
//               {/* nombre */}
//               <FormField
//                 control={form.control}
//                 name='nombre'
//                 render={({ field }) => (
//                   <FormItem className='grid grid-cols-6 items-center gap-4'>
//                     <FormLabel className='col-span-2 text-right'>
//                       Nombre
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder='Usuario Prueba'
//                         className='col-span-4'
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className='col-span-4 col-start-3' />
//                   </FormItem>
//                 )}
//               />
//               {/* paterno */}
//               <FormField
//                 control={form.control}
//                 name='paterno'
//                 render={({ field }) => (
//                   <FormItem className='grid grid-cols-6 items-center gap-4'>
//                     <FormLabel className='col-span-2 text-right'>
//                       Paterno
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder='Paterno111'
//                         className='col-span-4'
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className='col-span-4 col-start-3' />
//                   </FormItem>
//                 )}
//               />
//               {/* materno */}
//               <FormField
//                 control={form.control}
//                 name='materno'
//                 render={({ field }) => (
//                   <FormItem className='grid grid-cols-6 items-center gap-4'>
//                     <FormLabel className='col-span-2 text-right'>
//                       Materno
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder='Materno111'
//                         className='col-span-4'
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className='col-span-4 col-start-3' />
//                   </FormItem>
//                 )}
//               />
//               {/* usuario */}
//               <FormField
//                 control={form.control}
//                 name='usuario'
//                 render={({ field }) => (
//                   <FormItem className='grid grid-cols-6 items-center gap-4'>
//                     <FormLabel className='col-span-2 text-right'>
//                       Usuario
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder='admin6'
//                         className='col-span-4'
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className='col-span-4 col-start-3' />
//                   </FormItem>
//                 )}
//               />
//               {/* email */}
//               <FormField
//                 control={form.control}
//                 name='email'
//                 render={({ field }) => (
//                   <FormItem className='grid grid-cols-6 items-center gap-4'>
//                     <FormLabel className='col-span-2 text-right'>
//                       Email
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder='prueba51@galileo...'
//                         className='col-span-4'
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className='col-span-4 col-start-3' />
//                   </FormItem>
//                 )}
//               />
//               {/* password */}
//               <FormField
//                 control={form.control}
//                 name='password'
//                 render={({ field }) => (
//                   <FormItem className='grid grid-cols-6 items-center gap-4'>
//                     <FormLabel className='col-span-2 text-right'>
//                       Contraseña
//                     </FormLabel>
//                     <FormControl>
//                       <PasswordInput
//                         placeholder='********'
//                         className='col-span-4'
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className='col-span-4 col-start-3' />
//                   </FormItem>
//                 )}
//               />
//               {/* password_confirm */}
//               <FormField
//                 control={form.control}
//                 name='password_confirm'
//                 render={({ field }) => (
//                   <FormItem className='grid grid-cols-6 items-center gap-4'>
//                     <FormLabel className='col-span-2 text-right'>
//                       Confirmar
//                     </FormLabel>
//                     <FormControl>
//                       <PasswordInput
//                         disabled={!pwdTouched}
//                         placeholder='********'
//                         className='col-span-4'
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className='col-span-4 col-start-3' />
//                   </FormItem>
//                 )}
//               />
//               {/* sexo */}
//               <FormField
//                 control={form.control}
//                 name='sexo'
//                 render={({ field }) => (
//                   <FormItem className='grid grid-cols-6 items-center gap-4'>
//                     <FormLabel className='col-span-2 text-right'>
//                       Sexo
//                     </FormLabel>
//                     <SelectDropdown
//                       defaultValue={field.value}
//                       onValueChange={field.onChange}
//                       placeholder='Selecciona'
//                       className='col-span-4'
//                       items={[
//                         { label: 'Femenino', value: 'Femenino' },
//                         { label: 'Masculino', value: 'Masculino' },
//                       ]}
//                     />
//                     <FormMessage className='col-span-4 col-start-3' />
//                   </FormItem>
//                 )}
//               />
//               {/* ci */}
//               <FormField
//                 control={form.control}
//                 name='ci'
//                 render={({ field }) => (
//                   <FormItem className='grid grid-cols-6 items-center gap-4'>
//                     <FormLabel className='col-span-2 text-right'>CI</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder='123456'
//                         className='col-span-4'
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className='col-span-4 col-start-3' />
//                   </FormItem>
//                 )}
//               />
//             </form>
//           </Form>
//         </div>

//         <DialogFooter>
//           <Button type='submit' form='user-form'>
//             Guardar
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }
