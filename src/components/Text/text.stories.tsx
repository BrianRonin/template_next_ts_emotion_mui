import {
  Meta,
  Story,
} from '@storybook/react/types-6-0'
import { Text, TextProps } from '.'

export default {
  title: 'components/Text',
  component: Text,
  args: {
    children: `
    ipsum dolor sit amet consectetur adipisicing elit. Et nesciunt temp
    oribus vero atque error magni beatae quaerat quo dolor obcaecati pa
    riatur ullam fugit, dolorum sit dolore quisquam explicabo eligendi
    molestias.`,
  },
  argTypes: {
    children: { type: 'string' },
  },
} as Meta

export const Template: Story<TextProps> = (
  args,
) => {
  return (
    <div
      style={{
        maxWidth: '64rem',
        padding: '3rem',
      }}
    >
      <Text {...args} />
    </div>
  )
}

Template.parameters = {
  backgrounds: {
    default: 'light',
  },
}
