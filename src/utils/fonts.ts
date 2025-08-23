import { isIOS } from './utils';

export const fontFamilies = {
  Sora: {
    normal: isIOS() ? 'Sora-Regular' : 'Sora-Regular',
    medium: isIOS() ? 'Sora-Medium' : 'Sora-Medium',
    bold: isIOS() ? 'Sora-Bold' : 'Sora-Bold',
  },

  // Adjust the above code to fit your chosen fonts' names
};

export const getFontFamily = (weight: 'normal' | 'medium' | 'bold') => {
  const selectedFontFamily = fontFamilies.Sora;
  return selectedFontFamily[weight];
};
