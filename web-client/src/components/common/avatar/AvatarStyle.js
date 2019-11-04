export default theme => ({
  root: {
    display: 'inline-box',
    position: 'relative',
    zIndex: '-1',
  },
  image: {
    borderRadius: '50%',
    objectFit: 'contain',
    '&.lg': {
      width: '150px',
      height: '150px',
    },
    '&.md': {
      width: '100px',
      height: '100px',
    },
    '&.sm': {
      width: '50px',
      height: '50px',
    },
    '&.xs': {
      width: '25px',
      height: '25px',
    },
  },
  rateBackground: {
    position: 'absolute',
    bottom: '1px',
    right: '1px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'white',
    '&.lg': {
      width: '40px',
      height: '40px',
    },
    '&.md': {
      width: '25px',
      height: '25px',
    },
    '&.sm': {
      width: '20px',
      height: '20px',
      fontSize: '10px',
      right: '-10px',
    },
  },
  rate: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: theme.brandPrimaryColor,
    '&.lg': {
      width: '40px',
      height: '40px',
    },
    '&.md': {
      width: '25px',
      height: '25px',
      fontSize: '12px',
    },
    '&.sm': {
      width: '20px',
      height: '20px',
      fontSize: '10px',
      right: '-10px',
    },
  },
});
