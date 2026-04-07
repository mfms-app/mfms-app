import fonts from "./fonts";
import colors from "./colors";
export const typography = {
  h1: {
    fontFamily: fonts.primaryBold,
    fontSize: 32,
    lineHeight: 38,
    fontWeight:'bold',
  },

  h2: {
    fontFamily: fonts.primaryBold,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: 'bold',
  },

  h3: {
    fontFamily: fonts.primaryBold,
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '600',
  },
  h4:{
    fontFamily: fonts.primaryBold,
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '600',
    color: colors.darkGray
  },
  body: {
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
    lineHeight: 22,
  },
  bodyBlue: {
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
    lineHeight: 22,
    color: colors.blue
  },
  caption: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.darkGray
  },
};