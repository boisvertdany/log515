import os
from enum import Enum

from src.analysis.label import label_photos


class Warmth(Enum):
    WHATEVER = 1
    WARM = 2
    COLD = 3


def choose_photos(directory, quantity=10, get_specific_warmth=Warmth.WHATEVER, get_sharpest_photo=False):
    photo_list = []

    for (path, blur, dominant_color) in label_photos(directory):
        photo_list.append((path, blur, dominant_color[0]-dominant_color[2]))

    if get_sharpest_photo:
        photo_list = sorted(photo_list, key=lambda photo: photo[1], reverse=True)

    i = len(photo_list)
    if i < quantity:
        print('There are not enough photos ({}) for the requested quantity ({})'.format(i, quantity))

    if get_specific_warmth != Warmth.WHATEVER:
        while i > 0 and len(photo_list) > quantity:
            i -= 1
            _, _, warmth = photo_list[i]
            if get_specific_warmth == Warmth.WARM and warmth < 0 or \
               get_specific_warmth == Warmth.COLD and warmth > 0:
                del photo_list[i]

    return map(lambda x: x[0], photo_list[:quantity])


if __name__ == '__main__':
    for path in choose_photos(os.path.abspath('../../res'),
                              quantity=5,
                              get_specific_warmth=Warmth.COLD,
                              get_sharpest_photo=True):
        print(path)
