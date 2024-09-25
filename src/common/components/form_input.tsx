import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input, InputProps } from '@/components/ui/input'
import { Control, FieldValues } from 'react-hook-form'

type FormInputProps = {
  name: string
  label?: string
  placeholder?: string
  control?: Control<any>
  hint?: string
} & InputProps

const FormInput = (props: FormInputProps) => {
  const { control, name, label, placeholder, hint, ...rest } = props
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} {...rest} />
          </FormControl>
          <FormDescription>{hint}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default FormInput
