import React, { useState } from 'react'
import classnames from 'classnames'
import styles from './multiChoiceSelect.module.css'

type Props = {
  onValueChange?: (value: number) => void
  defaultValue?: string | number
  options: {
    label: string
    value: number
  }[]
}

const MultiChoiceSelect = (props: Props) => {
  const { onValueChange, defaultValue, options } = props
  const [value, setValue] = useState(defaultValue)

  function handleClick(ev: React.SyntheticEvent<HTMLButtonElement>) {
    if (ev.currentTarget.dataset.value) {
      const value = parseInt(ev.currentTarget.dataset.value)
      setValue(value)
      onValueChange && onValueChange(value)
    }
  }

  return (
    <div className={styles.wrapper}>
      {options?.map((option) => {
        return (
          <button
            key={option.value}
            onClick={handleClick}
            data-value={option.value}
            className={classnames(styles.option, {
              [styles.active]: value === option.value,
            })}
          >
            <span>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default MultiChoiceSelect
