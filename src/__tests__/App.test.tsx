import React from 'react'
import {
  render,
  screen,
  fireEvent,
  getByText,
  findByText,
  act,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../views/Home'
import App from '../App'
import UserProvider from 'context/UserProvider'
import { MemoryRouter } from 'react-router-dom'

const keyDownEvent = {
  key: 'ArrowDown',
  keyCode: 40,
  code: 40,
}
const DOWN_ARROW = {
  keyCode: 40,
}

export async function selectOption(container: HTMLElement, optionText: any) {
  const placeholder = getByText(container, 'Select...')
  fireEvent.keyDown(placeholder, keyDownEvent)
  screen.debug()
  await findByText(container, optionText)
  fireEvent.click(getByText(container, optionText))
}

it('should render Heading and Button', () => {
  render(<Home />)
  // screen.debug()
  const headerText = screen.getByText(/honesto/i)
  const buttonElement = screen.getByRole('button', { name: /login/i })
  expect(headerText).toBeInTheDocument()
  expect(buttonElement).toBeInTheDocument()
})

it('should render select options', async () => {
  // const dispatch = jest.fn()
  // useDispatch.mockReturnValue(jest.fn())

  const { getByText, findByLabelText, queryByText } = render(
    <UserProvider
      defaultState={[
        {
          avatarUrl: 'https://i.pravatar.cc/150?img=68',
          id: 'p0-x',
          name: 'John',
        },
        {
          avatarUrl: 'https://i.pravatar.cc/150?img=68',
          id: 'p0',
          name: 'John Smith',
        },
        {
          avatarUrl: 'https://i.pravatar.cc/150?img=48',
          id: 'p1',
          name: 'Martha Liberty',
        },
        {
          avatarUrl: 'https://i.pravatar.cc/100?u=p2',
          id: 'p2',
          name: 'Persephone Woodley',
        },
      ]}
    >
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>,
  )

  expect(queryByText('John')).not.toBeInTheDocument()

  const myCustomSelect = await findByLabelText(/my custom select/i)
  userEvent.click(myCustomSelect)

  const selectedItem = getByText(/Martha Liberty/i)
  userEvent.click(selectedItem)

  expect(getByText('Martha Liberty')).toBeInTheDocument()

  // userEvent.click(screen.getByRole('button', { name: /Login/i }))

  // expect(history.location.pathname).toEqual('/about')
  screen.debug()
  //expect(screen.getByText(/About Us/i)).toBeInTheDocument()
})
