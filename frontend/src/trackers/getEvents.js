export const getEvents = id => {
  return {
      type: 'CLICK',
      data: {
          id: id,
      }
  }
}