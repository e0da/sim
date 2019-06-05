import { SimulationType } from './types'
import { noop } from './util'

const KEYS = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  W: 'up',
  S: 'down',
  A: 'left',
  D: 'right',
  ' ': 'buttonA',
  Z: 'buttonX',
  X: 'buttonY',
}

const unbound = { up: noop, down: noop }

const getBindings = (simulation = SimulationType) => {
  const toggle = prop => ({
    /* eslint-disable no-param-reassign */
    down: () => (simulation.input[prop] = true),
    up: () => (simulation.input[prop] = false),
    /* eslint-enable no-param-reassign */
  })
  return {
    up: toggle('up'),
    down: toggle('down'),
    left: toggle('left'),
    right: toggle('right'),
    buttonA: toggle('buttonA'),
    buttonB: toggle('buttonB'),
    buttonX: toggle('buttonX'),
    buttonY: toggle('buttonY'),
  }
}

const getBinding = (
  bindings = {
    up: unbound,
    down: unbound,
    left: unbound,
    right: unbound,
    buttonA: unbound,
    buttonB: unbound,
    buttonX: unbound,
    buttonY: unbound,
  },
  key = ''
) => {
  const query = key.length === 1 ? key.toUpperCase() : key
  return bindings[KEYS[query]] || unbound
}

const getListeners = (simulation = SimulationType) => {
  const bindings = getBindings(simulation)
  const listener = action => ({ key }) => {
    const binding = getBinding(bindings, key)
    binding[action]()
  }
  return {
    keydown: listener('down'),
    keyup: listener('up'),
  }
}

const bindInput = (simulation = SimulationType) => {
  const { keyup, keydown } = getListeners(simulation)
  window.addEventListener('keydown', keydown)
  window.addEventListener('keyup', keyup)
  return () => {
    window.removeEventListener('keydown', keydown)
    window.removeEventListener('keyup', keyup)
  }
}

export default bindInput
