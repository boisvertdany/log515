import sys
import os

appPath = os.path.abspath(os.path.dirname(os.path.realpath(__file__)) + "/../../..")
sys.path.append(appPath)

from src.album.creator import create_album
from src.analysis.choose import Warmth

def createAlbum(inputPath, title, quantity, strWarmth, sharpness, outputPath):
    warmth = Warmth.WHATEVER
    if strWarmth == 'COLD':
        warmth = Warmth.COLD
    elif str == 'WARM':
        warmth = Warmth.WARM
    output = appPath + '/src/backend/media/albums' + outputPath

    try:
        os.makedirs(os.path.dirname(output))
    except OSError:
        pass

    create_album(
        appPath + '/src/backend/media/images' + inputPath,
        title, quantity, warmth, sharpness,
        output
    )
