import sys
import os

appPath = os.path.abspath(os.path.dirname(os.path.realpath(__file__)) + "/../..")
sys.path.append(appPath)

from src.album.creator import create_album
from src.analysis.choose import Warmth

sauce = create_album(appPath + "/res", "title1", 5, Warmth.COLD, True)
