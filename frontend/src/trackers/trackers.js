export const getEventInfo = id => {
  return {
      type: 'CLICK',
      data: {
          id: id,
      }
  }
}


function trackContentsViews(event, eventsHistory) {
  window.dataLayer.push(...event)
  return event
}

// Allow `trackViews` to listen only on `ADD_TO_CART` event
trackContentsViews.eventType = 'CLICK'

export default trackContentsViews