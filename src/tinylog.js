import Performance from './lib/performance'

export default function TinyLog (config) {
  return new Performance().start(config)
}