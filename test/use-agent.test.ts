import { useAgent } from '../src/use-agent'

describe('useAgent', () => {
  it('useAgent is a Function', () => {
    expect(useAgent).toBeInstanceOf(Function)
  })
  it('useAgent returns the mean to process or subscribe actions', () => {
    const result = useAgent(() => {})
    result
  })
})
