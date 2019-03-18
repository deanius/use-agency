/**
 * @jest-environment jsdom
 */

import * as React from 'react'
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
    function SimpleComponent() {
      useAgent(specifier)
      return <div />
    }

    const wrapper = render(<SimpleComponent />)
    expect(specifier.mock.calls.length).toEqual(1)
  })
})
