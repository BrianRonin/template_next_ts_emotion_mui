import * as S from './styles'

export type TextProps = {
  children: string | React.ReactNode
}

export const Text = ({ children }: TextProps) => {
  if (typeof children === 'string') {
    return <S.Main dangerouslySetInnerHTML={{ __html: children }} />
  } else {
    const text = children?.toString()
    if (text) return <S.Main dangerouslySetInnerHTML={{ __html: text }} />
    return <S.Main dangerouslySetInnerHTML={{ __html: 'sem texto' }} />
  }
}
