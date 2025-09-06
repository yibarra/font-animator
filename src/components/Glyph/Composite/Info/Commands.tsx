import { Group, Rect, Text } from 'react-konva'
import { UseGlyphContext } from '../../Context'
import { useMemo, useState } from 'react'

const Commands = ({ x, y }: any) => {
  const [current, setCurrent] = useState(0)
  const { path } = UseGlyphContext()

  const { commands } = path
  const PER_TAB = 9

  const commandTab = useMemo(() => {
    const tabs = []
    const numTabs = Math.ceil(commands.length / PER_TAB)

    for (let i = 0; i < numTabs; i++) {
      const start = i * PER_TAB
      const end = Math.min(start + PER_TAB, commands.length) - 1 // -1

      tabs.push({
        label: `${start + 1} - ${end + 1}`,
        start,
        end,
        commands: commands.slice(start, end),
      })
    }

    return tabs
  }, [commands])

  const props = {
    fill: '#fff',
    fontFamily: 'Roboto Mono',
    fontSize: 10,
    letterSpacing: -0.4
  }

  const propsBold = {
    fontStyle: 'Bold',
    fontSize: 12,
  }

  const commandGroup = commandTab[current]
  const totalColumns = commandGroup
    ? Math.max(...commandGroup.commands.map(cmd => cmd.args.length))
    : 0

  return (
    <Group x={x} y={y}>
      <Text {...props} {...propsBold} text="Commands" />
      <Text {...props} x={120*(totalColumns-1)} text={`Total: ${commands.length}`} y={2} />

      {commandGroup &&
        commandGroup.commands.map((point, index) => {
          const argNames = point.command
          const args: (number | null)[] = [...point.args]

          while (args.length < 6) {
            args.push(null)
          }

          const displayedArgs = args.slice(0, 6)

          return (
            <Group key={index} y={26}>
              {displayedArgs.map((value, k) => (
                value !== null ? (
                  <Group key={`${index}-${value}-${k}`} x={0} y={index * 18}>
                    <Text {...props} text={argNames[k].toUpperCase() + ':' || `arg${(k + 1)}`} x={k * 120} />
                    <Text {...props} {...propsBold} text={value.toFixed(1)} x={k ? (k * 120) + 20 : 20} y={-2} />
                  </Group>
                ) : <></>
              ))}
            </Group>
          )
        })}
      
    </Group>
  )
}

Commands.displayName = 'Components.Glyph.Info.Commands'
export default Commands