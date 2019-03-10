const GET_INSTRUMENTS = 'GET_INSTRUMENTS'

const getInstruments = instruments => (
{type: GET_INSTRUMENTS, instruments})

export const getInstrument = () => async dispatch => {
  dispatch(getInstruments())
}
