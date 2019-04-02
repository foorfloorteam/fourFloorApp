const GET_INSTRUMENTS = 'GET_INSTRUMENTS'

const getInstruments = instruments => (
{type: GET_INSTRUMENTS, instruments})

export const getInstrument = () => async dispatch => {
  try {
    dispatch(getInstruments())
  } catch (error) {
    console.log(error)
  }
}
