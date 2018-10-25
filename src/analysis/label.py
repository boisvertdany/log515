import cv2
import os

from src.analysis.blur import get_blurriness
from src.analysis.dominant import get_dominant_color


def label_videos(directory):
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)
        photo = cv2.cvtColor(
            cv2.imread(filepath),
            cv2.COLOR_BGR2RGB)
        yield (
            filepath,
            get_blurriness(photo),
            get_dominant_color(photo)
        )


if __name__ == '__main__':
    for (path, blur, dominant_color) in label_videos(os.path.abspath('../../res')):
        red_channel = dominant_color[0]
        blue_channel = dominant_color[2]
        print('image: {}\tblur: {}\tcolor: {}'.format(
            path,
            'true' if blur < 100 else 'false',
            'warm' if red_channel > blue_channel else 'cold'
        ))
