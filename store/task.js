export const actions = {
  async fetchTask({}) {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {title: 'Task 1', date: '01.06.2019', priority: 'высокий', status: 'запланирована', _id: 'id1'},
          {title: 'Task 2', date: '02.06.2019', priority: 'нормальный', status: 'выполняется', _id: 'id2'},
          {title: 'Task 3', date: '03.06.2019', priority: 'нормальный', status: 'выполняется', _id: 'id3'},
          {title: 'Task 4', date: '04.06.2019', priority: 'нормальный', status: 'завершена', _id: 'id4'},
          {title: 'Task 5', date: '01.06.2019', priority: 'высокий', status: 'завершена', _id: 'id5'}
        ])
      }, 1000)
    })
  }
}