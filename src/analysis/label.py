import cv2
import os

from src.analysis.blur import get_blurriness
from src.analysis.dominant import get_dominant_color


def label_photos(directory):
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
