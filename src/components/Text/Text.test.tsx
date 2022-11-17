import { screen } from '@testing-library/react'
import { renderTheme } from '../../styles/render-theme'
import { Text } from './index'

describe('<Text />', () => {
  it('should render text', () => {
    renderTheme(<Text>teste</Text>)
    expect(screen.getByText('teste')).toBeInTheDocument()
  })
  it('should match snapshot', () => {
    const { container } = renderTheme(<Text>teste</Text>)
    expect(container).toMatchSnapshot()
  })
})
