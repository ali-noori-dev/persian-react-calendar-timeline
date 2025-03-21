import dayjs from 'dayjs'
import { Component } from 'react'
import Timeline from 'react-calendar-timeline'
import generateFakeData from '../generate-fake-data'

var keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  groupLabelKey: 'label',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time',
}

export default class App extends Component {
  constructor(props) {
    super(props)

    const { groups, items } = generateFakeData()
    const defaultTimeStart = dayjs().startOf('day').toDate()
    const defaultTimeEnd = dayjs().startOf('day').add(1, 'day').toDate()

    // convert every 2 groups out of 3 to nodes, leaving the first as the root
    const newGroups = groups.map((group) => {
      const isRoot = (parseInt(group.id) - 1) % 3 === 0
      const parent = isRoot ? null : Math.floor((parseInt(group.id) - 1) / 3) * 3 + 1
      const height = isRoot ? 15 : null

      return Object.assign({}, group, {
        root: isRoot,
        parent: parent,
        height: height,
      })
    })

    const newItems = items.filter((item) => {
      const group = newGroups.find((group) => group.id === item.group)
      return !group.root
    })

    this.state = {
      groups: newGroups,
      items: newItems,
      defaultTimeStart,
      defaultTimeEnd,
      openGroups: {},
    }
  }

  toggleGroup = (id) => {
    const { openGroups } = this.state
    this.setState({
      openGroups: {
        ...openGroups,
        [id]: !openGroups[id],
      },
    })
  }

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd, openGroups } = this.state

    // hide (filter) the groups that are closed, for the rest, patch their "title" and add some callbacks or padding
    const newGroups = groups
      .filter((g) => g.root || openGroups[g.parent])
      .map((group) => {
        return Object.assign({}, group, {
          title: group.root ? (
            <div onClick={() => this.toggleGroup(parseInt(group.id))} style={{ cursor: 'pointer' }}>
              {openGroups[parseInt(group.id)] ? '[-]' : '[+]'} {group.title}
            </div>
          ) : (
            <div style={{ paddingLeft: 20 }}>{group.title}</div>
          ),
        })
      })

    return (
      <Timeline
        groups={newGroups}
        items={items}
        keys={keys}
        canMove={true}
        canResize="right"
        canSelect
        itemsSorted
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        horizontalLineClassNamesForGroup={(group) => (group.root ? ['row-root'] : [])}
      />
    )
  }
}
