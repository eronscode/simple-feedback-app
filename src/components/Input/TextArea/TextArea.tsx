import React, { useState } from 'react'
import styles from './textArea.module.css'

type Props = {
  onValueChange?: (value: string) => void
  defaultValue?: string
  rows?: number
  cols?: number
  placeholder?: string
  name?: string
}

const TextArea = (props: Props) => {
  const {
    onValueChange,
    defaultValue = '',
    rows = 12,
    cols,
    placeholder = 'Say Something',
    name,
  } = props
  const [value, setValue] = useState(defaultValue)

  function handleChange(ev: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(ev.target.value)
    onValueChange && onValueChange(ev.target.value)
  }

  return (
    <div className={styles.wrapper}>
      <textarea
        name={name}
        cols={cols}
        rows={rows}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      ></textarea>
    </div>
  )
}

export default TextArea
