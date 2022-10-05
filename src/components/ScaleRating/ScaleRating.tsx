import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import styles from './scaleRating.module.css'

type Props = {
  onValueChange?: (value: number) => void
  iconsCount?: number
  size: number
  defaultValue?: number
  readOnly?: boolean
  style?: React.CSSProperties
}

const ScaleRating = (props: Props) => {
  const {
    onValueChange,
    iconsCount = 10,
    defaultValue = 0,
    readOnly = false,
    size,
    style,
  } = props
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState<number | null>(null)

  const iconStyle = {
    height: `${size}px`,
    width: `${size}px`,
    ...style,
  }

  useEffect(() => {
    if (defaultValue) {
      setRating(defaultValue)
    }
  }, [defaultValue])

  function handleClick(ev: React.SyntheticEvent<HTMLButtonElement>) {
    if (readOnly) return

    if (ev.currentTarget.dataset.star) {
      const value = parseInt(ev.currentTarget.dataset.star)
      setRating(value)
      onValueChange && onValueChange(value)
    }
  }

  function onHover(ev: React.SyntheticEvent<HTMLButtonElement>) {
    if (readOnly) return

    if (ev.currentTarget.dataset.star) {
      const value =
        ev.type === 'mouseleave'
          ? null
          : parseInt(ev.currentTarget.dataset.star)
      setHover(value)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.rateIconContainer}>
        {Array.from(Array(iconsCount).keys(), (item) => {
          const value = item + 1
          return (
            <button
              key={value}
              data-star={value}
              onClick={handleClick}
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              className={classnames(styles.rateIcon, {
                [styles.fill]:
                  (rating && rating >= value) || (hover && hover >= value),
              })}
              style={iconStyle}
              aria-label="scale rating"
            ></button>
          )
        })}
      </div>
      {!readOnly && (
        <p>
          {hover && hover >= rating ? hover : rating}/{iconsCount}
        </p>
      )}
    </div>
  )
}

export default ScaleRating
