export const Colors = {
  primary: '#1A5CFF',
  primaryLight: '#68808D',
  primaryLighter: '#a6bdc4',
  secondary: '#5B3AFF',
  success: '#17C964',
  danger: '#F2135D',
  warn: '#FFBA00',
  secondaryLight: 'rgba(91,58,255,0.14)',
  greyLight: '#F1F1F1',
  white: '#ffffff',
  black: '#000000',
  textColor:
    localStorage.getItem('theme') === 'darkMode'
      ? '#000000'
      : ('#ffffff')
}
