export const defaultKeys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  groupLabelKey: 'title',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time',
}

export const defaultTimeSteps = {
  second: 1,
  minute: 1,
  hour: 1,
  day: 1,
  month: 1,
  year: 1,
}

type UnitValue = {
  long: string
  mediumLong: string
  medium: string
  short: string
}

export const defaultHeaderFormats: Record<string, UnitValue> = {
  year: {
    long: 'jYYYY',
    mediumLong: 'jYYYY',
    medium: 'jYYYY',
    short: 'jYY',
  },
  month: {
    long: 'jMMMM jYYYY',
    mediumLong: 'jMMMM',
    medium: 'jMMMM',
    short: 'jMM',
  },
  week: {
    long: 'jW',
    mediumLong: 'jW',
    medium: 'jW',
    short: 'jW',
  },
  day: {
    long: 'dddd, jD jMMMM jYYYY',
    mediumLong: 'dddd, jD jMMMM',
    medium: 'jD jMMMM',
    short: 'jD',
  },
  hour: {
    long: 'dddd, jD jMMMM, HH:00',
    mediumLong: 'jL, HH:00',
    medium: 'HH:00',
    short: 'HH',
  },
  minute: {
    long: 'HH:mm',
    mediumLong: 'HH:mm',
    medium: 'HH:mm',
    short: 'mm',
  },
  second: {
    long: 'mm:ss',
    mediumLong: 'mm:ss',
    medium: 'mm:ss',
    short: 'ss',
  },
}
