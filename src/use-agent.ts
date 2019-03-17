import {
  Agent,
  Action,
  ActionFilter,
  Subscriber,
  SubscriberConfig,
  ProcessResult
} from 'antares-protocol'
import React, { useEffect, useState } from 'react'
import { Subscription, Subject, Observable } from 'rxjs'

export interface ActionsIn {
  process(action: Action, context?: any): ProcessResult
  subscribe(item$: Observable<any>, config?: SubscriberConfig): Subscription
}

// Must be called within a hook!
export function useAgent(runFn: Function): ActionsIn {
  const [agent] = useState(() => new Agent())

  const handles: Array<{ handler: Subscription; filter: ActionFilter; type: string }> = []
  const events = new Subject()
  const agentApi = {
    on(filter: ActionFilter, handler: Subscriber, config: SubscriberConfig) {
      events.next({ type: 'agent/on', pattern: filter })
      handles.push({ handler: agent.on(filter, handler, config), filter, type: 'on' })
    },
    filter(filter: ActionFilter, handler: Subscriber, config: SubscriberConfig) {
      events.next({ type: 'agent/filter', pattern: filter })
      handles.push({ handler: agent.filter(filter, handler, config), filter, type: 'filter' })
    },
    actionsOfType: agent.actionsOfType.bind(agent),
    agentEvents: events.asObservable()
  }
  useEffect(() => {
    runFn(agentApi)
    return () => {
      handles.forEach(({ handler, filter, type }) => {
        events.next({ type: `agent/${type}/unsub`, pattern: filter })
        handler.unsubscribe()
      })
    }
  }, [])

  return {
    // Process is much like `dispatch`, but with a different return type
    process: agent.process.bind(agent),
    // Subscribe is line `process` in a loop over an Observable
    subscribe: agent.subscribe.bind(agent)
  }
}
