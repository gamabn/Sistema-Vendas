 import {InputHTMLAttributes, ChangeEvent} from 'react'
 import { formatReal } from '@/app/util/money'
 import { formatCPF,formatTelefone, formatDate } from '@/app/util/formatters'

 interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    id: string;
    label: string;
    columnClass?: string;
    error?: string;
    formatter?: (value: string) => string;
}

//export function Input({value, label, columnClass, id, formatter, onChange,  error, name, ...inputProps}:InputProps) {
export function Input({
    value,
    label,
    columnClass,
    id,
    formatter,
    onChange, // este será o do Formik
    error,
    name,
    ...inputProps
}: InputProps) {

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const originalValue = event.target.value;
        const formattedValue = formatter ? formatter(originalValue) : originalValue;

        const syntheticEvent = {
            ...event,
            target: {
                ...event.target,
                name: name || id,
                value: formattedValue,
            },
        };

        onChange?.(syntheticEvent as ChangeEvent<HTMLInputElement>);
    };
    return (

        <div className={ `field column ${columnClass} `}>
            <label className='label' htmlFor={id}>{label}</label>
            <div className='control'>
                <input
                    className="input"
                    type="text"
                    id={id}
                    name={name || id}
                    value={value || ''}
                    onChange={onInputChange}
                    {...inputProps}
                />
                   {error &&  <p className="help is-danger">{error}</p>}
            </div>
        </div>



    )
}
export const InputMoney: React.FC<InputProps> = (props: InputProps) => {
    return(
      <Input {...props} formatter={formatReal}/>
    )
}

export const InputCpf: React.FC<InputProps> = (props: InputProps) => {
    return(
      <Input {...props} formatter={formatCPF}/>
    )
}

export const InputDate: React.FC<InputProps> = (props: InputProps) => {
    return(
      <Input {...props} formatter={formatDate}/>
    )
}

export const InputTelefone: React.FC<InputProps> = (props: InputProps) => {
    return(
      <Input {...props} formatter={formatTelefone}/>
    )
}

