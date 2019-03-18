/**
 * @jest-environment jsdom
 */

import * as React from 'react'
import { useReducer } from 'react'
import { useAgent } from '../src/use-agent'
import { render } from 'react-testing-library'

describe('useAgent', () => {
  let specifier: jest.Mock

  beforeEach(() => {
    specifier = jest.fn(() => {})
  })

  it('useAgent is a Function', () => {
    expect(useAgent).toBeInstanceOf(Function)
  })
  it('useAgent invokes its argument', () => {
    function SimpleComponent(props: { friendId: number }) {
      const [state, dispatch] = useReducer((state: any, action: any) => state, {})
      useAgent(specifier)
      return <div />
    }

    const wrapper = render(<SimpleComponent friendId={1} />)
    expect(specifier.mock.calls.length).toEqual(1)
  })
})
